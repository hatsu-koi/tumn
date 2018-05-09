<template>
	<settings-pane class="Settings">
		<settings-header>
			<router-link to="/settings" tag="li">Settings</router-link>
		</settings-header>

		<h1>Settings</h1>

		<config-list name="Filters" ref="filters">
			<template v-for="i in 3">
				<tile-options
					:key="i"
					:title="mock.title"
					:options="mock.options"
					flatten description
					@open="closeExcept('filters', i - 1)">
				</tile-options>
			</template>
		</config-list>

		<config-list name="Hooks" ref="hooks">
			<template v-for="i in 3">
				<tile-options
					:key="i"
					:title="mock.title"
					:options="mock.options"
					flatten description
					@open="closeExcept('hooks', i - 1)">
				</tile-options>
			</template>
		</config-list>

		<config-list name="Cover">
			<carousel class="Cover__carousel"
				paginationActiveColor="#202020"
				paginationColor="#d1d2d3"
				:navigationEnabled="true">

				<slide v-for="i in 10" :key="i">
					<div class="Cover__showcase">
						<div class="Cover__text">
							너 느 아버지가&nbsp;
							<span class="Tumn__AbuseFilter">
								<div class="Tumn__AbuseFilter__wrap" :style="getFilter('f01')"></div>
									고자라지
							</span>
						</div>

						<div class="Cover__content">
							<span class="Cover__title">Filter 01</span>
							<button class="Button">Use</button>
						</div>
					</div>
				</slide>

				<slide>
					<div class="Cover__showcase Cover__showcase--upload">
						<div class="Cover__text">
							<a @click="upload" v-ripple-small>+</a>
						</div>

						<div class="Cover__content">
							<span class="Cover__title">Upload</span>
						</div>
					</div>
				</slide>
			</carousel>
		</config-list>

		<config-list name="Child Mode">
		</config-list>

		<config-list name="TroubleShooting">
		</config-list>
	</settings-pane>
</template>

<style lang="less" scoped>
	.Cover {
		&__carousel {
			margin: 0 80px;
		}

		&__showcase {
			height: 200px;
			margin: 30px;
			background: var(--theme-light-2);

			display: flex;
			flex-direction: column;
		}

		&__content {
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: var(--theme-dark-1);
			font-family: var(--theme-font-title);
			background: var(--theme-light-1);
		}

		&__text {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;

			font-family: var(--theme-font);
			font-weight: 400;
			color: var(--theme-dark-1);
		}

		&__title {
			margin-left: 30px;
		}

		&__showcase--upload &__text a{
			font-size: 3rem;
			font-family: var(--theme-font);
			font-weight: 100;
			text-align: center;
			line-height: 3.4rem;
			cursor: pointer;
			width: 3.4rem;
			height: 3.4rem;
		}
	}
</style>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import {Carousel, Slide} from "vue-carousel";
	import ConfigList from "../components/ConfigList.vue";
	import SettingsHeader from "../components/SettingsHeader.vue";
	import SettingsPane from "../components/SettingsPane.vue";
	import TileOptions from "../components/TileOptions.vue";

	import filters from "../src/filters";

	export default {
		data() {
			return {
				mock: {
					title: "Khinenw's NN FilterSet",
					options: [
						{
							name: 'MatureContentNN',
							description: "Filters Mature Content by neural network.",
							active: false
						},

						{
							name: 'SwearwordsNN',
							description: "Filters Swearwords by neural network.",
							active: false
						},

						{
							name: 'HateSpeechNN',
							description: "Filters Hate Speeches by neural network.",
							active: true
						}
					]
				}
			};
		},

		methods: {
			closeExcept(name, target) {
				this.$refs[name].$children
					.filter((_, i) => i !== target)
					.forEach(elem => elem.folded = true);
			},

			getFilter(id) {
				return {
					'background-image': `url(${filters[id]})`
				};
			},

			upload() {

			}
		},

		components: {
			Breadcrumb,
			Carousel,
			ConfigList,
			SettingsHeader,
			SettingsPane,
			Slide,
			TileOptions
		}
	};
</script>
