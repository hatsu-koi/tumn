<template>
	<div id="app">
		<side-nav></side-nav>
		<router-view></router-view>
	</div>
</template>

<style lang="less" scoped>
	#app {
		width: 100vw;
		height: 100vh;
		background: var(--theme-light-2);

		display: flex;
		position: relative;
		overflow: hidden;
	}
</style>

<script>
	import SideNav from "../components/SideNav.vue";

	export default {
		components: {
			SideNav
		}
	};
</script>
