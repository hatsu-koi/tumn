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
				console.log("update!")
				document.querySelector('html').style.setProperty('--theme-color', color);
				document.querySelector('html').style.setProperty('--theme-chart-1', color);
				document.querySelector('html').style.setProperty(
					'--theme-chart-2', Color(color).lighten(0.3).rgbString()
				);
			}, {immediate: true});
		}
	};
</script>
