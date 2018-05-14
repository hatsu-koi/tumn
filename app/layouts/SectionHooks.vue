<template>
	<config-list :name="$t('settings.hooks')" slug="hooks" ref="hooks">
		<template v-for="i in 3">
			<tile-options
				class="HookOptions"
				:key="i"
				:title="mock.title"
				:options="mock.options"
				flatten description editable
				@open="closeExcept('hooks', i - 1)">
			</tile-options>
		</template>
	</config-list>
</template>

<style lang="less" scoped>
	.HookOptions {
		&:first-child {
			margin-top: 40px;
		}

		&:last-child {
			margin-bottom: 40px;
		}
	}
</style>

<script>
	import ConfigList from "../components/ConfigList.vue";
	import TileOptions from "../components/TileOptions.vue";

	import getMock from "../src/mock";

	export default {
		data() {
			return {
				mock: getMock()
			};
		},

		methods: {
			closeExcept(name, target) {
				this.$refs[name].$children
					.filter((_, i) => i !== target)
					.forEach(elem => elem.folded = true);
			}
		},

		components: {
			ConfigList,
			TileOptions
		}
	};
</script>
