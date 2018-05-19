<template>
	<transition name="Navigate">
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

			<rule-item>
				<span slot="title">{{$t('sites.filters')}}</span>
				<span slot="description">{{$t('sites.filters_desc')}}</span>

				<tile-filters :update="updateContent('filters')" :enabled-options="rule.rules.filters"></tile-filters>
			</rule-item>

			<rule-item>
				<span slot="title">{{$t('sites.hooks')}}</span>
				<span slot="description">{{$t('sites.hooks_desc')}}</span>

				<tile-hooks :update="updateContent('hooks')" :enabled-options="rule.rules.hooks"></tile-hooks>
			</rule-item>

			<rule-item class="Row Row--reverse Row--fit">
				<button class="Row__button Button Button--alert" v-ripple="'rgba(255, 255, 255, .1)'" @click="remove">
					<i class="mdi mdi-delete"></i>
					{{$t('sites.remove')}}
				</button>
			</rule-item>
		</div>
	</transition>
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

		&--reverse {
			flex-direction: row-reverse !important;
		}

		&--fit {
			margin: 0 !important;
		}

		&__button {
			max-width: 150px;
		}
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
	import TileFilters from "../components/TileFilters.vue";
	import TileHooks from "../components/TileHooks.vue";

	import swal from "sweetalert2";

	export default {
		data() {
			return {
				matchSelector: [
					{
						value: 'Regex',
						text: this.$t('sites.regex')
					},

					{
						value: 'MatchPatterns',
						text: this.$t('sites.match_patterns')
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
			updateContent(contentName) {
				return (option, active) => {
					let target = 'sites/removeRuleContent';

					if(active) {
						target = 'sites/addRuleContent';
					}

					this.$store.commit(target, {
						id: this.ruleId,
						type: contentName,
						contentId: option.id
					});
				};
			},

			remove() {
				swal({
					title: this.$t(`sites.remove_dialog`, {name: this.name}),
					text: this.$t(`sites.remove_dialog_desc`, {name: this.name}),
					type: 'warning',
					showCancelButton: true,
					confirmButtonText: this.$t(`sites.remove_dialog_confirm`),
					cancelButtonText: this.$t(`sites.remove_dialog_cancel`)
				}).then((result) => {
					if(!result.value) return;

					this.$emit('remove');
					this.$store.commit(`sites/removeSite`, {
						id: this.rule.id
					});
				});
			}
		},

		components: {
			Checkbox,
			RuleItem,
			Selector,
			TextInput,
			TileFilters,
			TileHooks
		}
	};
</script>
