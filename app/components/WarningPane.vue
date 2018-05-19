<template>
	<div class="WarningPane" :class="{'WarningPane--info': info}">
		<i class="WarningPane__icon mdi" :class="`mdi-${icon}`"></i>
		<h2 class="WarningPane__title">{{title}}</h2>
		<span class="WarningPane__text">{{desc}}</span>
	</div>
</template>

<style lang="less" scoped>
	.WarningPane {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--theme-grey-8);
		margin: 40px 50px;
		padding: 50px 0;

		&--info {
			.WarningPane__icon {
				color: var(--theme-color);
			}
		}

		&__icon {
			// color: var(--theme-color);
			color: var(--theme-alert);
			font-size: 4rem;
		}

		&__title {
			font-family: var(--theme-font-title);
			// font-weight: 300;
			color: var(--theme-grey-1);
			margin-bottom: 5px;
		}

		&__text {
			font-family: var(--theme-font);
			color: var(--theme-grey-2);
		}
	}
</style>

<script>
	export default {
		props: {
			info: Boolean,
			title: {
				type: String,
				required: true
			},

			desc: {
				type: String,
				default: ''
			},

			icon: {
				type: String,
				default: 'alert'
			}
		}
	}
</script>
