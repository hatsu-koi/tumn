<template>
	<div id="app">
		<slot></slot>
	</div>
</template>

<script>
	import Color from "color";

	export default {
		mounted() {
			this.$store.watch((state) => state.config.customization.color, (color) => {
				document.querySelector('html').style.setProperty('--theme-color', color);
				document.querySelector('html').style.setProperty('--theme-grad-1', color);
				document.querySelector('html').style.setProperty(
					'--theme-grad-2', Color(color).lighten(0.1).rgbString()
				);
			}, {immediate: true});

			this.$store.watch((state) => state.config.customization.title, (title) => {
				document.querySelector('html').style.setProperty('--theme-font-title', title);
			}, {immediate: true});

			this.$store.watch((state) => state.config.customization.font, (font) => {
				document.querySelector('html').style.setProperty('--theme-font', font);
			}, {immediate: true});
		}
	};
</script>
