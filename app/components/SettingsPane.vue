<template>
	<section class="SettingsPane Scroller Scroller--vertical">
		<slot></slot>
	</section>
</template>

<style lang="less" scoped>
	.SettingsPane {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;

		overflow: auto;

		h1 {
			font-family: var(--theme-font-title);
			font-weight: 100;
			font-size: 3.5rem;
			color: var(--theme-dark-2);
			margin: 0;
			padding-top: 5vh;
			padding-left: 5vw;
		}
	}
</style>
