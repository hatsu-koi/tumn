<template>
	<section class="Overview Scroller Scroller--vertical">
		<header class="Header">
			<breadcrumb>
				<router-link to="/" tag="li">Tumn</router-link>
			</breadcrumb>
		</header>

		<h1>Overview</h1>

		<div class="Content Scroller Scroller--horizontal" ref="content" @mousewheel="scrollToHorizontal">
			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-puzzle"></i> Plugins
				</h2>

				<list-menu icon="hook" desc="1 Active" @click="navigateSetting('hook')" large>
					Hooks
				</list-menu>

				<list-menu icon="filter" desc="3 Active" @click="navigateSetting('filter')" large>
					Filters
				</list-menu>
			</div>

			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-cloud"></i> Processor
				</h2>

				<span class="Indicator Indicator--online">
					<i class="mdi mdi-triangle"></i>
					Online
				</span>

				<list-menu icon="bug" @click="navigateSetting('trouble-shooting')" large>
					Troubleshooting
				</list-menu>
			</div>

			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-history"></i> Filtered Words
				</h2>

				<span class="Figure">
					30000
				</span>
			</div>
		</div>

		<footer class="Footer">
			<chart :data="mockChart" :height="200"></chart>
		</footer>
	</section>
</template>

<style lang="less" scoped>
	.Overview {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;

		overflow: auto;

		h1 {
			font-family: var(--theme-font);
			font-weight: 100;
			font-size: 3.5rem;
			color: var(--theme-dark-2);
			margin: 0;
			padding-top: 5vh;
			padding-left: 5vw;
		}
	}

	.Header {
		display: flex;
		background: var(--theme-light-1);
		height: 80px;
		align-items: center;
		flex: 0 0 auto;
	}

	.Content {
		display: flex;
		overflow: auto;

		flex: 0 0 auto;

		padding: 50px 5vw;
		margin: 30px 5vw;
	}

	.Scroller {
		color: rgba(0, 0, 0, .1);
		transition: color .4s ease;

		&:hover {
			color: rgba(0, 0, 0, .2);
		}

		&::-webkit-scrollbar {
			background: transparent;
			height: 8px;
		}

		&::-webkit-scrollbar-thumb {
			background: transparent;
			box-shadow: inset 0 0 0 10px;
			//border-radius: 8px;
		}

		&--vertical::-webkit-scrollbar {
			width: 8px;
		}

		&--horizontal::-webkit-scrollbar {
			height: 8px;
		}
	}

	.Column {
		display: flex;
		flex-direction: column;

		&:not(:last-child) {
			margin-right: 5vw;
		}

		&__title {
			font-family: var(--theme-font);
			font-weight: 300;
			font-size: 2.5rem;
			margin: 0;
			padding: 0;
			color: var(--theme-dark-2);
			white-space: nowrap;
		}

		.ListMenu {
			margin-top: 25px;
		}
	}

	.Figure {
		color: var(--theme-color);
		font-size: 3rem;
		align-self: center;
		flex: 1;
		display: flex;
		align-items: center;
	}

	.Indicator {
		&--online .mdi {
			color: var(--theme-color);
		}

		margin-top: 5px;
		color: var(--theme-dark-5);
		font-family: var(--theme-font);
		font-size: 1.4rem;
	}

	.Footer {
		display: flex;
		flex: 1 0 200px;
		align-items: flex-end;
	}
</style>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import Chart from "../components/Chart.vue";
	import ListMenu from "../components/ListMenu.vue";

	export default {
		components: {
			Breadcrumb,
			Chart,
			ListMenu
		},

		data() {
			return {
				scrollThrottle: 0,
				mockChart: [
					[1000, '2/22 (Sun)'],
					[3000, '2/23 (Mon)'],
					[2000, '2/24 (Tue)'],
					[4000, '2/25 (Wed)'],
					[1000, '2/26 (Thu)'],
					[2000, '2/27 (Fri)'],
					[5000, '2/28 (Sat)']
				]
			};
		},

		methods: {
			navigateSetting(text) {
				this.$router.push(`settings/${text}`);
			},

			scrollToHorizontal(ev) {
				const elem = this.$refs.content;
				if(ev.deltaY > 0 && elem.scrollLeft >= elem.scrollWidth - elem.clientWidth) return;
				if(ev.deltaY < 0 && elem.scrollLeft <= 0) return;

				ev.preventDefault();
				if(Date.now() - this.scrollThrottle < 500) return;

				this.scrollThrottle = Date.now();

				elem.scrollBy({
					left: ev.deltaY * 3,
					behavior: 'smooth'
				});
			}
		}
	};
</script>
