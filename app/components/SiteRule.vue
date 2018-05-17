<template>
	<div class="SiteRule">
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

			<text-input v-model="name" :placeholder="$t('sites.match_input')" fill></text-input>
		</rule-item>
	</div>
</template>

<style lang="less" scoped>
	.SiteRule {
		flex: 1;
		padding: 5vh 5vw;

		&__title {
			font-family: var(--theme-font-title);
			color: var(--theme-grey-1);
			font-size: 2rem;
			font-weight: 200;
			margin-bottom: 4rem;
		}
	}
</style>

<script>
	import RuleItem from "./RuleItem.vue";
	import TextInput from "./TextInput.vue";

	export default {
		props: {
			rule: {
				type: String,
				default: ""
			}
		},

		computed: {
			name: {
				get() {
					return '';
				},

				set(v) {

				}
			}
		},

		components: {
			RuleItem,
			TextInput
		}
	};
</script>
