<template>
	<div class="RuleItem">
		<div class="RuleItem__content" v-if="!nocontent">
			<div class="RuleItem__label">
				<span class="RuleItem__title">
					<slot name="title"></slot>
				</span>
				<span class="RuleItem__description">
					<slot name="description"></slot>
				</span>
			</div>
		</div>

		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
	.RuleItem {
		display: flex;
		flex-direction: column;
		padding: 0 70px;
		max-width: 768px;
		margin: 50px 0;
		font-family: var(--theme-font);

		&__content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--theme-grey-4);
		}

		&__label {
			display: flex;
			flex-direction: column;
		}

		&__title {
			color: var(--theme-grey-3);
		}

		&__description {
			color: var(--theme-grey-4);
			font-size: 12px;
			margin-top: 4px;
			margin-bottom: 8px;
		}
	}
</style>
