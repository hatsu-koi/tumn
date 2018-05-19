<template>
	<div class="SiteRule Scroller Scroller--vertical" v-if="rule">
		<h2 class="SiteRule__title">
			{{$t('sites.setting', {name})}}
		</h2>

		<rule-item>
			<span slot="title">{{$t('sites.name')}}</span>

			<text-input v-model="name" :placeholder="$t('sites.name_input')" fill></text-input>
		</rule-item>

		<rule-item>
			<span slot="title">{{$t('sites.match')}}</span>
			<span slot="description">{{$t('sites.match_desc')}}</span>


			<div class="Row Match">
				<selector class="Match__selector" v-model="matchType" :items="matchSelector"></selector>

				<text-input class="Match__text"
					v-model="match"
					:placeholder="$t('sites.match_input')" fill>

				</text-input>
			</div>
		</rule-item>

		<rule-item ref="filter">
			<span slot="title">{{$t('sites.filters')}}</span>
			<span slot="description">{{$t('sites.filters_desc')}}</span>

			<div class="TileOptionsList">
				<tile-options v-for="(filter, index) in filters"
					:key="filter.id"
					:title="filter.title"
					:options="filter.options"
					:update="updateFilter"
					:enabled-options="rule.rules.filters"
					@open="closeExcept('filter', index)"
					type="filter" flatten description>

				</tile-options>
			</div>
		</rule-item>

		<rule-item ref="hook">
			<span slot="title">{{$t('sites.hooks')}}</span>
			<span slot="description">{{$t('sites.hooks_desc')}}</span>

			<div class="TileOptionsList">
				<tile-options v-for="(hook, index) in hooks"
					:key="hook.id"
					:title="hook.title"
					:options="hook.options"
					:update="updateHook"
					:enabled-options="rule.rules.hooks"
					@open="closeExcept('hook', index)"
					type="hook" flatten description>

				</tile-options>
			</div>
		</rule-item>
	</div>
</template>

<style lang="less" scoped>
	.SiteRule {
		flex: 1;
		padding: 5vh 5vw;
		overflow: auto;

		&__title {
			font-family: var(--theme-font-title);
			color: var(--theme-grey-1);
			font-size: 2rem;
			font-weight: 200;
			margin-bottom: 4rem;
		}
	}

	.Row {
		display: flex;
	}

	.Match {
		&__selector {
			flex: 1;
			margin-right: 0;
		}

		&__text {
			flex: 2;
			margin-left: 0;
		}
	}
</style>

<script>
	import Checkbox from "../components/Checkbox.vue";
	import RuleItem from "../components/RuleItem.vue";
	import Selector from "../components/Selector.vue";
	import TextInput from "../components/TextInput.vue";
	import TileOptions, {closeExcept} from "../components/TileOptions.vue";

	import {mapState} from "vuex";
	import bindState from "../src/bindState";

	export default {
		data() {
			return {
				matchSelector: [
					{
						value: 'Regex',
						text: this.$t('sites.match.regex')
					},

					{
						value: 'MatchPatterns',
						text: this.$t('sites.match.match_patterns')
					}
				]
			};
		},

		props: {
			ruleId: {
				type: String,
				default: ""
			}
		},

		computed: {
			...mapState({
				filters: state => state.filters.filters,
				hooks: state => state.hooks.hooks
			}),

			rule() {
				return this.$store.state.sites.sites.find(v => v.id === this.ruleId);
			},

			name: {
				get() {
					return this.rule.name;
				},

				set(value) {
					this.$store.commit('sites/updateSite', {id: this.ruleId, key: 'name', value});
				}
			},

			matchType: {
				get() {
					return this.rule.match.type;
				},

				set(value) {
					this.$store.commit('sites/setMatcher', {id: this.ruleId, type: value});
				}
			},

			match: {
				get() {
					return this.rule.match.value;
				},

				set(value) {
					this.$store.commit('sites/setMatcher', {id: this.ruleId, value});
				}
			}
		},

		methods: {
			closeExcept,

			updateFilter() {
				
			},

			updateHook() {

			}
		},

		components: {
			Checkbox,
			RuleItem,
			Selector,
			TextInput,
			TileOptions
		}
	};
</script>
