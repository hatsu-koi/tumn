<template>
	<div class="Slider" :class="{'Slider--dragging': dragging}">
		<div class="Slider__label">
			<div class="Slider__title">
				<slot></slot>
			</div>

			<div class="Slider__description">
				<slot name="description"></slot>
			</div>
		</div>

		<div class="Slider__input">
			<div class="Slider__range" ref="range"></div>

			<div class="Slider__tooltip" :style="{left: `${internalValue}%`}">
				<span class="Slider__value">
					{{internalValue}}
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Slider {
		display: flex;
		flex: 1;

		&__input {
			position: relative;
			width: 100%;
			height: 30px;
			margin: 20px 0 8px 0;
			flex: 2;
		}

		&__label {
			color: var(--theme-grey-3);
			font-family: var(--theme-font);
			flex: 1;
		}

		&__description {
			color: var(--theme-grey-4);
			font-size: 12px;
			margin-top: 4px;
		}

		&__tooltip {
			position: absolute;
			background: var(--theme-color);
			display: flex;
			top: -35px;
			width: 0;
			height: 0;
			overflow: hidden;
			border-radius: 50%;
			transition: all .4s ease, left 0s;
			transform: translate(-50%, 35px) rotate(45deg);
		}

		&__value {
			display: block;
			color: var(--theme-grey-8);
			font-family: var(--theme-font);
			font-size: .8rem;
			text-align: center;
			line-height: 20px;
			width: 100%;
			height: 100%;
			transform: rotate(-45deg);
			transition: all .4s ease;
		}

		&--dragging &__tooltip {
			width: 35px;
			height: 35px;
			border-radius: 50% 50% 0 50%;
			transform: translate(-50%, -50%) rotate(45deg);
		}

		&--dragging &__value {
			line-height: 35px;
		}
	}
</style>

<style lang="less">
	.Slider {
		&--dragging &__input {
			.noUi {
				&-handle {
					transform: translate(-50%, -50%) scale(0);
				}
			}
		}

		&__input {
			.noUi {
				&-target {
					border: none;
					background: var(--theme-grey-7);
					border-radius: 0;
					box-shadow: none;
					height: 4px;
				}

				&-connects {
					border-radius: 0;
				}

				&-connect {
					background: var(--theme-color);
				}

				&-handle {
					top: 2px;
					width: 16px;
					height: 16px;
					background: var(--theme-color);
					border: none;
					border-radius: 100%;
					box-shadow: none;
					outline: none;
					transition: all .4s ease;
					transform: translate(-50%, -50%) scale(1);

					&::before, &::after {
						display: none;
					}
				}
			}
		}
	}
</style>

<script>
	import noUiSlider from 'nouislider';

	export default {
		data() {
			return {
				dragging: false,
				internalValue: 0
			};
		},

		model: {
			prop: 'value',
			event: 'update'
		},

		props: {
			value: Number,

			min: {
				type: Number,
				default: 0
			},

			max: {
				type: Number,
				default: 100
			}
		},

		methods: {
			updateSlider(value, propagate) {
				this.internalValue = parseInt(value);

				if(propagate)
					this.$emit('update', this.internalValue);
			}
		},

		watch: {
			value(v) {
				if(this.slider) this.slider.set(v);
			}
		},

		mounted() {
			this.internalValue = this.value;
			this.slider = noUiSlider.create(this.$refs.range, {
				start: this.value,
				connect: [true, false],
				range: {
					min: this.min,
					max: this.max
				}
			});

			this.slider.on('slide', (_, __, [value]) => this.updateSlider(value, false));
			this.slider.on('change', (_, __, [value]) => this.updateSlider(value, true));
			this.slider.on('start', () => this.dragging = true);
			this.slider.on('end', () => this.dragging = false);
		}
	}
</script>
