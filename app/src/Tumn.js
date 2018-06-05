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
		//TODO change to store.
		this.remotePort = 7532;
	}

	setupListener() {
		chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
			if (changeInfo.status == 'complete') {
				this.injectRule(tab);
			}
		});
	}

	async connectRemote() {
		try {
			const result = await fetch(`https://localhost:${this.remotePort}/`);
			return result;
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

	async injectRule(tab) {
		try {
			await this.executeScript(tab.id, {
				code: `
					window.$TUMN_CONFIG = {
						port: ${this.remotePort}
					};
				`
			});

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
