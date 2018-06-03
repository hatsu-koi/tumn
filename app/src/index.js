import "../assets/less/abuse.less";
import makeStore from "./store"
import PackageInfo from "../../package.json";
import Tumn from "./Tumn";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

console.log(`Tumn ${PackageInfo.version}`);
window.$TUMN = new Tumn(makeStore());
