<template>
	<settings-pane class="Sites">
		<settings-header>
			<router-link to="/settings" tag="li">{{$t('settings.settings')}}</router-link>
		</settings-header>

		<div class="Sites__wrapper">
			<aside class="SiteList">
			</aside>

			<div class="Options">
			</div>
		</div>
	</settings-pane>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	};
</script>
