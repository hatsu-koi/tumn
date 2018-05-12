<template>
	<config-list name="Customization">
		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">Theme Color</span>
					<span class="SettingItem__description">Color of Tumn UI</span>
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
					<span class="SettingItem__title">Theme Font</span>
					<span class="SettingItem__description">Text font of Tumn UI (Comma-seperated list)</span>
				</div>
			</div>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">Theme Title Font</span>
					<span class="SettingItem__description">Title font of Tumn UI (Comma-seperated list)</span>
				</div>
			</div>
		</div>

		<div class="SettingItem">
			<div class="SettingItem__content">
				<div class="SettingItem__label">
					<span class="SettingItem__title">Language</span>
					<span class="SettingItem__description">Language which will be used in UI</span>
				</div>
			</div>
		</div>
	</config-list>
</template>

<script>
	import ColorChooser from "../components/ColorChooser.vue";
	import ConfigList from "../components/ConfigList.vue";

	import {bindState} from '../src/bindState';

	export default {
		components: {
			ColorChooser,
			ConfigList
		},

		computed: bindState('config/customization', ['color', 'font', 'title'])
	}
</script>
