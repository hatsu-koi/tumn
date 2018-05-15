<template>
	<config-list :name="$t('settings.filters')" slug="filters" ref="filters">
		<template v-if="mockProcessor">
			<tile-options v-for="(filter, index) in filters"
				type="filters"
				:key="filter.id"
				:title="filter.title"
				:options="filter.options"
				flatten description editable
				@open="closeExcept('hooks', index)">
			</tile-options>
		</template>

		<template v-else>
			<div class="WarningPane">
				<i class="WarningPane__icon mdi mdi-alert"></i>
				<h2 class="WarningPane__title">{{$t('settings.need_processor')}}</h2>
				<span class="WarningPane__text">{{$t('settings.need_processor_cover')}}</span>
			</div>
		</template>
	</config-list>
</template>

<style lang="less" scoped>
	.WarningPane {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--theme-grey-8);
		margin: 40px 50px;
		padding: 50px 0;

		&__icon {
			// color: var(--theme-color);
			color: var(--theme-alert);
			font-size: 4rem;
		}

		&__title {
			font-family: var(--theme-font-title);
			// font-weight: 300;
			color: var(--theme-grey-1);
			margin-bottom: 5px;
		}

		&__text {
			font-family: var(--theme-font);
			color: var(--theme-grey-2);
		}
	}
</style>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import TileOptions from "../components/TileOptions.vue";

	import {mapState} from "vuex";

	export default {
		data() {
			return {
				mockProcessor: false
			};
		},

		methods: {
			closeExcept(name, target) {
				this.$refs[name].$children
					.filter((_, i) => i !== target)
					.forEach(elem => elem.folded = true);
			}
		},

		computed: mapState({
			filters: state => state.filters.filters
		}),

		components: {
			ConfigList,
			TileOptions
		}
	};
</script>
