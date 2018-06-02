import "../assets/less/abuse.less";
import {makeStore} from "./store"
import Tumn from "./Tumn";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const tumn = new Tumn(makeStore());

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript()
	}
});
