<template>
	<tile class="TileOptions">
		<h1 slot="title">
			<i class="mdi mdi-filter"></i>
			{{title}}
		</h1>

		<checkbox class="ListSelector" v-for="option in options" :key="option.name" v-model="option.active">
			{{option.name}}

			<span slot="description" v-if="description">
				{{option.description}}
			</span>
		</checkbox>
	</tile>
</template>

<script>
	import Tile from "./Tile.vue";
	import Checkbox from "./Checkbox.vue";

	export default {
		props: {
			title: {
				type: String,
				required: true
			},

			options: {
				type: Array,
				required: true
			},

			description: Boolean
		},

		components: {
			Tile,
			Checkbox
		}
	}
</script>
