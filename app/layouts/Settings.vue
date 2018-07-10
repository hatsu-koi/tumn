<template>
	<settings-pane class="Settings">
		<h1>{{$t('settings.settings')}}</h1>

		<section-filters></section-filters>
		<section-hooks></section-hooks>
		<section-cover></section-cover>
		<section-customization></section-customization>
		<section-troubleshooting></section-troubleshooting>
	</settings-pane>
</template>

<script>
	import SectionCover from "./SectionCover.vue";
	import SectionCustomization from "./SectionCustomization.vue";
	import SectionFilters from "./SectionFilters.vue";
	import SectionHooks from "./SectionHooks.vue";
	import SectionTroubleshooting from "./SectionTroubleshooting.vue";
	import SettingsPane from "../components/SettingsPane.vue";

	export default {
		components: {
			SectionCover,
			SectionCustomization,
			SectionFilters,
			SectionHooks,
			SectionTroubleshooting,
			SettingsPane
		},

		async mounted() {
			try {
				const filters = await fetch(`http://localhost:5000/filterset`).then(v => v.json());

				this.$store.commit('filters/updateSetFromResponse', filters);
				this.$store.commit('status/processorOnline', true);
			} catch(e) {
				this.$store.commit('status/processorOnline', false);
			}

			const hash = this.$router.history.current.hash;
			if(!hash) return;

			const elem = this.$el.querySelector(hash);
			if(!elem) return;

			const scrollPane = this.$el;
			scrollPane.scroll({
				top: elem.offsetTop,
				behavior: 'smooth'
			});
		}
	};
</script>
