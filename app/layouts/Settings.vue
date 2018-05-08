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
					flatten description
					@open="closeExcept(i - 1)">
				</tile-options>
			</template>
		</config-list>

		<config-list name="Hooks">
		</config-list>

		<config-list name="Cover">
		</config-list>

		<config-list name="Child Mode">
		</config-list>

		<config-list name="TroubleShooting">
		</config-list>
	</settings-pane>
</template>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import ConfigList from "../components/ConfigList.vue";
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
			closeExcept(target) {
				this.$refs.filters.$children
					.filter((_, i) => i !== target)
					.forEach(elem => elem.folded = true);
			}
		},

		components: {
			Breadcrumb,
			ConfigList,
			SettingsHeader,
			SettingsPane,
			TileOptions
		}
	};
</script>
