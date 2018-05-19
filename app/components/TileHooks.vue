<template>
	<div class="TileHooks">
		<transition name="FadeSlide" mode="out-in">
			<warning-pane v-if="hooks.length === 0" icon="information-outline" info
				:title="$t('settings.no_hooks')"
				:desc="$t('settings.no_hooks_desc')">

			</warning-pane>

			<tile-options v-else v-for="(hook, index) in hooks"
				class="OptionSectionItem"
				type="hooks"
				:key="hook.id"
				:elem="hook"
				:update="update"
				:enabled-options="enabledOptions"
				:editable="editable"
				flatten description
				@open="closeExcept('hooks', hook.id)">

			</tile-options>
		</transition>
	</div>
</template>

<script>
	import TileOptions, {closeExcept} from "./TileOptions.vue";
	import WarningPane from "./WarningPane.vue";

	import {mapState} from "vuex";

	export default {
		props: {
			editable: Boolean,
			update: Function,
			enabledOptions: Array
		},

		computed: mapState({
			hooks: state => state.hooks.hooks
		}),

		methods: {
			closeExcept
		},

		components: {
			TileOptions,
			WarningPane
		}
	};
</script>
