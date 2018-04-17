<template>
	<div id="app">
		<header class="Header">
			<img class="Header__logo" src="../images/logo.svg" alt="Tumn Logo">
			<span class="Header__text">Tumn</span>
		</header>

		<section class="Container">
			<main-button v-model="active">
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

		<sidebar title="Hooks" ref="hook"></sidebar>
	</div>
</template>

<style lang="less" scoped>
	#app {
		width: 300px;
		height: 400px;
		background: var(--theme-light-2);

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
			font-family: var(--theme-font);
			font-weight: 100;
			font-size: 40px;
			color: var(--theme-light-2);
		}
	}

	.Container {
		padding: 15px 0;
		flex: 1;
		overflow: auto;

		& > * {
			margin: 0 auto;
		}
	}

	.Config {
		margin-top: 15px;
		margin-bottom: 0;

		& > * {
			margin: 10px auto;
		}

		& > *:last-child {
			margin-bottom: 0;
		}

		h2 {
			color: var(--theme-dark-3);
			font-family: var(--theme-font);
			font-weight: 400;
			font-size: 21px;
			margin: 0;
			margin-left: 15px;
			padding: 0;
		}
	}
</style>

<script>
	import ListMenu from "../components/ListMenu.vue";
	import MainButton from "../components/MainButton.vue";
	import Navigation from "../components/Navigation.vue";
	import Sidebar from "../components/Sidebar.vue";

	export default {
		data() {
			return {
				active: true,
				check: false
			};
		},

		components: {
			ListMenu,
			MainButton,
			Navigation,
			Sidebar
		},

		methods: {
			openMenu(title) {
				console.log("Open!");
				this.$refs[title].open();
			}
		}
	};
</script>
