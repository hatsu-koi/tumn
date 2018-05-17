<template>
	<label class="TextInput" :class="{'TextInput--fill': fill}">
		<input ref="input"
			class="TextInput__input"
			v-model="_content"
			:type="type"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:novalidate="novalidate"
			:spellcheck="spellcheck"
			:required="required">

		<div class="TextInput__indicator"></div>
	</label>
</template>

<style lang="less" scoped>
	.TextInput {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 0 30px;
		max-width: 400px;

		*::selection {
			background: rgba(0, 0, 0, .2);
		}

		&--fill {
			max-width: none;
			flex: 1;
		}

		&__input {
			border: none;
			background: transparent;
			color: var(--theme-grey-3);
			flex: 1;
			outline: none;
			padding: 14px;
			font-size: 1.1rem;
			font-family: var(--theme-font);
			font-weight: 400;
			position: relative;
			border-bottom: 2px solid var(--theme-grey-6);

			& + .TextInput__indicator {
				position: relative;
				&::after {
					content: '';
					display: block;
					position: absolute;
					background: var(--theme-color);
					width: 100%;
					height: 2px;
					bottom: 0;
					left: 0;
					transition: transform .5s ease;
					transform: scaleX(0);
				}
			}

			&:focus + .TextInput__indicator {
				&::after {
					transform: scaleX(1);
				}
			}
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'content',
			event: 'change'
		},
		props: {
			spellcheck: Boolean,
			autocomplete: Boolean,
			required: Boolean,
			novalidate: Boolean,
			fill: Boolean,
			content: String,

			type: {
				type: String,
				default: "text"
			},

			placeholder: {
				type: String,
				default: "Type here..."
			}
		},
		computed: {
			_content: {
				get() {
					return this.content;
				},
				set(v) {
					this.$emit('change', v);
				}
			}
		}
	};
</script>
