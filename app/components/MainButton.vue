<template>
	<button class="MainButton" :class="{'MainButton--active': active}" @click="toggle">
		<div class="MainButton__text">
			<i class="mdi mdi-check" v-if="active"></i>
			<i class="mdi mdi-close" v-else></i>
			{{$t('extension.filtering')}}
		</div>

		<div class="MainButton__identifier">
			<div class="MainButton__identifier__text">
				<slot name="identifier"></slot>
			</div>
		</div>
	</button>
</template>

<style lang="less" scoped>
	.MainButton {
		display: flex;
		width: 250px;
		height: 36px;
		padding: 0;
		background: var(--theme-grey-7);
		border: none;
		cursor: pointer;
		outline: none;
		font-family: var(--theme-font);

		transition: all .3s ease;

		&:hover {
			.MainButton__identifier {
				width: 16px;
			}
		}

		* {
			font-size: 18px;
			height: 36px;
			line-height: 36px;
		}

		&__text {
			flex: 1;
			color: var(--theme-grey-3);
			text-align: center;

			& > .mdi {
				margin-right: 10px;
			}
		}

		&__identifier {
			display: flex;
			width: 0;
			transition: width .3s ease;
			overflow: hidden;

			&::before {
				content: '';
				width: 0;
				height: 0;
				border-top: 18px solid transparent;
				border-left: 8px solid transparent;
				border-right: 8px solid var(--theme-grey-10);
				border-bottom: 18px solid var(--theme-grey-10);
			}

			&__text {
				background: var(--theme-grey-10);
				color: var(--theme-grey-4);
				flex: 1;
				text-align: center;
			}
		}

		&--active {
			background: var(--theme-color);

			.MainButton__text {
				color: var(--theme-grey-10);
			}

			.MainButton__identifier {
				width: 80px;
			}
		}

		&--active:hover {
			.MainButton__identifier {
				width: 96px;
			}
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'active',
			event: 'change'
		},

		props: {
			active: Boolean
		},

		computed: {
			_active: {
				get() {
					return this.active;
				},

				set(newValue) {
					this.$emit('change', newValue);
				}
			}
		},

		methods: {
			toggle() {
				if(this._active) {
					this._active = false;
					return;
				}

				this._active = true;
			}
		}
	};
</script>
