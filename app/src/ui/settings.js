import Overview from "../../layouts/Overview.vue";
import SettingFrame from "../../layouts/SettingFrame.vue";
import Settings from "../../layouts/Settings.vue";
import Sites from "../../layouts/Sites.vue";
import Statistics from "../../layouts/Statistics.vue";
import Vue from "vue";
import VueRouter from "vue-router";

import init from "./init";

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

init(SettingFrame, {router});
