<template>
	<app>
		<header class="Header">
			<img class="Header__logo" src="../images/logo.svg" alt="Tumn Logo">
			<span class="Header__text">Tumn</span>
		</header>

		<section class="Container">
			<main-button v-model="filteringActive">
				<span slot="identifier">
					100%
				</span>
			</main-button>

			<section class="Config">
				<h2>Current Site</h2>
				<list-menu icon="hook" desc="1 Active" @click="openMenu('hook')">
					Hooks
				</list-menu>

				<list-menu icon="filter" desc="3 Active" @click="openMenu('filter')">
					Filters
				</list-menu>

				<list-menu icon="arrange-bring-forward" desc="Blur" @click="openMenu('cover')">
					Cover
				</list-menu>
			</section>
		</section>

		<navigation></navigation>
		<transition name="Backdrop--fade">
			<div class="Backdrop" v-if="menuActive" @click="closeMenu()"></div>
		</transition>

		<sidebar title="Hooks" ref="hook" v-model="menu.hook">
			<tile-options :title="mock.title" :options="mock.options"></tile-options>
		</sidebar>
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

		background: linear-gradient(to right, #478cdc, #12a8bd);

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
		transition: all .4s ease;

		&--fade-enter, &--fade-leave-to {
			opacity: 0;
		}
	}
</style>

<script>
	import App from "../components/App.vue";
	import ListMenu from "../components/ListMenu.vue";
	import MainButton from "../components/MainButton.vue";
	import Navigation from "../components/Navigation.vue";
	import Sidebar from "../components/Sidebar.vue";
	import TileOptions from "../components/TileOptions.vue";

	export default {
		data() {
			return {
				filteringActive: true,
				menu: {
					hook: false,
					filter: false,
					cover: false
				},

				mock: {
					title: "Khinenw's NN FilterSet",
					options: [
						{
							name: 'MatureContentNN',
							description: "Filters Mature Content by neural network.",
							active: false
						},

						{
							name: 'SwearwordsNN',
							description: "Filters Swearwords by neural network.",
							active: false
						},

						{
							name: 'HateSpeechNN',
							description: "Filters Hate Speeches by neural network.",
							active: true
						}
					]
				}
			};
		},

		components: {
			App,
			ListMenu,
			MainButton,
			Navigation,
			Sidebar,
			TileOptions
		},

		methods: {
			openMenu(title) {
				this.$refs[title].open();
			},

			closeMenu() {
				Object.keys(this.menu).forEach(v => this.$refs[v].close());
			}
		},

		computed: {
			menuActive() {
				return Object.keys(this.menu).some(v => this.menu[v]);
			}
		}
	};
</script>
