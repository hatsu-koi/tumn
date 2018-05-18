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
						value: '/(?:http|https):\/\/twitter.com\/.*/'
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
			addFilter(state, {id, filterId}) {

			},

			addHook(state, {id, hookId}) {

			},

			removeFilter(state, {id, filterId}) {

			},

			removeHook(state, {id, hookId}) {

			},

			setMatcher(state, {id, type, value}) {
				if(type) {

				}

				if(value) {

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
			addFilter: mutations.addElem('filters'),
			updateFilter: mutations.updateElem('filters'),
			removeFilter: mutations.removeElem('filters'),
			addFilterSet: mutations.addSet('filters'),
			updateFilterSet: mutations.updateSet('filters'),
			removeFilterSet: mutations.removeSet('filters')
		}
	};

	const hooks = {
		namespaced: true,

		state: {
			hooks: getMockHooks()
		},

		mutations: {
			addFilter: mutations.addElem('hooks'),
			updateFilter: mutations.updateElem('hooks'),
			removeFilter: mutations.removeElem('hooks'),
			addFilterSet: mutations.addSet('hooks'),
			updateFilterSet: mutations.updateSet('hooks'),
			removeFilterSet: mutations.removeSet('hooks')
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
