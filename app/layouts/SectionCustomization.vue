<template>
	<config-list :name="$t('settings.customization.customization')" slug="customization">
		<setting-item>
			<span slot="title">
				{{$t('settings.customization.theme_color')}}
			</span>

			<span slot="description">
				{{$t('settings.customization.theme_color_desc')}}
			</span>

			<color-chooser slot="option"
				:palette="['#1e98e9', '#03a9f4', '#00bcd4', '#ffc107', '#ff9800', '#e65100']"
				v-model="color">

			</color-chooser>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.customization.theme_font')}}
			</span>

			<span slot="description">
				{{$t('settings.customization.theme_font_desc')}}
			</span>

			<text-input slot="option" v-model="font"></text-input>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.customization.theme_title')}}
			</span>

			<span slot="description">
				{{$t('settings.customization.theme_title_desc')}}
			</span>

			<text-input slot="option" v-model="title"></text-input>
		</setting-item>

		<setting-item>
			<span slot="title">
				{{$t('settings.customization.language')}}
			</span>

			<span slot="description">
				{{$t('settings.customization.language_desc')}}
			</span>

			<selector slot="option" v-model="i18n" :items="items"></selector>
		</setting-item>
	</config-list>
</template>

<script>
	import ColorChooser from "../components/ColorChooser.vue";
	import ConfigList from "../components/ConfigList.vue";
	import Selector from "../components/Selector.vue";
	import SettingItem from "../components/SettingItem.vue";
	import TextInput from "../components/TextInput.vue";

	import {bindState} from '../src/bindState';
	import translation from "../src/translation";

	export default {
		data() {
			return {
				items: Object.keys(translation).map(k => ({
					value: k,
					text: translation[k].name
				}))
			};
		},

		components: {
			ColorChooser,
			ConfigList,
			Selector,
			SettingItem,
			TextInput
		},

		computed: bindState('config/customization', ['color', 'font', 'title', 'i18n']),

		watch: {
			i18n() {
				location.reload();
			}
		}
	};
</script>
