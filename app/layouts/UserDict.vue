<template>
	<div class="UserDict">
		<div class="Backdrop" @click="close"></div>

		<div class="Dialog">
			<i class="Dialog__close mdi mdi-close" @click="close"></i>
			<h1 class="Dialog__title">{{$t('settings.user_dict')}}</h1>
			<div class="Dialog__list">
				<form class="Dialog__item Dialog__item--add" @submit="addSeq($event)">
					<text-input v-model="sequenceValue" :placeholder="$t('settings.user_dict_new')" required fill>
					</text-input>

					<button class="Button" v-ripple="'rgba(255, 255, 255, .1)'" @click="addSeq">
						{{$t('settings.user_dict_add')}}
					</button>
				</form>

				<transition-group name="FadeSlide-group" class="Dialog__content Scroller">
					<div class="Dialog__item Dialog__item--value" v-for="seq in dict" :key="idfy(seq)">
						<span>{{seq}}</span>
						<i class="Dialog__icon mdi mdi-delete" v-ripple-small @click="remove(seq)"></i>
					</div>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	.UserDict {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;
	}

	.FadeSlide-move {
		background: var(--theme-alert) !important;
	}

	.Dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 60vw;
		height: 60vh;
		padding: 30px 0;
		display: flex;
		flex-direction: column;
		background: var(--theme-grey-9);
		transform: translate(-50%, -50%);

		&__close {
			position: absolute;
			color: var(--theme-grey-1);
			top: 50px;
			right: 50px;
			cursor: pointer;
		}

		&__title {
			font-family: var(--theme-font-title);
			font-weight: 100;
			font-size: 2rem;
			color: var(--theme-grey-1);
			padding: 0 50px;
			margin-top: 10px;
		}

		&__content {
			overflow-x: hidden;
			overflow-y: auto;
			position: relative;
		    flex: 1;

			/*
			overflow: hidden;

			&:not(:hover) {
				margin-right: 17px;
			}

			&:hover {
				overflow: auto;
			}
			*/
		}

		&__list {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			&--add {
				padding: 0 50px;
				margin-bottom: 30px;
				flex: 0 0 50px;

				.Button {
					margin-right: 30px;
				}
			}

			&--value {
				padding: 15px 100px;

				&:hover {
					background: var(--theme-grey-8);
				}
			}

			span {
				font-family: var(--theme-font);
				font-size: 1.4rem;
				color: var(--theme-grey-2);
			}
		}

		&__icon {
			width: 30px;
			height: 30px;
			font-size: 1.2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--theme-grey-5);
			cursor: pointer;
		}
	}

	.Backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: var(--theme-grey-1);
		opacity: .4;
	}
</style>

<script>
	import TextInput from "../components/TextInput.vue";
	export default {
		data() {
			return {
				sequenceValue: ''
			};
		},

		methods: {
			close() {
				this.$emit('close');
			},

			addSeq(event) {
				this.$store.commit('filters/dict/addSequence', {
					sequence: this.sequenceValue
				});

				this.sequenceValue = '';
				if(event) event.preventDefault();
			},

			remove(sequence) {
				this.$store.commit('filters/dict/removeSequence', {
					sequence
				});
			},

			idfy(seq) {
				return seq.split('').reduce((a, b) => {
					a = ((a << 5) - a) + b.charCodeAt(0);
					return a & a;
				}, 0);
			}
		},

		computed: {
			dict() {
				return this.$store.state.filters.dict.dict;
			}
		},

		components: {
			TextInput
		}
	};
</script>
