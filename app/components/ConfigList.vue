<template>
	<section class="ConfigList">
		<h2 class="ConfigList__title">{{name}}</h2>
		<ul class="ConfigList__list">
			<slot></slot>
		</ul>
		<!-- <hr class="ConfigList__divider"> -->
	</section>
</template>

<style lang="less" scoped>
	.ConfigList {
		width: 60vw;
		margin: 30px auto;
		background: var(--theme-grey-10);
		box-sizing: content-box;
		box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .3);
		padding: 40px 0 20px;

		&__title {
			color: var(--theme-grey-1);
			font-family: var(--theme-font);
			font-size: 1.6rem;
			font-weight: 300;
			margin: 0;
			padding: 0;
			padding-left: 60px;

			&::before {
				content: '#';
				color: var(--theme-grey-5);
				margin-right: 10px;
			}
		}

		&__list {
			padding: 0;
		}
	}

</style>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},

			slug: {
				type: String,
				default: ""
			}
		},

		computed: {
			hash() {
				return this.slug ? this.slug : this.name
					.replace(/(^[A-Z]|[A-Z]$)/, match => match.toLowerCase())
					.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
			}
		}
	};
</script>
