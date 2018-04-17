<template>
	<section class="Tile">
		<slot name="title"></slot>
		<hr class="Tile__divider">
		<slot></slot>
	</section>
</template>

<style lang="less" scoped>
	.Tile {
		background: var(--theme-dark-1);
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .3);
	}
</style>
