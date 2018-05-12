<template>
	<settings-pane class="Settings">
		<settings-header>
			<router-link to="/settings" tag="li">Settings</router-link>
		</settings-header>

		<h1>Settings</h1>

		<config-list name="Filters" ref="filters">
			<template v-for="i in 3">
				<tile-options
					:key="i"
					:title="mock.title"
					:options="mock.options"
					flatten description editable
					@open="closeExcept('filters', i - 1)">
				</tile-options>
			</template>
		</config-list>

		<config-list name="Hooks" ref="hooks">
			<template v-for="i in 3">
				<tile-options
					:key="i"
					:title="mock.title"
					:options="mock.options"
					flatten description editable
					@open="closeExcept('hooks', i - 1)">
				</tile-options>
			</template>
		</config-list>

		<cover-section></cover-section>

		<config-list name="Customization">
			<div class="SettingItem">
				<div class="SettingItem__content">
					<div class="SettingItem__label">
						<span class="SettingItem__title">Theme Color</span>
						<span class="SettingItem__description">Color of Tumn UI</span>
					</div>
					<color-chooser :palette="customization.palette" v-model="customization.color"></color-chooser>
				</div>
			</div>

			<!-- TODO Language, color, font chooser-->
		</config-list>

		<config-list name="Child Mode">
		</config-list>

		<config-list name="TroubleShooting">
		</config-list>
	</settings-pane>
</template>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import ColorChooser from "../components/ColorChooser.vue";
	import ConfigList from "../components/ConfigList.vue";
	import CoverSection from "../components/CoverSection.vue";
	import SettingsHeader from "../components/SettingsHeader.vue";
	import SettingsPane from "../components/SettingsPane.vue";
	import TileOptions from "../components/TileOptions.vue";

	export default {
		data() {
			return {
				mock: {
					title: "Khinenw's NN FilterSet",
					options: [
						{
							name: 'MatureContentNN',
							description: "Filters Mature Content by neural network.",
							active: false
						},

						{
							name: 'SwearwordsNN',
							description: "Filters Swearwords by neural network.",
							active: false
						},

						{
							name: 'HateSpeechNN',
							description: "Filters Hate Speeches by neural network.",
							active: true
						}
					]
				},

				customization: {
					color: '#1e98e9',
					palette: ['#1e98e9', '#03a9f4', '#00bcd4', '#ffc107', '#ff9800', '#e65100']
				}
			};
		},

		methods: {
			closeExcept(name, target) {
				this.$refs[name].$children
					.filter((_, i) => i !== target)
					.forEach(elem => elem.folded = true);
			}
		},

		components: {
			Breadcrumb,
			ColorChooser,
			ConfigList,
			CoverSection,
			SettingsHeader,
			SettingsPane,
			TileOptions
		}
	};
</script>
