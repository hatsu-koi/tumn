import makeStore from "../store";
import translation from "../resources/translation";
import Vue from "vue";
import VueI18n from "vue-i18n";
import VueClickOutside from "v-click-outside";
import VueRipple from "vue-ripple-directive";
import VueRippleSmall from "../../directives/VueRippleSmall";
import Vuex from "vuex";

import "../../less/index.less";

export default function init(elem, options) {
	Vue.directive('ripple', VueRipple);
	Vue.directive('ripple-small', VueRippleSmall);
	Vue.use(VueClickOutside);
	Vue.use(VueI18n);
	Vue.use(Vuex);

	const store = makeStore();

	const i18n = new VueI18n({
		locale: store.state.config.customization.i18n,
		messages: translation,
		silentTranslationWarn: true
	});

	new Vue({
		el: '#app',
		...options,
		store,
		i18n,
		render(h) {
			return h(elem);
		}
	});
};
