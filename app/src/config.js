import {update} from "./bindState";

const customization = {
	namespaced: true,

	state: {
		color: '#1e98e9',
		font: 'Roboto, sans-serif',
		title: 'Titillium Web, sans-serif'
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

export default config;
