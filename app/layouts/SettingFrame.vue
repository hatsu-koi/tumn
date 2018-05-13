<template>
	<app>
		<side-nav></side-nav>
		<transition name="Navigate" mode="out-in">
			<router-view></router-view>
		</transition>
	</app>
</template>

<style lang="less" scoped>
	#app {
		width: 100vw;
		height: 100vh;
		background: var(--theme-grey-9);

		display: flex;
		position: relative;
		overflow: hidden;
	}
</style>

<script>
	import App from "../components/App.vue";
	import SideNav from "../components/SideNav.vue";

	export default {
		components: {
			App,
			SideNav
		}
	};
</script>
