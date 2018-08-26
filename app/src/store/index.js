import * as actions from "./actions";
import * as mutations from "./mutations";

import createMutationsSharer from 'vuex-shared-mutations';
import createPersistedState from "vuex-persistedstate";
import {getMock, getMockHooks} from "../resources/mock";
import {update} from "./bindState";

import Vuex from "vuex";

const applyAll = targetObject => (...args) => Object.keys(targetObject).reduce((prev, key) => {
	prev[key] = targetObject[key](...args);
	return prev;
}, {});

const getMutations = applyAll(mutations);
const getActions = applyAll(actions);

export default function makeStore() {
	const customization = {
		namespaced: true,

		state: {
			color: '#1e98e9',
			font: 'Roboto, Spoqa Han Sans, sans-serif',
			title: 'Titillium Web, Nanum Square, sans-serif',
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
			sites: []
		},

		getters: {
			maxId(state) {
				return (state.sites.reduce((prev, curr) => {
					const intId = parseInt(curr.id);
					if(!Number.isInteger(intId)) return prev;

					return Math.max(prev, intId);
				}, -1) + 1).toString();
			}
		},

		mutations: {
			addRuleContent(state, {id, type, contentId}) {
				if(type !== 'filters' && type !== 'hooks') return;

				const rules = state.sites.find(v => v.id === id);
				if(!rules) return;

				if(rules.rules[type].indexOf(contentId) < 0)
					rules.rules[type].push(contentId);
			},

			removeRuleContent(state, {id, type, contentId}) {
				if(type !== 'filters' && type !== 'hooks') return;

				const rules = state.sites.find(v => v.id === id);
				if(!rules) return;

				const contentIndex = rules.rules[type].indexOf(contentId);
				if(contentIndex < 0) return;

				rules.rules[type].splice(contentIndex, 1);
			},

			removeRuleContentFromAll(state, {type, contentId}) {
				state.sites.forEach(rule => {
					const contentIndex = rule.rules[type].indexOf(contentId);
					if(contentIndex < 0) return;

					rule.rules[type].splice(contentIndex, 1);
				});
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
			removeSite: mutations.removeSet('sites', false)
		}
	};

	const dict = {
		namespaced: true,

		state: {
			dict: []
		},

		mutations: {
			addSequence(state, {sequence}) {
				if(state.dict.includes(sequence)) return;

				const findObject = state.dict.reduce((prev, curr, i) => {
					if(prev.found) return prev;

					if(prev < sequence && sequence < curr) {
						return {
							value: i,
							found: true
						};
					}

					return prev;
				}, '');

				let value = findObject.value;
				if(!findObject.found) value = state.dict.length;

				state.dict.splice(value, 0, sequence);
			},

			removeSequence(state, {sequence}) {
				const seqIdx = state.dict.indexOf(sequence);
				if(seqIdx < 0) return;

				state.dict.splice(seqIdx, 1);
			}
		}
	};

	const filters = {
		namespaced: true,

		state: {
			filters: [],
			active: []
		},

		modules: {
			dict
		},

		mutations: {
			...getMutations('filters'),
			updateSetFromResponse(state, filters) {
				state.filters = filters;
			}
		},
		actions: getActions('filters')
	};

	const hooks = {
		namespaced: true,

		state: {
			hooks: [],
			active: []
		},

		mutations: getMutations('hooks'),
		actions: getActions('hooks')
	};

	const config = {
		namespaced: true,

		state: {
			firstRun: false
		},

		mutations: {
			firstRun(state) {
				state.firstRun = true;
			}
		},

		modules: {
			customization,
			cover
		}
	};

	const status = {
		namespaced: true,

		state: {
			processorOnline: true
		},

		mutations: {
			processorOnline(state, value) {
				state.processorOnline = value;
			}
		}
	};

	const store = new Vuex.Store({
		modules: {
			config,
			filters,
			hooks,
			sites,
			status
		},

		plugins: [
			createPersistedState({
				key: 'tumn-settings',
				paths: [
					'config',
					'filters.active',
					'filters.dict',
					'hooks',
					'sites'
				]
			}),

			createMutationsSharer({
				sharingKey: 'tumn-settings-sharer',
				predicate: (mutation, state) => true
			})
		]
	});

	return store;
};
