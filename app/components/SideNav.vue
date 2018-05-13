<template>
	<aside class="SideNav">
		<nav class="SideNav__list">
			<router-link to="/" class="SideNav__item SideNav__item--accent">
				<div class="SideNav__item__block">
					<img src="../images/logo-inverse.svg">
				</div>
				<h1 class="SideNav__title">{{$t('settings.overview')}}</h1>
			</router-link>

			<router-link to="/settings" class="SideNav__item">
				<div class="SideNav__item__block">
					<i class="mdi mdi-settings"></i>
				</div>
				<h1 class="SideNav__title">{{$t('settings.settings')}}</h1>
			</router-link>

			<router-link to="/sites" class="SideNav__item">
				<div class="SideNav__item__block">
					<i class="mdi mdi-format-list-checks"></i>
				</div>
				<h1 class="SideNav__title">{{$t('settings.sites')}}</h1>
			</router-link>
		</nav>

		<div class="SideNav__scroller"></div>
	</aside>
</template>

<style lang="less" scoped>
	.SideNav {
		background: var(--theme-grey-1);

		&__list {
			display: flex;
			flex-direction: column;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			transition: all .4s ease;
			text-decoration: none;

			width: 80px;
			height: 80px;

			&__block {
				width: 80px;
				height: 80px;

				display: flex;
				flex: 0 0 auto;
				align-items: center;
				justify-content: center;

				img {
					width: 60px;
					height: 60px;
				}

				i {
					color: var(--theme-grey-9);
					font-size: 40px;
				}
			}

			&.router-link-active {
				background: var(--theme-grey-3);
			}

			&:hover {
				background: var(--theme-grey-2);
			}

			&--accent {
				background: var(--theme-color) !important;
			}
		}

		&__title {
			margin: 0;
			margin-right: 30px;
			padding: 0;
			color: var(--theme-grey-9);
			font-family: var(--theme-font-title);
			font-weight: 300;

			visibility: hidden;
			opacity: 0;
			transition: visibility 0.4s, opacity 0.4s linear;
			flex: 1 0;
			white-space: nowrap;
		}

		&:hover {
			.SideNav__item {
				width: 200px;
			}

			.SideNav__title {
				transition: visibility 0s .2s, opacity 0.5s linear .2s;
				visibility: visible;
				opacity: 1;
			}
		}
	}
</style>
