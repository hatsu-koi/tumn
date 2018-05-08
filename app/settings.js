import Overview from "./layouts/Overview.vue";
import SettingFrame from "./layouts/SettingFrame.vue";
import Settings from "./layouts/Settings.vue";
import Sites from "./layouts/Sites.vue";
import Statistics from "./layouts/Statistics.vue";
import Vue from "vue";
import VueRippleSmall from "./src/VueRippleSmall";
import VueRouter from "vue-router";

import "./less/index.less";

Vue.directive('ripple-small', VueRippleSmall);
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{path: '/', component: Overview},
		{path: '/settings/', component: Settings},
		{path: '/settings/:name/', component: Settings},
		{path: '/sites', component: Sites},
		{path: '/statistics', component: Statistics}
	]
});

new Vue({
	el: '#app',
	router,
	render(h) {
		return h(SettingFrame);
	}
});
