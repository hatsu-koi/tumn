<template>
	<header class="SettingsHeader">
		<breadcrumb>
			<router-link to="/" tag="li">Tumn</router-link>
			<slot></slot>
		</breadcrumb>
	</header>
</template>

<style lang="less" scoped>
	.SettingsHeader {
		display: flex;
		background: var(--theme-grey-7);
		height: 80px;
		align-items: center;
		flex: 0 0 auto;
	}
</style>
	
<script>
	import Breadcrumb from "./Breadcrumb.vue";

	export default {
		components: {
			Breadcrumb
		}
	};
</script>
