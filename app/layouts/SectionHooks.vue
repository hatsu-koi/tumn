<template>
	<config-list :name="$t('settings.hooks')" slug="hooks" ref="hooks">
		<template v-for="(hook, index) in hooks">
			<tile-options
				class="HookOptions"
				type="hooks"
				:key="hook.id"
				:title="hook.title"
				:options="hook.options"
				flatten description editable
				@open="closeExcept('hooks', index)">
			</tile-options>
		</template>
	</config-list>
</template>

<style lang="less" scoped>
	.HookOptions {
		&:first-child {
			margin-top: 40px;
		}

		&:last-child {
			margin-bottom: 40px;
		}
	}
</style>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import TileOptions, {closeExcept} from "../components/TileOptions.vue";

	import {mapState} from "vuex";

	export default {
		methods: {
			closeExcept
		},

		computed: mapState({
			hooks: state => state.hooks.hooks
		}),

		components: {
			ConfigList,
			TileOptions
		}
	};
</script>
