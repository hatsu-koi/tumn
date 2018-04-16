<template>
	<label class="Checkbox">
		<input class="Checkbox__input" type="checkbox" v-model="_checked">
		<div class="Checkbox__decorator"></div>
		<span class="Checkbox__label">
			<slot></slot>
		</span>
	</label>
</template>

<style lang="less" scoped>
	.Checkbox {
		display: inline-flex;
		align-items: center;

		&__input {
			display: none;
		}

		&__decorator {
			content: '';
			display: inline-flex;
			position: relative;
			width: 20px;
			height: 20px;

			background: transparent;
			border: 2px solid var(--theme-color);
			border-radius: 11px 0 11px 11px;

			cursor: pointer;
			transition: background .4s ease;


			&::before {
				content: '';
				display: inline-block;

				position: absolute;
				top: 0;
				left: 0;
				width: 0;
				height: 0;

				opacity: 0;
				transform-origin: bottom left;

				border-right: 2px solid var(--theme-color);
				border-bottom: 2px solid var(--theme-color);
			}
		}

		&__input:checked + &__decorator {
			transition: background .2s .3s ease;
			background: var(--theme-color);

			&::before {
				animation: check .3s ease;
				animation-fill-mode: forwards;
			}
		}

		&__label {
			margin-left: 15px;
			font-family: var(--theme-font);
			color: var(--theme-dark-1);
		}
	}

	@keyframes check {
		0% {
			transform: translateX(3.5px) translateY(8px) rotate(45deg);
			width: 0;
			height: 0;
			opacity: 0;
		}

		25% {
			opacity: 1;
		}

		50% {
			transform: translateX(3.5px) translateY(8px) rotate(45deg);
			width: 5px;
			height: 0;
			opacity: 1;
		}

		100% {
			transform: translateX(3.5px) translateY(-2px) rotate(45deg);
			width: 5px;
			height: 10px;
			opacity: 1;
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'checked',
			event: 'change'
		},

		props: {
			checked: Boolean
		},

		computed: {
			_checked: {
				get() {
					return this.checked;
				},

				set(newValue) {
					this.$emit('change', newValue);
				}
			}
		}
	};
</script>
