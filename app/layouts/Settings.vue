<template>
	<settings-pane class="Settings">
		<settings-header>
			<router-link to="/settings" tag="li">{{$t('settings.settings')}}</router-link>
		</settings-header>

		<h1>{{$t('settings.settings')}}</h1>

		<section-filters></section-filters>
		<section-hooks></section-hooks>
		<section-cover></section-cover>
		<section-customization></section-customization>
		<section-troubleshooting></section-troubleshooting>
	</settings-pane>
</template>

<script>
	import Breadcrumb from "../components/Breadcrumb.vue";
	import SectionCover from "./SectionCover.vue";
	import SectionCustomization from "./SectionCustomization.vue";
	import SectionFilters from "./SectionFilters.vue";
	import SectionHooks from "./SectionHooks.vue";
	import SectionTroubleshooting from "./SectionTroubleshooting.vue";
	import SettingsHeader from "../components/SettingsHeader.vue";
	import SettingsPane from "../components/SettingsPane.vue";

	export default {
		components: {
			Breadcrumb,
			SectionCover,
			SectionCustomization,
			SectionFilters,
			SectionHooks,
			SectionTroubleshooting,
			SettingsHeader,
			SettingsPane
		},

		mounted() {
			const hash = this.$router.history.current.hash;
			if(!hash) return;

			const elem = this.$el.querySelector(hash);
			if(!elem) return;

			console.log(elem.scrollTop);
			
			const scrollPane = this.$el;
			scrollPane.scroll({
				top: elem.offsetTop,
				behavior: 'smooth'
			});
		}
	};
</script>
