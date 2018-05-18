<template>
	<settings-pane class="Sites">
		<div class="Sites__wrapper">
			<aside class="SiteList">
				<h2 class="SiteList__title">
					{{$t('sites.sites')}}
				</h2>

				<button v-for="rule in rules"
					class="SiteList__button Button Button--flat"
					:class="{'SiteList__button--active': activeRule === rule.id}"
					v-ripple="'rgba(255, 255, 255, .1)'"
					@click="openRule(rule)">

					{{rule.name}}
				</button>

				<button class="SiteList__fab" v-ripple="'rgba(255, 255, 255, .1)'">
					<i class="mdi mdi-plus"></i>
				</button>
			</aside>

			<site-rule :rule-id="activeRule" class="Options"></site-rule>
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

		&__title {
			font-family: var(--theme-font-title);
			color: var(--theme-grey-2);
			font-size: 1.4rem;
			font-weight: 300;
			padding-bottom: 1.5rem;
		}

		&__button {
			display: flex;
			color: var(--theme-grey-2);
			background: var(--theme-grey-7);
			height: 50px;
			align-items: center;
			justify-content: center;
			font-size: 1.1rem;

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
	import SiteRule from "../components/SiteRule.vue";

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
			openRule(rule) {
				this.activeRule = rule.id;
			}
		},

		components: {
			SettingsPane,
			SiteRule
		}
	};
</script>
