import Extension from "./layouts/Extension.vue";
import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";

import makeStore from "./src/store";
import "./less/index.less";

Vue.use(Vuex);
Vue.use(VueI18n);

const {store, i18n} = makeStore();

new Vue({
	el: '#app',
	store,
	i18n,
	render(h) {
		return h(Extension);
	}
});
