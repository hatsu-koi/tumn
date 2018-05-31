<template>
	<config-list :name="$t('settings.cover.cover')" slug="cover">
		<setting-item nocontent>
			<checkbox v-model="toggleCover" reverse>
				{{$t('settings.cover.reveal_toggle')}}

				<span slot="description">
					{{$t('settings.cover.reveal_toggle_desc')}}
				</span>
			</checkbox>
		</setting-item>

		<setting-item nocontent>
			<slider v-model="opacity">
				{{$t('settings.cover.opacity')}}

				<span slot="description">
					{{$t('settings.cover.opacity_desc')}}
				</span>
			</slider>
		</setting-item>

		<setting-item nocontent>
			<slider v-model="hoverOpacity">
				{{$t('settings.cover.revealed_opacity')}}

				<span slot="description">
					{{$t('settings.cover.revealed_opacity_desc')}}
				</span>
			</slider>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.cover.cover')}}
			</span>

			<span slot="description">
				{{$t('settings.cover.cover_desc')}}
			</span>

			<span slot="option">
				{{filter}}
			</span>

			<carousel class="Cover__carousel"
				paginationActiveColor="#202020"
				paginationColor="#d1d2d3"
				navigationPrevLabel="⟨"
				navigationNextLabel="⟩"
				:navigationEnabled="true">

				<slide v-for="key in covers" :key="key">
					<div class="Cover__showcase">
						<div class="Cover__text">
							{{$t('settings.cover.placeholder_prefix')}}&nbsp;
							<span class="Tumn__AbuseFilter">
								<div class="Tumn__AbuseFilter__wrap" :style="getFilter(key)"></div>
								{{$t('settings.cover.placeholder_swear')}}
							</span>
							{{$t('settings.cover.placeholder_postfix')}}
						</div>

						<div class="Cover__content">
							<span class="Cover__title">{{key}}</span>
							<button class="Button"
								:class="{'Button--disabled': key === filter}"
								v-ripple="'rgba(255, 255, 255, .1)'"
								@click="setFilter(key)">

								{{$t('settings.cover.use')}}
							</button>
						</div>
					</div>
				</slide>

				<slide>
					<div class="Cover__showcase Cover__showcase--upload">
						<div class="Cover__text">
							<a @click="upload" v-ripple-small>+</a>
						</div>

						<div class="Cover__content">
							<span class="Cover__title">
								{{$t('settings.cover.upload')}}
							</span>
						</div>
					</div>
				</slide>
			</carousel>
		</setting-item>
	</config-list>
</template>

<style lang="less" scoped>
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
			height: 40px;
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
	import SettingItem from "../components/SettingItem.vue";
	import Slider from "../components/Slider.vue";

	import {bindState} from '../src/store/bindState';
	import filters from "../src/resources/filters";

	export default {
		data() {
			return {
				covers: Object.keys(filters)
			};
		},

		computed: bindState('config/cover', ['toggleCover', 'opacity', 'hoverOpacity', 'filter']),

		methods: {
			getFilter(id) {
				return {
					'background-image': `url(${filters[id]})`
				};
			},

			setFilter(id) {
				this.filter = id;
			},

			upload() {

			}
		},

		components: {
			Carousel,
			Checkbox,
			ConfigList,
			SettingItem,
			Slide,
			Slider
		}
	}
</script>
