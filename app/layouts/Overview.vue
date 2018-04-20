<template>
	<section id="overview">
		<header class="Header">
			<breadcrumb>
				<li>Tumn</li>
				<li>Tumn</li>
				<li>Overview</li>
			</breadcrumb>
		</header>

		<div class="Content">
			<h1>Overview</h1>
		</div>
	</section>
</template>

<style lang="less" scoped>
	#overview {
		flex: 1;

		display: flex;
		flex-direction: column;
	}

	.Header {
		display: flex;
		background: var(--theme-light-1);
		height: 80px;
		align-items: center;
	}

	.Content {
		margin: 5vw;

		h1 {
			font-family: var(--theme-font);
			font-weight: 100;
			font-size: 3.5rem;
			color: var(--theme-dark-2);
			margin: 0;
		}
	}
</style>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";

	export default {
		components: {
			Breadcrumb
		}
	};
</script>
