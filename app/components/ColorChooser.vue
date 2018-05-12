<template>
	<div class="ColorChooser">
		<div class="ColorChooser__colors">
			<button v-for="color in palette"
				class="Color"
				:class="{'Color--active': color === activeColor}"
				:style="{background: color}"
				@click="handleColor(color)">
					<i class="Color__icon mdi mdi-check" v-ripple-small></i>
			</button>

			<button class="Color Color--add"
				:class="{'Color--active': customColor === activeColor, 'Color--dark': isCustomDark}"
				:style="{background: customColor}"
				@click="handleCustomColor()">

				<i class="Color__icon mdi mdi-check" v-ripple-small></i>
				<i class="Color__add mdi mdi-plus" v-ripple-small></i>
			</button>

			<div class="Dialog" v-if="dialog">
				<a class="Dialog__close" @click="dialog = false">
					<i class="mdi mdi-close"></i>
				</a>

				<chrome-picker
					:value="customColor"
					@input="updateCustomColor"
					ref="picker">
				</chrome-picker>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.ColorChooser {
		display: flex;
		margin: 0 30px;

		&__colors {
			display: flex;
			position: relative;
		}
	}

	.Color {
		width: 50px;
		height: 50px;
		border: none;
		border-radius: 5px;
		margin: 0 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		position: relative;

		&__icon {
			visibility: hidden;
			width: 30px;
			height: 30px;
			line-height: 30px;
			font-size: 0;
			border-radius: 50%;
			background: transparent;
			color: transparent;
			transition: all .3s ease;
			z-index: 2;
			position: relative;
		}

		&__add {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: rgba(0, 0, 0, .9);
			font-size: 1.3rem;
			transition: all .4s ease;
		}

		&--active {
			.Color__icon {
				visibility: visible;
				background: rgba(0, 0, 0, .7);
				color: var(--theme-grey-7);
				font-size: 1.2rem;
			}

			.Color__add {
				top: 0;
				left: 100%;
				transform: translate(-100%, 0);
			}
		}

		&--dark {
			.Color__add {
				color: rgba(255, 255, 255, .9);
			}
		}
	}

	.Dialog {
		position: absolute;
		top: 0;
		left: 100%;

		&__close {
			position: absolute;
			top: 0;
			right: 0;
			margin: 5px;
			z-index: 2;
			background: rgba(0, 0, 0, .6);
			border-radius: 50%;
			width: 20px;
			height: 20px;
			text-align: center;
			line-height: 20px;
			color: var(--theme-grey-7);
			cursor: pointer;
		}
	}
</style>

<script>
	import {Chrome} from 'vue-color';
	import Color from "color";

	export default {
		data() {
			return {
				customColor: 'rgba(230,230,230,1)',
				dialog: false
			};
		},

		model: {
			prop: 'activeColor',
			event: 'change'
		},

		props: {
			palette: {
				type: Array,
				default: []
			},

			activeColor: {
				type: String,
				default: "#000"
			}
		},

		methods: {
			setColor(color) {
				this.$emit('change', color);
				document.querySelector('html').style.setProperty('--theme-color', color);
				document.querySelector('html').style.setProperty('--theme-chart-1', color);
				document.querySelector('html').style.setProperty(
					'--theme-chart-2', Color(color).lighten(0.3).rgbString()
				);
			},

			handleColor(color) {
				this.setColor(color);
				this.dialog = false;
			},

			handleCustomColor(color) {
				this.setColor(this.customColor);
				this.dialog = true;
			},

			updateCustomColor({rgba}) {
				this.customColor = `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
				this.setColor(this.customColor);
			}
		},

		computed: {
			isCustomDark() {
				const color = Color(this.customColor);
				const alpha = color.alpha();

				return color.alpha(1).mix(Color('#fff'), 1 - alpha).dark();
			}
		},

		mounted() {
			if(!this.palette.includes(this.activeColor)) {
				this.customColor = this.activeColor;
			}
		},

		components: {
			'chrome-picker': Chrome
		}
	};
</script>
