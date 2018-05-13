<template>
	<nav class="Navigation">
		<button class="Navigation__button">
			<span>
				<i class="mdi mdi-settings"></i>
				{{$t('extension.settings')}}
			</span>
		</button>

		<button class="Navigation__button Navigation__button--active">
			<span>
				<i class="mdi mdi-format-list-checks"></i>
				{{$t('extension.sites')}}
			</span>
		</button>
	</nav>
</template>

<style lang="less" scoped>
	.Navigation {
		display: flex;
		justify-content: flex-end;
		height: 50px;
		overflow: hidden;

		background: var(--theme-grey-3);

		* {
			font-family: var(--theme-font);
			font-size: 16px;
		}

		i.mdi {
			margin-right: 5px;
		}

		&__button {
			background: transparent;
			display: flex;
			color: var(--theme-grey-10);

			border: none;
			outline: none;
			padding: 0;
			padding-left: 4px;
			margin-right: -16px;
			padding-right: 16px;

			cursor: pointer;

			span {
				background: var(--theme-grey-3);
				display: flex;
				flex: 1;
				width: 80px;
				height: 50px;
				padding-right: 8px;
				line-height: 50px;
				justify-content: center;
				transition: all .4s ease;
			}

			&:hover {
				span {
					width: 100px;
				}
			}

			&::before {
				content: '';
				width: 0;
				height: 0;
				border-top: 25px solid transparent;
				border-left: 8px solid transparent;
				border-right: 8px solid var(--theme-grey-3);
				border-bottom: 25px solid var(--theme-grey-3);
			}

			&--active {
				span {
					background: var(--theme-color);
				}

				&::before {
					content: '';
					width: 0;
					height: 0;
					border-top: 25px solid transparent;
					border-left: 8px solid transparent;
					border-right: 8px solid var(--theme-color);
					border-bottom: 25px solid var(--theme-color);
				}
			}
		}
	}
</style>
