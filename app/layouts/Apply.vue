<template>
	<app class="App">
		<header class="Header">
			<img class="Header__logo" src="../assets/images/logo.svg" alt="Tumn Logo">
			<span class="Header__title">
				<span class="Header__branding">Tumn</span>
				<i class="Header__divider mdi mdi-chevron-right"></i>
				<span class="Header__current">{{$t('apply.install')}}</span>
			</span>
		</header>

		<section class="Plugin">
			<h2 class="Plugin__title">
				{{plugin.title}} <span class="Plugin__version">{{plugin.version}}</span>
			</h2>

			<div class="Plugin__information">
				<div class="Plugin__column">
					<div class="Plugin__row" v-for="(value, key) in plugin.information">
						<span class="Plugin__row__key">{{$t(`apply.${key}`)}}</span>
					</div>
				</div>

				<div class="Plugin__column">
					<div class="Plugin__row" v-for="value in plugin.information">
						<span class="Plugin__row__value">
							<template v-if="value.href">
								<a :href="value.href">{{value.text}}</a>
							</template>
							<template v-else>
								{{value}}
							</template>
						</span>
					</div>
				</div>
			</div>

			<div class="Plugin__contains">
				<tile-options class="OptionSectionItem"
					:elem="plugin"
					:update="update"
					:enabled-options="installCheck"
					flatten description>

				</tile-options>
			</div>

			<div class="Plugin__actions">
				<button class="Button" v-ripple="'rgba(255, 255, 255, .2)'" @click="install">
					{{$t('apply.apply')}}
				</button>

				<button class="Button Button--flat" v-ripple="'rgba(0, 0, 0, .2)'" @click="close">
					{{$t('apply.cancel')}}
				</button>
			</div>
		</section>

		<warning-pane class="Warning" :title="$t('apply.warning')" :desc="$t('apply.warning_desc')" info>
		</warning-pane>

		<div class="Backdrop"></div>
	</app>
</template>

<style lang="less" scoped>
	.App {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.Header {
		display: flex;
		background: var(--theme-grey-8);
		align-items: center;

		&__logo {
			width: 80px;
			height: 80px;

			background: var(--theme-color);
		}

		&__title {
			color: var(--theme-grey-1);
			font-family: var(--theme-font-title);
			font-size: 2rem;
			margin-left: 30px;
			display: flex;
			align-items: center;
		}

		&__divider {
			color: var(--theme-grey-5);
			font-size: 1.5rem;
			margin-top: 5px;
		}

		&__current {
			font-weight: 100;
		}
	}

	.Plugin {
		background: var(--theme-grey-9);
		flex: 1;

		&__title {
			margin: 0;
			font-family: var(--theme-font-title);
			font-size: 3rem;
			font-weight: 600;
			padding: 50px;
			padding-bottom: 0;
		}

		&__version {
			font-weight: 100;
		}

		&__information {
			display: flex;
			font-family: var(--theme-font);
			padding: 20px 50px;
		}

		&__column {
			padding: 0 10px;
		}

		&__contains {
			margin-left: 40px;
		}

		&__actions {
			// background: var(--theme-grey-8);
			display: flex;
			justify-content: flex-start;
			padding: 50px;
		}

		&__row {
			height: 30px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
		}
	}

	.Warning {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 100vw;
		padding: 40px 0 !important;
		margin: 0 !important;
		transform: translate(-50%, -50%);
		z-index: 2;
	}

	.Backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
	}

	.Warning, .Backdrop {
		animation: hide 1s 2s linear forwards;
	}
</style>

<script>
	import App from "../components/App.vue";
	import TileOptions, {closeExcept} from "../components/TileOptions.vue";
	import WarningPane from "../components/WarningPane.vue";

	export default {
		data() {
			return {
				plugin: {},
				installCheck: []
			};
		},

		methods: {
			update() {

			},

			install() {

			},

			close() {

			},

			closeExcept
		},

		async mounted() {
			let href = location.href.match(/\#.*$/);
			if(!href) return;

			href = decodeURIComponent(href[0].slice(1));

			try {
				this.plugin = await fetch(href).then(v => {
					v.json();
				});

				this.installCheck = this.plugin.options.map(v => v.id);
			} catch(e) {
				close();
			}
		},

		components: {
			App,
			TileOptions,
			WarningPane
		}
	};
</script>
