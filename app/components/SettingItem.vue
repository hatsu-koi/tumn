<template>
	<div class="SettingItem">
		<div class="SettingItem__content" v-if="!nocontent">
			<div class="SettingItem__label">
				<span class="SettingItem__title">
					<slot name="title"></slot>
				</span>
				<span class="SettingItem__description">
					<slot name="description"></slot>
				</span>
			</div>

			<slot name="option"></slot>
		</div>

		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
	.SettingItem {
		display: flex;
		flex-direction: column;
		padding: 0 70px;
		max-width: 768px;
		margin: 30px auto;
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
		}
	}
</style>

<script>
	export default {
		props: {
			nocontent: Boolean
		}
	};
</script>
