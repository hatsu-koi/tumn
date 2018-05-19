<template>
	<config-list :name="$t('settings.hooks')" slug="hooks" ref="hooks">
		<tile-hooks :enabled-options="activeHooks" editable></tile-hooks>
	</config-list>
</template>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import TileHooks from "../components/TileHooks.vue";

	import {mapState} from "vuex";

	export default {
		computed: mapState({
			activeHooks: state => state.hooks.active
		}),

		components: {
			ConfigList,
			TileHooks
		}
	};
</script>
