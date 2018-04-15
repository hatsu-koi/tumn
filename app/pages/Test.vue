<template>
	<div id="app">
		<main-button v-model="active">
			Filtering
			<span slot="identifier">
				100%
			</span>
		</main-button>

		<br>

		<checkbox v-model="check">Fancy Checkbox!</checkbox>
		<br>
		<span>Value: {{check}}</span>

		<br><br>

		<list-menu icon="hook" desc="1 Active">
			Hooks
		</list-menu>
	</div>
</template>

<script>
	import Checkbox from "../components/Checkbox.vue";
	import ListMenu from "../components/ListMenu.vue";
	import MainButton from "../components/MainButton.vue";

	export default {
		data() {
			return {
				active: true,
				check: false
			};
		},

		components: {
			Checkbox,
			ListMenu,
			MainButton
		}
	};
</script>
