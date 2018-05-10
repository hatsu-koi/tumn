<template>
	<section class="Tile" :class="{'Tile--flatten': flatten}">
		<slot name="title"></slot>
		<hr class="Tile__divider">

		<div class="Tile__content">
			<slot></slot>
		</div>
	</section>
</template>

<style lang="less" scoped>
	.Tile {
		background: var(--theme-grey-7);
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .3);
		padding: 15px;
		margin: 15px;
		margin-top: 20px;

		h1 {
			color: var(--theme-grey-4);
			margin: 0;
			padding: 0;
			font-family: var(--theme-font);
			font-weight: 400;
			font-size: 18px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&__divider {
			border: none;
			border-top: 3px solid var(--theme-grey-4);
			max-width: 50px;
			margin-left: 0;
			margin-right: 0;
			margin-top: 10px;
			margin-bottom: 20px;
		}

		&--flatten {
			background: transparent;
			box-shadow: none;
			margin: 0;
			padding: 0;

			h1 {
				font-weight: 300;
				font-size: 1.3rem;
			}

			.Tile__divider {
				border: none;
				margin: 0;
			}

			.Tile__content {
				padding-left: 50px;
			}
		}
	}
</style>

<script>
	export default {
		props: {
			flatten: Boolean
		}
	};
</script>
