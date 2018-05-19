<template>
	<div class="Selector" :class="{'Selector--open': dropdown}" v-click-outside="hideDropdown">
		<button type="button" class="Selector__button" @click="toggleDropdown()" v-ripple="'rgba(0, 0, 0, .05)'">
			<span class="Selector__value">{{valueText}}</span>
			<i class="Selector__icon mdi mdi-chevron-down"></i>
		</button>

		<transition name="FadeExpand">
			<div class="Selector__dropdown" v-if="dropdown">
				<button class="Selector__item"
					:class="{'Selector__item--active': item.value === value}"
					v-for="item in items"
					v-ripple="'rgba(0, 0, 0, .05)'"
					@click="setItem(item)">

					{{item.text}}
				</button>
			</div>
		</transition>
	</div>
</template>

<style lang="less" scoped>
	.Selector {
		max-width: 300px;
		width: 100%;
		background: var(--theme-grey-7);
		position: relative;
		margin: 0 30px;

		&--open &__icon {
			transform: rotate(180deg);
		}

		&__icon {
			transition: all .4s ease;
		}

		&__button {
			background: transparent;
			border: none;
			display: flex;
			cursor: pointer;
			width: 100%;
			height: 100%;
			color: var(--theme-grey-1);
			font-family: var(--theme-font);
			font-size: 1.1rem;
			outline: none;
			align-items: center;
			justify-content: space-between;
			padding: 10px 30px;
		}

		&__value {
			margin-right: 30px;
		}

		&__dropdown {
			position: absolute;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .3);
			margin: 0;
			z-index: 2;
		}

		&__item {
			background: var(--theme-grey-9);
			color: var(--theme-grey-1);
			font-family: var(--theme-font);
			font-size: 1.1rem;
			padding: 15px 0;
			border: none;
			cursor: pointer;
			outline: none;

			&:hover {
				background: var(--theme-grey-8);
			}

			&--active {
				background: var(--theme-grey-7);
				//color: var(--theme-color);
				//font-weight: 600;

				&:hover {
					background: var(--theme-grey-7);
				}
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				dropdown: false
			};
		},

		model: {
			prop: 'value',
			event: 'change'
		},

		props: {
			value: String,
			items: {
				type: Array,
				required: true
			}
		},

		methods: {
			setItem({value}) {
				this.$emit('change', value);
				this.dropdown = false;
			},

			toggleDropdown() {
				this.dropdown = !this.dropdown;
			},

			hideDropdown() {
				this.dropdown = false;
			}
		},

		computed: {
			valueItem() {
				return this.items.find(v => v.value === this.value);
			},

			valueText() {
				return this.valueItem ? this.valueItem.text : '';
			}
		}
	};
</script>
