<template>
	<settings-pane class="Overview">
		<h1>{{$t("settings.overview")}}</h1>

		<div class="Content Scroller Scroller--horizontal" ref="content" @mousewheel="scrollToHorizontal">
			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-puzzle"></i> {{$t("settings.plugins")}}
				</h2>

				<list-menu icon="hook"
					:desc="$t('settings.active', {num: 1})"
					@click="navigateSetting('hooks')" large>

					{{$t("settings.hooks")}}
				</list-menu>

				<list-menu icon="filter"
					:desc="$t('settings.active', {num: 3})"
					@click="navigateSetting('filters')" large>

					{{$t("settings.filters")}}
				</list-menu>
			</div>

			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-cloud"></i> {{$t("settings.processor")}}
				</h2>

				<span class="Indicator Indicator--online">
					<i class="mdi mdi-triangle"></i>
					{{$t("settings.processor_online")}}
				</span>

				<list-menu icon="bug" @click="navigateSetting('trouble-shooting')" large>
					{{$t("settings.troubleshooting.troubleshooting")}}
				</list-menu>
			</div>

			<div class="Column">
				<h2 class="Column__title">
					<i class="mdi mdi-history"></i> {{$t("settings.filtered_words")}}
				</h2>

				<span class="Figure">
					30000
				</span>
			</div>
		</div>

		<footer class="Footer">
			<chart :data="mockChart" :height="200"></chart>
		</footer>
	</settings-pane>
</template>

<style lang="less" scoped>
	.Content {
		display: flex;
		overflow: auto;

		flex: 0 0 auto;

		padding: 50px 5vw;
		margin: 30px 5vw;
	}

	.Column {
		display: flex;
		flex-direction: column;

		&:not(:last-child) {
			margin-right: 5vw;
		}

		&__title {
			font-family: var(--theme-font-title);
			font-weight: 300;
			font-size: 2.1rem;
			margin: 0;
			padding: 0;
			color: var(--theme-grey-2);
			white-space: nowrap;
		}

		.ListMenu {
			margin-top: 25px;
		}
	}

	.Figure {
		color: var(--theme-color);
		font-size: 2.5rem;
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
		color: var(--theme-grey-5);
		font-family: var(--theme-font-title);
		font-size: 1.2rem;
	}

	.Footer {
		display: flex;
		flex: 1 0 200px;
		align-items: flex-end;
	}
</style>

<script>
	import Chart from "../components/Chart.vue";
	import ListMenu from "../components/ListMenu.vue";
	import SettingsPane from "../components/SettingsPane.vue";

	export default {
		components: {
			Chart,
			ListMenu,
			SettingsPane
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
				this.$router.push(`settings#${text}`);
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
