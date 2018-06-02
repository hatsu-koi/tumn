<template>
	<app>
		<header class="Header">
			<img class="Header__logo" src="../assets/images/logo.svg" alt="Tumn Logo">
			<span class="Header__text">Tumn</span>
		</header>

		<section class="Container" v-if="tab && !offline">
			<main-button v-model="filteringActive">
				<span slot="identifier">
					34%
				</span>
			</main-button>

			<section class="Config">
				<h2>{{$t('extension.current_site')}}</h2>
				<list-menu icon="hook"
					:desc="$t('extension.active', {num: siteRule.rules.hooks.length})"
					@click="openMenu('hook')">

					{{$t('extension.hooks')}}
				</list-menu>

				<list-menu icon="filter"
					:desc="$t('extension.active', {num: siteRule.rules.filters.length})"
					@click="openMenu('filter')">

					{{$t('extension.filters')}}
				</list-menu>
			</section>
		</section>

		<section class="Container Container--offline" v-else>
			<div class="Notification" v-if="!offline">
				<i class="Notification__icon mdi mdi-alert"></i>
				<h2 class="Notification__title">{{$t('extension.no_url')}}</h2>
				<span class="Notification__text">{{$t('extension.no_url_desc')}}</span>
			</div>

			<div class="Notification" v-else>
				<i class="Notification__icon mdi mdi-alert"></i>
				<h2 class="Notification__title">{{$t('extension.offline')}}</h2>
				<span class="Notification__text">{{$t('extension.offline_desc')}}</span>
			</div>
		</section>

		<navigation></navigation>
		<transition name="Backdrop-fade">
			<div class="Backdrop" v-if="menuActive" @click="closeMenu()"></div>
		</transition>

		<template v-if="tab">
			<sidebar :title="$t('extension.hooks')" ref="hook" v-model="menu.hook">
				<tile-options v-for="hook in hooks"
					:key="hook.id"
					:elem="hook"
					:enabled-options="siteRule.rules.hooks"
					:update="updateContent('hooks')">

				</tile-options>
			</sidebar>

			<sidebar :title="$t('extension.filters')" ref="filter" v-model="menu.filter">
				<tile-options v-for="filter in filters"
					:key="filter.id"
					:elem="filter"
					:enabled-options="siteRule.rules.filters"
					:update="updateContent('filters')">

				</tile-options>
			</sidebar>
		</template>
	</app>
</template>

<style lang="less" scoped>
	#app {
		width: 300px;
		height: 450px;
		background: var(--theme-grey-9);

		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}

	.Header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;

		background: linear-gradient(to right, var(--theme-grad-1), var(--theme-grad-2));

		&__logo {
			width: 80px;
			height: 80px;
		}

		&__text {
			font-family: var(--theme-font-title);
			font-weight: 100;
			font-size: 40px;
			color: var(--theme-grey-9);
		}
	}

	.Container {
		padding: 30px 0;
		flex: 1;
		overflow: auto;

		& > * {
			margin: 0 auto;
		}

		&--offline {
			display: flex;
			align-items: stretch;
			flex-direction: column;
			padding: 0;
		}
	}

	.Notification {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		text-align: center;
		margin: 0;
		padding: 0 10px;

		&__icon {
			color: var(--theme-color);
			font-size: 4rem;
		}

		&__title {
			font-family: var(--theme-font-title);
			font-weight: 300;
			color: var(--theme-grey-1);
			margin-bottom: 15px;
			font-size: 1.5rem;
		}

		&__text {
			font-family: var(--theme-font);
			color: var(--theme-grey-4);
			text-align: center;
			word-break: keep-all;
		}
	}

	.Config {
		margin-top: 30px;
		margin-bottom: 0;

		& > * {
			margin: 10px auto;
		}

		& > *:last-child {
			margin-bottom: 0;
		}

		h2 {
			color: var(--theme-grey-3);
			font-family: var(--theme-font-title);
			font-weight: 400;
			font-size: 21px;
			margin: 0;
			margin-left: 15px;
			padding: 0;
		}
	}

	.Backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
	}
</style>

<script>
	import App from "../components/App.vue";
	import ListMenu from "../components/ListMenu.vue";
	import MainButton from "../components/MainButton.vue";
	import Navigation from "../components/Navigation.vue";
	import Sidebar from "../components/Sidebar.vue";
	import TileOptions from "../components/TileOptions.vue";
	import WarningPane from "../components/WarningPane.vue";

	import {mapState} from "vuex";

	export default {
		data() {
			return {
				tab: false,
				siteRule: null,
				filteringActive: true,
				menu: {
					hook: false,
					filter: false,
					cover: false
				},
				offline: false
			};
		},

		components: {
			App,
			ListMenu,
			MainButton,
			Navigation,
			Sidebar,
			TileOptions,
			WarningPane
		},

		methods: {
			openMenu(title) {
				this.$refs[title].open();
			},

			closeMenu() {
				Object.keys(this.menu).forEach(v => this.$refs[v].close());
			},

			updateContent(contentName) {
				return (option, active) => {
					if(!this.siteRule.id) {
						this.createSite();
					}

					let target = 'sites/removeRuleContent';

					if(active) {
						target = 'sites/addRuleContent';
					}

					this.$store.commit(target, {
						id: this.siteRule.id,
						type: contentName,
						contentId: option.id
					});
				};
			},

			createSite() {
				const newId = this.$store.getters['sites/maxId'];
				this.siteRule.id = newId;
				this.$store.commit('sites/addSite', {
					set: this.siteRule
				});
			}
		},

		computed: {
			menuActive() {
				return Object.keys(this.menu).some(v => this.menu[v]);
			},

			...mapState({
				filters: state => state.filters.filters,
				hooks: state => state.hooks.hooks
			})
		},

		created() {
			if(!window.chrome || !chrome.tabs) return;

			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, ([tab]) => {
				if(!tab) return;

				const urlBase = tab.url.split(':\/\/')[1].split('\/')[0];
				const url = '*:\/\/' + urlBase;
				const title = tab.title;
				let existing = this.$store.state.sites.sites.find(v => v.match.value === url);

				if(!existing) {
					existing = {
						name: `${title} (${urlBase})`,
						match: {
							type: 'MatchPatterns',
							value: url
						},
						rules: {
							hooks: this.$store.state.hooks.active.slice(),
							filters: this.$store.state.filters.active.slice()
						}
					};
				}

				this.siteRule = existing;
				this.tab = true;
			});
		}
	};
</script>
