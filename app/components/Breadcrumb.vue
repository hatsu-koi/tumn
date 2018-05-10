<template>
	<ul class="Breadcrumb">
		<slot></slot>
	</ul>
</template>

<style lang="less" scoped>
	.Breadcrumb {
		background: var(--theme-grey-3);
		display: flex;
		height: 50px;
		margin: 0;
		padding: 0;
		padding-left: 20px;
		margin-left: 50px;
		border-radius: 2px;
		box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .4);

		li {
			list-style: none;
			line-height: 50px;
			font-family: var(--theme-font);
			color: var(--theme-grey-7);

			cursor: pointer;
			transition: all .4s ease;

			&:hover {
				padding-left: 30px;
				padding-right: 30px;

				&:last-child {
					padding-left: 30px !important;
					padding-right: 50px;
				}
			}

			&:not(:last-child):not(:first-child)::before {
				content: '\f13e';
				font-family: 'Material Design Icons';
				line-height: 0;
				margin-left: 10px;
				margin-right: 10px;
			}

			&:last-child {
				padding-right: 20px;
			}

			&:last-child:not(:first-child) {
				border-radius: 0 2px 2px 0;
				background: var(--theme-color);
				margin-left: 30px;
				padding-left: 10px;
				position: relative;
				color: var(--theme-grey-7);

				&::before, &::after {
					content: '';
					display: block;
					position: absolute;
					width: 0;
					height: 0;
					left: -20px;
				}

				&::before {
					top: 0;
					border-top: 20px solid var(--theme-color);
					border-left: 10px solid transparent;
					border-right: 10px solid var(--theme-color);
					border-bottom: 20px solid transparent;
				}

				&::after {
					bottom: 0;
					border-top: 20px solid transparent;
					border-left: 10px solid transparent;
					border-right: 10px solid var(--theme-color);
					border-bottom: 20px solid var(--theme-color);
				}
			}
		}
	}
</style>
