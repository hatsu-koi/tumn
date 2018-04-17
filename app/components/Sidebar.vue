<template>
	<aside class="Sidebar" :class="{'Sidebar--active': active}">
		<header class="Sidebar__header">
			<a href="#" @click="close">
				<i class="mdi mdi-chevron-left"></i>{{title}}
			</a>
		</header>

		<section>
			<slot></slot>
		</section>
	</aside>
</template>

<style lang="less" scoped>
	.Sidebar {
		position: absolute;
		top: 0;
		right: -100%;
		bottom: 0;
		width: 90%;
		height: 100%;
		padding-right: 10%;
		background: var(--theme-dark-1);
		transition: right .4s cubic-bezier(0.63,-0.25, 0.34, 1.49), box-shadow .4s ease;

		&--active {
			box-shadow: -2px 0 8px 1px rgba(0, 0, 0, 0.35);
			right: -10%;
		}

		&__header {
			background: var(--theme-dark-2);

			padding-top: 10px;
			padding-left: 5px;
			padding-bottom: 10px;

			a {
				color: var(--theme-light-2);
				font-family: var(--theme-font);
				font-weight: 200;
				font-size: 50px;
				text-decoration: none;
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				active: false
			};
		},

		props: {
			title: {
				type: String,
				required: true
			}
		},

		methods: {
			toggle() {
				this.active = !this.active;
			},

			open() {
				this.active = true;
			},

			close() {
				this.active = false;
			}
		}
	};
</script>
