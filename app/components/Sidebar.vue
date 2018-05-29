<template>
	<aside class="Sidebar" :class="{'Sidebar--active': active}">
		<header class="Sidebar__header">
			<a href="#" @click="close">
				<i class="mdi mdi-chevron-left"></i>{{title}}
			</a>
		</header>

		<section class="Sidebar__content Scroller">
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
		display: flex;
		flex-direction: column;
		padding-right: 10%;
		background: var(--theme-grey-9);
		transition: right .4s cubic-bezier(0.63,-0.25, 0.34, 1.49), box-shadow .4s ease;

		&--active {
			box-shadow: -2px 0 8px 1px rgba(0, 0, 0, 0.35);
			right: -10%;
		}

		&__header {
			background: var(--theme-grey-7);

			padding-top: 10px;
			padding-left: 5px;
			padding-bottom: 10px;

			a {
				color: var(--theme-grey-2);
				font-family: var(--theme-font-title);
				font-weight: 200;
				font-size: 50px;
				text-decoration: none;
			}
		}

		&__content {
			overflow-y: auto;
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'active',
			event: 'sidebar'
		},

		props: {
			active: Boolean,

			title: {
				type: String,
				required: true
			}
		},

		methods: {
			toggle() {
				this.$emit('sidebar', !this.active);
			},

			open() {
				this.$emit('sidebar', true);
			},

			close() {
				this.$emit('sidebar', false);
			}
		}
	};
</script>
