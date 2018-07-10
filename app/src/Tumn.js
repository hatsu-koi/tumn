import CustomDict from "./filter/CustomDict";

import abuseStyle from "!raw-loader!less-loader!../assets/less/abuse.less";
import builtinHook, {source as builtinHookSource} from "./plugin/hook";
import hookInject from "./hook/hook.inject.js";
import matchPattern from "url-match-patterns";

const wrap = script => `(function() {${script}})()`;

class Tumn {
	constructor(store) {
		console.log(`Running on ${process.env.NODE_ENV} mode.`);

		this.store = store;
		this.regexCache = {};
		if(!store.state.config.firstRun) {
			this.firstRun();
		}

		this.setupListener();
		this.customDict = new CustomDict(this);
		this.remotePort = 5000;

		this.updateFilter();
	}

	setupListener() {
		chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			if (changeInfo.status == 'complete') {
				this.injectRule(tab);
			}
		});

		chrome.runtime.onMessage.addListener((...args) => this.parseMessage(...args));
	}

	async connectRemote() {
		try {
			return await fetch(`https://localhost:${this.remotePort}/`).then(v => v.json());
		} catch(e) {
			return false;
		}
	}

	async updateFilter() {
		try {
			const res = await fetch(`https://localhost:${this.remotePort}/filterset`);
			const filters = await res.json();

			this.store.commit('filters/updateSetFromResponse', filters);
			return true;
		} catch(e) {
			return false;
		}
	}

	executeScript(...args) {
		return new Promise((resolve, reject) => {
			chrome.tabs.executeScript(...args, result => {
				const err = chrome.runtime.lastError;
				if(err) reject(err);

				resolve(result);
			});
		});
	}

	parseMessage(message, sender, response) {
		if(!message || !message.type) return;

		if(process.env.NODE_ENV === 'development') {
			console.log(`Incomming message: ${message.type}`);
			const _response = response;

			response = (...args) => console.log(`Response: ${JSON.stringify(args[0])}`) || _response(...args);
		}

		switch(message.type) {
			case 'QUERY':
				this.query(message.body).then(response);
				return true;
		}
	}

	async installHook(hookDescription) {
		const elems = hookDescription.options;
		const sources = {};

		for(elem of elems) {
			const fetchRes = await fetch(elem.href);
			const fetchSource = await fetchRes.text();
			sources[elem.id] = fetchSource;
		}

		await this.saveHookSource(sources);

		this.store.commit('hooks/addSet', {
			set: hookDescription
		});
	}

	saveHookSource(sources) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set(sources, () => {
				resolve();
			});
		});
	}

	matchRule(site, {id, name, match}) {
		try {
			if(match.type === 'regex') {
				if(!this.regexCache[id]) {
					this.regexCache[id] = new RegExp(match.value);
				}
				return this.regexCache[id].test(site);
			}

			return matchPattern(match.value, site);
		} catch(e) {
			console.error(`Error in rule ${name}!`, e);
			return false;
		}
	}

	getRules(site) {
		const rule = this.store.state.sites.sites.find(v => this.matchRule(site, v));

		if(!rule) return {
			rules: {
				hooks: this.store.state.hooks.active,
				filters: this.store.state.filters.active
			}
		};

		return rule;
	}

	async query({extracted}) {
		const dictQueried = this.customDict.filter(extracted);
		let queried = [];
		try {
			queried = await fetch(`https://localhost:${this.remotePort}/filter`, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify(extracted)
			}).then(v => v.json());

			if(!this.store.state.status.processorOnline) {
				this.store.commit('status/processorOnline', true);
			}
		} catch(e) {
			console.log(e);
			this.store.commit('status/processorOnline', false);
		}

		dictQueried.forEach(queryRes => {
			const [id, indexes] = queryRes;
			const contains = queried.find(([elemId]) => elemId === id);
			if(contains) {
				contains[1] = contains[1].concat(indexes);
				return;
			}

			queried.push(queryRes);
		});

		return queried.map(queryRes => {
			const stack = [];
			const indexes = queryRes[1].sort(([s1], [s2]) => s1 - s2);

			indexes.reduce((prev, curr, i, arr) => {
				if(prev !== null) {
					if(prev[0] <= curr[0] && curr[0] <= prev[1]) {
						curr[0] = Math.min(prev[0], curr[0]);
						curr[1] = Math.max(prev[1], curr[1]);
					} else {
						stack.push(prev);
					}
				}

				if(i === arr.length - 1) stack.push(curr);

				return curr;
			}, null);

			return [queryRes[0], stack];
		});
	}

	async injectRule(tab) {
		try {
			await this.executeScript(tab.id, {
				code: wrap(hookInject)
			});


			chrome.tabs.insertCSS(tab.id, {
				code: abuseStyle
			});

			//TODO Change to cover settings.
			chrome.tabs.insertCSS(tab.id, {
				code: `
					.Tumn__AbuseFilter::after {
						background: ${this.store.state.config.customization.color};
					}
				`
			});

		} catch(err) {
			//When doesn't have permission to this site

			if(process.env.NODE_ENV === 'development') console.log("EPERM", err);
			return;
		}

		const rule = this.getRules(tab.url);
		rule.rules.hooks.forEach(v => {
			chrome.storage.local.get(v, script => {
				if(script && typeof script[v] !== 'string') return;

				this.executeScript(tab.id, {
					code: wrap(script[v])
				});
			});
		});
	}

	async firstRun() {
		console.log("Performing first run tasks...");
		await this.saveHookSource(builtinHookSource);
		this.store.commit('hooks/addSet', {
			set: builtinHook
		});
		this.store.commit('config/firstRun');
	}
}

export default Tumn;
