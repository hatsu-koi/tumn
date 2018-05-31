<template>
	<config-list :name="$t('settings.troubleshooting.troubleshooting')" slug="trouble-shooting">
		<setting-item>
			<span slot="title">
				{{$t('settings.troubleshooting.show_log')}}
			</span>

			<span slot="description">
				{{$t('settings.troubleshooting.show_log_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option">
				<i class="mdi mdi-open-in-new"></i>&nbsp;
				{{$t('settings.troubleshooting.show_log_button')}}
			</button>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.troubleshooting.issue')}}
			</span>

			<span slot="description">
				{{$t('settings.troubleshooting.issue_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option">
				<i class="mdi mdi-open-in-new"></i>&nbsp;
				{{$t('settings.troubleshooting.issue_button')}}
			</button>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.troubleshooting.import')}}
			</span>

			<span slot="description">
				{{$t('settings.troubleshooting.import_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option">
				<i class="mdi mdi-import"></i>&nbsp;
				{{$t('settings.troubleshooting.import_button')}}
			</button>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.troubleshooting.export')}}
			</span>

			<span slot="description">
				{{$t('settings.troubleshooting.export_desc')}}
			</span>

			<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" slot="option">
				<i class="mdi mdi-export"></i>&nbsp;
				{{$t('settings.troubleshooting.export_button')}}
			</button>
		</setting-item>
	</config-list>
</template>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import SettingItem from "../components/SettingItem.vue";

	import {bindState} from '../src/store/bindState';

	export default {
		computed: bindState('config/cover', ['toggleCover', 'opacity', 'hoverOpacity', 'filter']),

		components: {
			ConfigList,
			SettingItem
		}
	};
</script>
