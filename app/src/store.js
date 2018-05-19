import createPersistedState from "vuex-persistedstate";
import {getMock, getMockHooks} from "./mock";
import * as mutations from "./mutations";
import {update} from "./bindState";

import Vuex from "vuex";

export default function makeStore() {
	const customization = {
		namespaced: true,

		state: {
			color: '#1e98e9',
			font: 'Roboto, NanumBarunGothic, sans-serif',
			title: 'Titillium Web, NanumSquare, sans-serif',
			i18n: "ko_KR"
		},

		mutations: {
			update
		}
	};

	const cover = {
		namespaced: true,

		state: {
			toggleCover: false,
			opacity: 0,
			hoverOpacity: 0,
			filter: 'filter1'
		},

		mutations: {
			update
		}
	};

	const sites = {
		namespaced: true,

		state: {
			sites: [
				{
					name: 'Twitter',
					id: 'twitter1',
					match: {
						type: 'Regex',
						value: String.raw`/(?:http|https):\/\/twitter.com\/.*/`
					},
					rules: {
						hooks: [
							'khinenwhooks.scroll',
							'khinenwhooks.load'
						],

						filters: [
							'khinenwnn.swearwords',
							'khinenwnn.hatespeech'
						]
					}
				}
			]
		},

		mutations: {
			addRuleContent(state, {id, type, contentId}) {
				if(type !== 'filters' || type !== 'hooks') return;

				const rules = state.sites.find(v => v.id === id);
				if(!rules) return;

				if(rules.rules[type].indexOf(contentId) < 0)
					rules.rules[type].push(contentId);
			},

			removeRuleContent(state, {id, type, contentId}) {
				if(type !== 'filters' || type !== 'hooks') return;

				const rules = state.sites.find(v => v.id === id);
				if(!rules) return;

				const contentIndex = rules.rules[type].indexOf(contentId);
				if(contentIndex < 0) return;

				rules.rules[type].splice(contentIndex, 1);
			},

			setMatcher(state, {id, type, value}) {
				const rules = state.sites.find(v => v.id === id);
				if(!rules) return;

				if(type) {
					rules.match.type = type;
				}

				if(value) {
					rules.match.value = value;
				}
			},

			addSite: mutations.addSet('sites'),
			updateSite: mutations.updateSet('sites'),
			removeSite: mutations.removeSet('sites')
		}
	};

	const filters = {
		namespaced: true,

		state: {
			filters: getMock()
		},

		mutations: {
			addElem: mutations.addElem('filters'),
			updateElem: mutations.updateElem('filters'),
			removeElem: mutations.removeElem('filters'),
			addElemSet: mutations.addSet('filters'),
			updateElemSet: mutations.updateSet('filters'),
			removeElemSet: mutations.removeSet('filters')
		}
	};

	const hooks = {
		namespaced: true,

		state: {
			hooks: getMockHooks()
		},

		mutations: {
			addElem: mutations.addElem('hooks'),
			updateElem: mutations.updateElem('hooks'),
			removeElem: mutations.removeElem('hooks'),
			addElemSet: mutations.addSet('hooks'),
			updateElemSet: mutations.updateSet('hooks'),
			removeElemSet: mutations.removeSet('hooks')
		}
	};

	const config = {
		namespaced: true,

		modules: {
			customization,
			cover
		}
	};

	const store = new Vuex.Store({
		modules: {
			config,
			filters,
			hooks,
			sites
		},

		plugins: [createPersistedState({
			key: 'tumn-settings',
			paths: ['config', 'sites']
		})]
	});

	return store;
};
