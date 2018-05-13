import Overview from "./layouts/Overview.vue";
import SettingFrame from "./layouts/SettingFrame.vue";
import Settings from "./layouts/Settings.vue";
import Sites from "./layouts/Sites.vue";
import Statistics from "./layouts/Statistics.vue";
import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueRipple from "vue-ripple-directive";
import VueRippleSmall from "./src/VueRippleSmall";
import VueRouter from "vue-router";

import makeStore from "./src/store";
import "./less/index.less";

Vue.directive('ripple', VueRipple);
Vue.directive('ripple-small', VueRippleSmall);
Vue.use(VueI18n);
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

const {store, i18n} = makeStore();

new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render(h) {
		return h(SettingFrame);
	}
});
