<template>
	<settings-pane class="Sites">
		<div class="Sites__wrapper">
			<aside class="SiteList" @click="activeRule = ''">
				<h2 class="SiteList__title">
					{{$t('sites.sites')}}
				</h2>

				<transition-group name="FadeSlide" tag="div" class="SiteList__list Scroller">
					<button v-for="rule in rules"
						class="SiteList__button Button Button--flat"
						:class="{'SiteList__button--active': activeRule === rule.id}"
						:key="rule.id"
						v-ripple="'rgba(255, 255, 255, .1)'"
						@click="openRule(rule, $event)">

						{{rule.name}}
					</button>
				</transition-group>

				<button class="SiteList__fab" v-ripple="'rgba(255, 255, 255, .1)'" @click="newRule($event)">
					<i class="mdi mdi-plus"></i>
				</button>
			</aside>

			<site-rule :rule-id="activeRule" class="Options" @remove="activeRule = ''"></site-rule>
		</div>
	</settings-pane>
</template>

<style lang="less" scoped>
	.Sites__wrapper {
		flex: 1;
		display: flex;
		align-items: stretch;
		height: 100vh;
	}

	.SiteList {
		display: flex;
		flex-direction: column;
		background: var(--theme-grey-8);
		padding: 20px 40px;
		width: 300px;
		position: relative;
		overflow: hidden;

		&__list {
			display: flex;
			flex: 1;
			flex-direction: column;
			overflow: hidden;

			&:hover {
				overflow: auto;
			}
		}

		&__title {
			font-family: var(--theme-font-title);
			color: var(--theme-grey-2);
			font-size: 1.4rem;
			font-weight: 300;
			padding-bottom: 1.5rem;
		}

		&__button {
			height: 50px;
			flex: 0 0 50px;

			color: var(--theme-grey-2);
			background: var(--theme-grey-7);
			font-size: 1.1rem;
			margin: 0;
			margin-bottom: 1.1rem;

			&--active {
				background: var(--theme-color);
				color: var(--theme-grey-9);
			}
		}

		&__fab {
			position: absolute !important;
			right: 60px;
			bottom: 60px;
			background: var(--theme-color);
			color: var(--theme-grey-9);
			width: 50px;
			height: 50px;
			cursor: pointer;
			border: none;
			outline: none;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .3);
			font-size: 1.2rem;
			border-radius: 50%;

			transition: all .4s ease;

			&:hover {
				box-shadow: 1px 3px 6px 0 rgba(0, 0, 0, .4);
			}
		}
	}
</style>

<script>
	import SettingsPane from "../components/SettingsPane.vue";
	import SiteRule from "./SiteRule.vue";

	import {mapState} from "vuex";

	export default {
		data() {
			return {
				activeRule: ''
			};
		},

		computed: mapState({
			rules: state => state.sites.sites
		}),

		methods: {
			openRule(rule, ev) {
				this.activeRule = rule.id;
				ev.stopPropagation();
			},

			newRule(ev) {
				const newId = this.$store.getters['sites/maxId'];
				this.$store.commit('sites/addSite', {
					set: {
						name: this.$t('sites.new_rule', {num: newId}),
						id: newId,
						match: {
							type: 'MatchPatterns',
							value: String.raw`*://*.domain.tld/*`
						},
						rules: {
							hooks: [],
							filters: []
						}
					}
				});

				this.activeRule = newId;
				ev.stopPropagation();
			}
		},

		components: {
			SettingsPane,
			SiteRule
		}
	};
</script>
