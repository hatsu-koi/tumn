<template>
	<div class="Carousel">
		<a class="Carousel__slide--left" @click="slide(-1)">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
				<path d="M64,0 L0,32 L64,64"/>
			</svg>
		</a>

		<div class="Carousel__content">
			<slot></slot>
		</div>

		<a class="Carousel__slide--right" @click="slide(1)">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
				<path d="M0,64 L64,32 L0,64"/>
			</svg>
		</a>
	</div>
</template>

<style lang="less" scoped>
	.Carousel {
		display: flex;

		&__content {
			flex: 1;
			overflow: hidden;

			& > * {
				width: 100%;
			}
		}

		&__slide {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);

			path {
				fill: transparent;
				stroke: var(--theme-dark-1);
				stroke-width: 1px;
			}

			&--left {
				left: 0;
			}

			&--right {
				right: 0;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				position: 0
			};
		},

		methods: {
			slide(i) {
				const length = this.$slots.default.length;
				this.position = (((this.position + i) % length) + length) % length;
			}
		}
	}
</script>
