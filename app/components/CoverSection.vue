<template>
	<config-list name="Cover">
		<div class="SettingItem">
			<checkbox v-model="cover.toggleCover" reverse>
				Toggle revealing by click

				<span slot="description">
					If you click cover, it will reveal.
				</span>
			</checkbox>
		</div>

		<div class="SettingItem">
			<slider v-model="cover.opacity">
				Opacity

				<span slot="description">
					Default opacity of cover.
				</span>
			</slider>
		</div>

		<div class="SettingItem">
			<slider v-model="cover.hoverOpacity">
				Revealed Opacity

				<span slot="description">
					Opacity of cover when hovered.
				</span>
			</slider>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">Cover</span>
					<span class="SettingItem__description">Image of cover</span>
				</div>
				<span class="SettingItem__value">Filter 01</span>
			</div>

			<carousel class="Cover__carousel"
				paginationActiveColor="#202020"
				paginationColor="#d1d2d3"
				navigationPrevLabel="⟨"
				navigationNextLabel="⟩"
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
							<button class="Button" v-ripple="'rgba(255, 255, 255, .1)'">Use</button>
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
		</div>
	</config-list>
</template>

<style lang="less" scoped>
	.SettingItem {
		display: flex;
		flex-direction: column;
		padding: 0 70px;
		max-width: 768px;
		margin: 30px auto;
		font-family: var(--theme-font);

		&__content {
			display: flex;
			justify-content: space-between;
		}

		&__label {
			display: flex;
			flex-direction: column;
		}

		&__title {
			color: var(--theme-grey-3);
		}

		&__description {
			color: var(--theme-grey-4);
			font-size: 12px;
			margin-top: 4px;
		}

		&__value {
			color: var(--theme-grey-4);
		}
	}

	.Cover {
		&__carousel {
			margin-top: 30px;
		}

		&__showcase {
			height: 200px;
			margin: 5px 30px;
			background: var(--theme-grey-9);

			display: flex;
			flex-direction: column;
		}

		&__content {
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: var(--theme-grey-1);
			font-family: var(--theme-font-title);
			background: var(--theme-grey-7);
		}

		&__text {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;

			font-family: var(--theme-font);
			font-weight: 400;
			color: var(--theme-grey-1);
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

<style>
	.Cover__carousel .VueCarousel .VueCarousel-navigation-button {
		top: calc(50% - 29px);
		font-family: var(--theme-font);
		font-weight: 700;
	}
</style>

<script>
	import {Carousel, Slide} from "vue-carousel";
	import Checkbox from "../components/Checkbox.vue";
	import ConfigList from "../components/ConfigList.vue";
	import Slider from "../components/Slider.vue";

	import filters from "../src/filters";

	export default {
		data() {
			return {
				cover: {
					toggleCover: false,
					opacity: 0,
					hoverOpacity: 0
				}
			};
		},

		methods: {
			getFilter(id) {
				return {
					'background-image': `url(${filters[id]})`
				};
			},

			upload() {

			}
		},

		components: {
			Carousel,
			Checkbox,
			ConfigList,
			Slide,
			Slider
		}
	}
</script>
