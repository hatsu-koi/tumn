<template>
	<config-list :name="$t('settings.filters')" slug="filters" ref="filters">
		<template v-if="mockProcessor">
			<tile-filters :enabled-options="activeFilters" editable></tile-filters>
		</template>

		<warning-pane v-else icon="alert"
			:title="$t('settings.need_processor')"
			:desc="$t('settings.need_processor_cover')">
		</warning-pane>

		<setting-item>
			<span slot="title">
				{{$t('settings.user_dict')}}
			</span>

			<span slot="description">
				{{$t('settings.user_dict_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option">
				{{$t('settings.user_dict_edit')}}
			</button>
		</setting-item>
	</config-list>
</template>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import SettingItem from "../components/SettingItem.vue";
	import TileFilters from "../components/TileFilters.vue";
	import WarningPane from "../components/WarningPane.vue";

	import {mapState} from "vuex";

	export default {
		data() {
			return {
				mockProcessor: true
			};
		},

		computed: mapState({
			activeFilters: state => state.filters.active
		}),

		components: {
			ConfigList,
			SettingItem,
			TileFilters,
			WarningPane
		}
	};
</script>
