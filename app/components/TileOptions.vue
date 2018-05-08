<template>
	<tile class="TileOptions" :class="{'TileOptions--foldable': flatten}" :flatten="flatten">
		<header class="TileOptions__header" slot="title" @click="toggle">
			<h1 class="TileOptions__title">
				<i class="mdi mdi-filter"></i>
				{{title}}
			</h1>

			<i class="TileOptions__fold Rippler mdi mdi-chevron-up"
				:class="{'TileOptions__fold--fold': folded}"
				v-ripple-small>
			</i>
		</header>

		<div class="TileOptions__options" :class="{'TileOptions__options--closed': folded}" ref="options">
			<checkbox class="ListSelector" v-for="option in options" :key="option.name" v-model="option.active">
				{{option.name}}

				<span slot="description" v-if="description">
					{{option.description}}
				</span>
			</checkbox>
		</div>
	</tile>
</template>

<style lang="less" scoped>
	.TileOptions {
		&__header {
			display: flex;
			justify-content: space-between;
		}

		&--foldable {
			.TileOptions__header {
				cursor: pointer;

				& > * {
					padding: 20px;
				}
			}

			.TileOptions__fold {
				display: block;
				color: var(--theme-dark-1);
				font-size: 1.3rem;
				transition: all .4s ease;
				transform: rotate(360deg);
				user-select: none;

				&::before {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}

				&--fold {
					transform: rotate(180deg);
				}
			}

			.TileOptions__options {
				transition: all .3s ease;
				overflow: hidden;

				&--closed {
					max-height: 0 !important;
				}
			}
		}

		&__fold {
			display: none;
		}
	}
</style>

<script>
	import Tile from "./Tile.vue";
	import Checkbox from "./Checkbox.vue";

	export default {
		data() {
			return {
				folded: true
			};
		},

		props: {
			title: {
				type: String,
				required: true
			},

			options: {
				type: Array,
				required: true
			},

			description: Boolean,

			flatten: Boolean
		},

		methods: {
			toggle() {
				this.folded = !this.folded;
				if(!this.folded) this.$emit('open');
			}
		},

		mounted() {
			if(this.flatten) {
				const foldContent = this.$refs.options;
				foldContent.style.maxHeight = foldContent.scrollHeight + 'px';
			}
		},

		components: {
			Tile,
			Checkbox
		}
	}
</script>
