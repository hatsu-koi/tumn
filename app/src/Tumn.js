import CustomDict from "./filter/CustomDict";

import builtinHook, {source as builtinHookSource} from "./plugin/hook";
import hookInject from "./hook/hook.inject.js";
import matchPattern from "url-match-patterns";
import {mergeRange, mapIndexText} from "./common/mergeRange";

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
		this.remotePort = 7532;
	}

	setupListener() {
		chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			if (changeInfo.status == 'complete') {
				this.injectRule(tab);
			}
		});

		chrome.runtime.onMessage((...args) => this.parseMessage(...args));
	}

	async connectRemote() {
		try {
			return await fetch(`https://localhost:${this.remotePort}/`).then(v => v.json());
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

	async parseMessage(message, sender, response) {
		if(!message || !message.type) return;

		switch(message.type) {
			case 'QUERY':
				const resp = await this.query(message.body);
				response(resp);
				break;
		}
	}

	installHook(hookDescription) {

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
		const queried = await fetch(`https://localhost:${$TUMN_CONFIG.port}/filter`, {
			method: 'POST',
			headers: Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(extracted)
		}).then(v => v.json());

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
			const indexes = queryRes[1];

			indexes.sort(([s1], [s2]) => s1 - s2);
			indexes.forEach((prev, curr, i) => {
				const firstElem = prev[0];

				if(firstElem[0] < curr[0] && curr[0] < firstElem[1]) {
					firstElem[1] === Math.max(firstElem[1], curr[1]);
				} else {
					stack.push(prev.pop());
				}
			}, indexes.slice());

			return [queryRes[0], stack];
		});
	}

	async injectRule(tab) {
		try {
			await this.executeScript(tab.id, {
				code: wrap(hookInject)
			});
		} catch(err) {
			//When doesn't have permission to this site
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
