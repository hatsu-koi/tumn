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
		background: var(--theme-light-3);
		padding: 20px;
		box-sizing: content-box;
		box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .3);

		&__title {
			color: var(--theme-dark-1);
			font-family: var(--theme-font);
			font-weight: 300;

			&::before {
				content: '#';
				color: var(--theme-dark-5);
				margin-right: 10px;
			}
		}
	}

</style>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			}
		},

		computed: {
			hash() {
				return this.name
					.replace(/(^[A-Z]|[A-Z]$)/, match => match.toLowerCase())
					.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
			}
		}
	};
</script>
