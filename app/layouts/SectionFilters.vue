<template>
	<config-list :name="$t('settings.filters')" slug="filters" ref="filters">
		<template v-if="processorOnline">
			<tile-filters :enabled-options="activeFilters" editable></tile-filters>
		</template>

		<warning-pane v-else icon="alert"
			:title="$t('settings.need_processor')"
			:desc="$t('settings.need_processor_cover')">
		</warning-pane>

		<hr class="HorizontalDivider">

		<setting-item>
			<span slot="title">
				{{$t('settings.user_dict')}}
			</span>

			<span slot="description">
				{{$t('settings.user_dict_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option" @click="dictDialog = true">
				{{$t('settings.user_dict_edit')}}
			</button>
		</setting-item>

		<transition name="Backdrop-fade">
			<user-dict v-if="dictDialog" @close="dictDialog = false"></user-dict>
		</transition>
	</config-list>
</template>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import SettingItem from "../components/SettingItem.vue";
	import TileFilters from "../components/TileFilters.vue";
	import UserDict from "./UserDict.vue";
	import WarningPane from "../components/WarningPane.vue";

	import {mapState} from "vuex";

	export default {
		data() {
			return {
				dictDialog: false
			};
		},

		computed: mapState({
			activeFilters: state => state.filters.active,
			processorOnline: state => state.status.processorOnline
		}),

		components: {
			ConfigList,
			SettingItem,
			TileFilters,
			UserDict,
			WarningPane
		}
	};
</script>
