import builtinHook, {source as builtinHookSource} from "./plugin/hook";
import hookInject from "./hook/hook.inject.js";
import matchPattern from "url-match-patterns";

class Tumn {
	constructor(store) {
		this.store = store;
		this.regexCache = {};
		if(!store.state.config.firstRun || process.env.NODE_ENV === 'development') {
			this.firstRun();
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

	matchRule(site, {id, match}) {
		if(match.type === 'regex') {
			if(!this.regexCache[id]) {
				this.regexCache[id] = new RegExp(match.value);
			}
			return this.regexCache[id].test(site);
		}

		return matchPattern(match.value, site);
	}

	getRules(site) {
		const rule = this.store.state.sites.sites.find(v => this.matchRule(site, v));
		if(!rule) return {
			hooks: this.store.state.hooks.active,
			filters: this.store.state.filters.active
		};
	}

	injectRule(tab) {
		chrome.tabs.executeScript(tab.id, {
			code: hookInject
		});
		
		const rule = this.getRules(tab.url);
		rule.hooks.forEach(v => {
			chrome.storage.local.get(v.id, script => {
				chrome.tabs.executeScript(tab.id, {
					code: `(function(){${script}})()`
				});
			});
		});
	}

	async firstRun() {
		await this.saveHookSource(builtinHookSource);
		this.store.commit('hooks/addSet', builtinHook);
		this.store.commit('config/firstRun');
	}
}

export default Tumn;
