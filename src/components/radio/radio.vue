<template>
	<div class="k-radio">
		<label class="k-radio-label">
			<span :class="['k-radio-control', align === 'right' ? 'is-right': '']">
				<input class="k-radio-input" type="radio" :value="option.value" v-model="currentValue" :disabled="option.disabled">
				<span class="k-radio-core"></span>
			</span>
			<span class="k-radio-title" v-text="option.label" v-if="option.label"></span>
			<slot></slot>
		</label>
	</div>
</template>
<script>
	export default {
		name: 'k-radio',
		computed: {
			currentValue: {
				get () {
					return this.value;
				},
				set (val) {
					this.$emit('input', val);
					this.$emit('on-change', val);
				}
			}
		},
		props: {
			align: String,
			option: {
				type: Object,
				required: true
			},
			value: {
				default: null
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.k-radio{
		.k-radio-label{
			display: block;
		}
		.k-radio-title{
			vertical-align: middle;
		}
		.is-right{
			float:  right;
		}
		.k-radio-core{
			display: inline-block;
			background-color: #fff;
			border: 1px solid #ccc;
			position: relative;
			width: 20px;
			height: 20px;
			vertical-align: middle;
		}
		.k-radio-input{
			opacity: 0;
		}
		.k-radio-input:checked + .k-radio-core{
			background-color: $color-red;
			border-color: $color-red;
			&:after{
				border-color: #fff;
				transform: rotate(45deg) scale(1);
			}
		}
		.k-radio-input[disabled] + .k-radio-core{
			background-color: #d9d9d9;
			border-color: #ccc;
		}
		.k-radio-core:after{
			border: 2px solid transparent;
			border-left: 0;
			border-top: 0;
			content: " ";
			top: 3px;
			left: 6px;
			position: absolute;
			width: 4px;
			height: 8px;
			transform: rotate(45deg) scale(0);
			transition: transform .2s;
		}
	}
</style>
