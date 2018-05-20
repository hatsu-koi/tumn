<template>
	<header class="Header">
		<img class="Header__logo" src="../images/logo.svg" alt="Tumn Logo">
		<span class="Header__text">Tumn</span>
	</header>

	<section class="Plugin">
		<h2 class="Plugin__title">
			{{plugin.name}} <span class="Plugin__version">{{plugin.version}}</span>
		</h2>
		<div class="Plugin__information">
			<div class="Plugin__row" v-for="(key, value) in plugin.information">
				<span class="Plugin__row__key">{{$t(`apply.${key}`)}}</span>
				<span class="Plugin__row__value">{{value}}</span>
			</div>
		</div>
		<div class="Plugin__actions">
			<button class="Button">
				{{$t('apply.apply')}}
			</button>

			<button class="Button">
				{{$t('apply.cancel')}}
			</button>
		</div>
	</section>

	<section class="Source">
		{{source}}
	</section>
</template>

<script>
	export default {

	};
</script>
