<template>
	<div class="Chart" :style="{height: `${height}px`}">
		<svg class="Chart__content" viewBox="0 0 1 1" preserveAspectRatio="none">
			<defs>
				<linearGradient id="chart-gradient" x1="40%" y1="0%" x2="60%" y2="100%">
					<stop offset="0%" style="stop-color: var(--theme-grad-1)"></stop>
					<stop offset="100%" style="stop-color: var(--theme-grad-2)"></stop>
				</linearGradient>
			</defs>
			<path :d="path" fill="url(#chart-gradient)"></path>
		</svg>

		<div class="Chart__dot" v-for="(value, index) in data" :style="valueCss(value, index)">
			<div class="Chart__tooltip">
				{{value[1]}}<br>{{value[0]}}
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.Chart {
		display: flex;
		position: relative;
		flex: 1;

		&__content {
			width: 100%;
			height: 100%;
		}

		&__dot {
			position: absolute;
			width: 15px;
			height: 15px;
			border-radius: 100%;
			background: var(--theme-grey-1);
			transform: translate(-50%, -50%);
			cursor: pointer;

			&:hover {
				.Chart__tooltip {
					opacity: 1;
				}
			}
		}

		&__tooltip {
			position: absolute;
			top: -50px;
			left: 50%;
			opacity: 0;
			background: var(--theme-grey-1);
			color: var(--theme-grey-9);
			font-family: var(--theme-font);
			padding: 10px;
			text-align: center;
			transition: all .4s ease;
			transform: translate(-50%, -50%);
			-webkit-font-smoothing: antialiased;
			white-space: nowrap;

			&::after {
				content: '';
				display: block;
				position: absolute;
				bottom: -19px;
				left: 50%;
				width: 0;
				height: 0;
				transform: translateX(-50%);

				border-top: 10px solid var(--theme-grey-1);
				border-left: 10px solid transparent;
				border-bottom: 10px solid transparent;
				border-right: 10px solid transparent;
			}
		}
	}
</style>

<script>
	export default {
		props: {
			data: {
				type: Array,
				required: true
			},

			height: {
				type: Number,
				default: 300
			}
		},

		computed: {
			length() {
				return this.data.length;
			},

			max() {
				return Math.max(...this.data.map(([v]) => v));
			},

			path() {
				return [
					'M0,1',
					...this.data.map(this.valueSvg),
					'L1,1',
					'Z'
				].join(' ');
			}
		},

		methods: {
			valuePosition([value], index) {
				return [(index + 1) / (this.length + 1), 1 - value / this.max];
			},

			valueCss(...args) {
				const [x, y] = this.valuePosition(...args);

				return {
					left: `${x * 100}%`,
					top: `${y * 100}%`
				};
			},

			valueSvg(...args) {
				const [x, y] = this.valuePosition(...args);

				return `L${x},${y}`;
			}
		}
	}
</script>
