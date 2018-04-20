import Extension from "./layouts/Extension.vue";
import Vue from "vue";

import "./less/index.less";

new Vue({
	el: '#app',
	render(h) {
		return h(Extension);
	}
});
