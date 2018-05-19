<template>
	<div class="TileFilters">
		<transition name="FadeSlide" mode="out-in">
			<warning-pane v-if="filters.length === 0" icon="information-outline" info
				:title="$t('settings.no_filters')"
				:desc="$t('settings.no_filters_desc')">

			</warning-pane>

			<tile-options v-else v-for="(filter, index) in filters"
				class="OptionSectionItem"
				type="filters"
				:key="filter.id"
				:elem="filter"
				:update="update"
				:enabled-options="enabledOptions"
				:editable="editable"
				flatten description
				@open="closeExcept('filters', filter.id)">

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
			filters: state => state.filters.filters
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
