import createPersistedState from "vuex-persistedstate";
import config from "./src/config";

import Overview from "./layouts/Overview.vue";
import SettingFrame from "./layouts/SettingFrame.vue";
import Settings from "./layouts/Settings.vue";
import Sites from "./layouts/Sites.vue";
import Statistics from "./layouts/Statistics.vue";
import Vue from "vue";
import Vuex from "vuex";
import VueRipple from "vue-ripple-directive";
import VueRippleSmall from "./src/VueRippleSmall";
import VueRouter from "vue-router";

import "./less/index.less";

Vue.directive('ripple', VueRipple);
Vue.directive('ripple-small', VueRippleSmall);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
	routes: [
		{path: '/', component: Overview},
		{path: '/settings/', component: Settings},
		{path: '/settings/:name/', component: Settings},
		{path: '/sites', component: Sites},
		{path: '/statistics', component: Statistics}
	]
});

const store = new Vuex.Store({
	modules: {
		config
	},

	plugins: [createPersistedState()]
});

new Vue({
	el: '#app',
	router,
	store,
	render(h) {
		return h(SettingFrame);
	}
});
