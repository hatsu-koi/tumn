<template>
	<tile class="TileOptions"
		:class="{
			'TileOptions--foldable': flatten,
			'TileOptions--closed': folded,
			'TileOptions--editable': editable
		}"
		:flatten="flatten">

		<header class="TileOptions__header" slot="title" @click="toggle">
			<h1 class="TileOptions__title">
				<i class="mdi mdi-filter"></i>
				{{title}}
			</h1>

			<i class="TileOptions__fold mdi mdi-chevron-up" v-ripple-small></i>
		</header>

		<div class="TileOptions__options" ref="options">
			<checkbox class="ListSelector" v-for="option in options" :key="option.name" v-model="option.active">
				{{option.name}}

				<span slot="description" v-if="description">
					{{option.description}}
				</span>
			</checkbox>

			<div class="TileOptions__footer" v-if="editable">
				<span class="TileOptions__version">
					v1.0
				</span>

				<button class="Button Button--flat" v-ripple="'rgba(0, 0, 0, .1)'">
					<i class="mdi mdi-alert"></i> {{$t('settings.issue')}}
				</button>

				<button class="Button Button--flat" v-ripple="'rgba(0, 0, 0, .1)'">
					<i class="mdi mdi-web"></i> {{$t('settings.web')}}
				</button>

				<button class="Button Button--alert" v-ripple="'rgba(255, 255, 255, .1)'">
					<i class="mdi mdi-delete"></i> {{$t('settings.delete')}}
				</button>
			</div>
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
			transition: all .3s ease;

			&:hover {
				background: var(--theme-grey-8);
			}

			.TileOptions__header {
				cursor: pointer;
				padding: 0 50px;

				& > * {
					padding: 20px;
				}
			}

			.TileOptions__fold {
				display: block;
				color: var(--theme-grey-1);
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
			}

			.TileOptions__options {
				transition: all .3s ease;
				overflow: hidden;
				padding-left: 50px;
			}
		}

		&--foldable&--closed {
			.TileOptions__options {
				max-height: 0 !important;
			}

			.TileOptions__fold {
				transform: rotate(180deg);
			}
		}

		&--foldable:not(&--closed) {
			background: var(--theme-grey-9);
		}

		&__fold {
			display: none;
		}

		&__footer {
			display: flex;
			justify-content: flex-end;
			padding: 10px 80px 10px 0;
		}

		&__version {
			font-family: var(--theme-font);
			color: var(--theme-grey-4);
			font-size: .85rem;
			padding: 10px 15px;
			margin-right: 10px;
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
			flatten: Boolean,
			editable: Boolean
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
