<template>
	<div class="Slider" :class="{'Slider--dragging': drag}">
		<div class="Slider__title">
			<slot></slot>
		</div>

		<div class="Slider__input">
			<div class="Slider__range" ref="range"></div>

			<div class="Slider__value" v-if="slide">
				{{value}}
			</div>
		</div>

		<div class="Slider__description">
			<slot name="description"></slot>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Slider {
		&__input {
			-webkit-appearance: none;
			width: 100%;
			margin: 8.35px 0;
			outline: none;

			&::-webkit-slider-runnable-track {
				width: 100%;
				height: 3px;
				cursor: pointer;
				background: #484d4d;
			}

			&::-webkit-slider-thumb {
				box-shadow: 0px 0px 1px #670000, 0px 0px 0px #810000;
				border: 0px solid #ff1e00;
				height: 27px;
				width: 18px;
				border-radius: 0px;
				background: rgba(255, 67, 95, 0.99);
				cursor: pointer;
				-webkit-appearance: none;
				margin-top: -0.7px;
			}

			&:focus::-webkit-slider-runnable-track {
				background: #545a5a;
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
				_value: 0
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
			updateSlider(propagate) {
				this._value = this.slider.get();

				if(propagate)
					this.$emit('update', parseInt(this._value));
			}
		},

		watch: {
			value(v) {
				if(this.slider) this.slider.set(v);
			}
		},

		mounted() {
			this._value = this.value;

			this.slider = noUiSlider.create(this.$refs.range, {
				start: this.value,
				connect: [true, false],
				range: {
					min: this.min,
					max: this.max
				}
			});

			this.slider.on('slide', () => this.updateSlider(false));
			this.slider.on('change', () => this.updateSlider(true));
			this.slider.on('start', () => this.dragging = true);
			this.slider.on('end', () => this.dragging = false);
		}
	}
</script>
