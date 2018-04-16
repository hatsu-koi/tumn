import Index from "./pages/Index.vue";
import Vue from "vue";

import "./less/index.less";

new Vue({
	el: '#app',
	render(h) {
		return h(Index);
	}
});
