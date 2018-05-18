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


			<div class="Row">
				<selector v-model="matchType" :items="matchSelector"></selector>
				<text-input v-model="match" :placeholder="$t('sites.match_input')" fill></text-input>
			</div>
		</rule-item>

		<rule-item>
			<span slot="title">{{$t('sites.filters')}}</span>
			<span slot="description">{{$t('sites.filters_desc')}}</span>

			<tile-options v-for="filter in filters"
				:key="filter.id"
				:title="filter.title"
				:options="filter.options"
				:enabled-options="rule.rules.filters"
				:update="updateFilter"
				type="filter" flatten>

			</tile-options>
		</rule-item>

		<rule-item>
			<span slot="title">{{$t('sites.hooks')}}</span>
			<span slot="description">{{$t('sites.hooks_desc')}}</span>

			<tile-options v-for="hook in hooks"
				:key="hook.id"
				:title="hook.title"
				:options="hook.options"
				:update="updateHook"
				:enabled-options="rule.rules.hooks"
				type="hook" flatten>

			</tile-options>
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
</style>

<script>
	import Checkbox from "./Checkbox.vue";
	import RuleItem from "./RuleItem.vue";
	import Selector from "./Selector.vue";
	import TextInput from "./TextInput.vue";
	import TileOptions from "./TileOptions.vue";

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
