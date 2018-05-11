<template>
	<div class="ColorChooser">
		<button v-for="color in palette"
			class="Color"
			:class="{'Color--active': color === activeColor}"
			:style="{background: color}"
			@click="setColor(color)">
				<i class="Color__icon mdi mdi-check" v-ripple-small></i>
		</button>

		<button class="Color Color--add"
			:class="{'Color--active': customColor === activeColor}"
			:style="{background: customColor}"
			@click="handleCustomColor()">

			<i class="Color__icon mdi mdi-check" v-ripple-small></i>
			<i class="Color__add mdi mdi-plus" v-ripple-small></i>
		</button>

		<chrome-picker
			:value="customColor"
			@input="updateCustomColor"
			v-if="dialog"
			ref="picker">
		</chrome-picker>
	</div>
</template>

<style lang="less" scoped>
	.ColorChooser {
		display: flex;
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
			font-size: 1.3rem;
		}

		&--active {
			.Color__icon {
				visibility: visible;
				background: rgba(0, 0, 0, .3);
				color: var(--theme-grey-7);
				font-size: 1.2rem;
			}
		}
	}
</style>

<script>
	import {Chrome} from 'vue-color';

	export default {
		data() {
			return {
				customColor: '#e1e1e1',
				dialog: false
			}
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
			},

			handleCustomColor(color) {
				if(this.activeColor === this.customColor) {
					this.dialog = true;
					return;
				}

				this.setColor(this.customColor);
			},

			updateCustomColor({rgba}) {
				this.customColor = `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`;
				this.setColor(this.customColor);
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
