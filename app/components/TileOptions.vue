<template>
	<tile class="TileOptions">
		<h1 slot="title">
			<i class="mdi mdi-filter"></i>
			{{title}}
		</h1>

		<checkbox class="ListSelector" v-for="option in options" :key="option.name" v-model="option.active">
			{{option.name}}

			<span slot="description">
				{{option.description}}
			</span>
		</checkbox>
	</tile>
</template>

<script>
	import Tile from "./Tile.vue";
	import Checkbox from "./Checkbox.vue";

	export default {
		data() {
			return {
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
			};
		},

		components: {
			Tile,
			Checkbox
		}
	}
</script>
