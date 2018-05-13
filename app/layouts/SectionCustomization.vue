<template>
	<config-list :name="$t('settings.customization.customization')" slug="customization">
		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">
						{{$t('settings.customization.theme_color')}}
					</span>
					<span class="SettingItem__description">
						{{$t('settings.customization.theme_color_desc')}}
					</span>
				</div>

				<color-chooser
					:palette="['#1e98e9', '#03a9f4', '#00bcd4', '#ffc107', '#ff9800', '#e65100']"
					v-model="color">

				</color-chooser>
			</div>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">
						{{$t('settings.customization.theme_font')}}
					</span>
					<span class="SettingItem__description">
						{{$t('settings.customization.theme_font_desc')}}
					</span>
				</div>

				<text-input v-model="font"></text-input>
			</div>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">
						{{$t('settings.customization.theme_title')}}
					</span>
					<span class="SettingItem__description">
						{{$t('settings.customization.theme_title_desc')}}
					</span>
				</div>

				<text-input v-model="title"></text-input>
			</div>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">
						{{$t('settings.customization.language')}}
					</span>
					<span class="SettingItem__description">
						{{$t('settings.customization.language_desc')}}
					</span>
				</div>

				<selector v-model="i18n" :items="items"></selector>
			</div>
		</div>
	</config-list>
</template>

<script>
	import ColorChooser from "../components/ColorChooser.vue";
	import ConfigList from "../components/ConfigList.vue";
	import Selector from "../components/Selector.vue";
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
