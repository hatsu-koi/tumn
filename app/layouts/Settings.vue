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

		<section-cover></section-cover>
		<section-customization></section-customization>

		<config-list name="Child Mode">
		</config-list>

		<config-list name="TroubleShooting">
		</config-list>
	</settings-pane>
</template>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import ConfigList from "../components/ConfigList.vue";
	import SectionCover from "./SectionCover.vue";
	import SectionCustomization from "./SectionCustomization.vue";
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
			ConfigList,
			SectionCover,
			SectionCustomization,
			SettingsHeader,
			SettingsPane,
			TileOptions
		}
	};
</script>
