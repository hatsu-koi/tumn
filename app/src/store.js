import createPersistedState from "vuex-persistedstate";
import {update} from "./bindState";
import translation from "./translation";

import Vuex from "vuex";
import VueI18n from "vue-i18n";

export default function makeStore() {
	const customization = {
		namespaced: true,

		state: {
			color: '#1e98e9',
			font: 'Roboto, NanumBarunGothic, sans-serif',
			title: 'Titillium Web, NanumSquare, sans-serif',
			'i18n': "ko_KR"
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

	const config = {
		namespaced: true,

		modules: {
			customization,
			cover
		}
	};

	const store = new Vuex.Store({
		modules: {
			config
		},

		plugins: [createPersistedState()]
	});

	const i18n = new VueI18n({
		locale: store.state.config.customization.i18n,
		messages: translation
	});

	return {store, i18n};
};
