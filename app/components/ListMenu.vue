<template>
	<button class="ListMenu" :class="{'ListMenu--large': large}" @click="click">
		<div class="ListMenu__segment">
			<i class="ListMenu__icon mdi" :class="`mdi-${icon}`" v-if="icon"></i>
			<h2 class="ListMenu__text">
				<slot></slot>
			</h2>
		</div>

		<div class="ListMenu__segment">
			<span class="ListMenu__desc" v-if="desc">
				{{desc}}
			</span>
			<i class="ListMenu__chevron mdi mdi-chevron-right"></i>
		</div>
	</button>
</template>

<style lang="less" scoped>
	.ListMenu {
		display: flex;
		width: 250px;
		height: 36px;
		padding: 0 15px;
		align-items: center;
		justify-content: space-between;

		background: var(--theme-light-1);
		border: none;
		cursor: pointer;
		outline: none;

		transition: all .4s ease;

		* {
			height: 36px;
			line-height: 36px;
			color: var(--theme-dark-3);
			font-family: var(--theme-font);
			font-size: 18px;
		}

		h2 {
			padding: 0;
			margin: 0;
			margin-left: 5px;
			font-weight: 400;
		}

		&__segment {
			display: flex;
			justify-content: space-around;
		}

		&__desc {
			color: var(--theme-color);
			margin-right: 5px;
			transition: all .4s ease;
		}

		&:hover {
			padding-right: 10px;

			.ListMenu__desc {
				margin-right: 10px;
			}
		}

		&--large {
			width: 400px;
			height: 65px;

			* {
				font-size: 30px;
				line-height: 65px;
				height: 65px;
			}
		}
	}
</style>

<script>
	export default {
		props: {
			icon: String,
			desc: String,
			large: Boolean
		},

		methods: {
			click() {
				this.$emit('click');
			}
		}
	};
</script>
