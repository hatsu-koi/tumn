<template>
	<div id="app">
		<side-nav></side-nav>
		<transition name="navigate" mode="out-in">
			<router-view></router-view>
		</transition>
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

	.navigate {
		&-enter-active, &-leave-active {
			transition: all .3s;
		}

		&-enter {
			transform: translateY(100vw);
		}

		&-leave-to {
			opacity: .3;
		}
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
