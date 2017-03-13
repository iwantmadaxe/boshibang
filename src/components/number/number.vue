<template>
	<div class="k-number-panel">
		<a class="k-number-minus"
			@click="sub"
			:class="[disabledMin||disable?'k-number-disabled':'']">
			<i class="iconfont icon-jianhao"></i>
		</a>
		<input type="number"
			class="k-number-content"
			:class="[disable?'k-number-disabled':'']" 
			v-model.number="currentValue"
			:disabled="disable"
			:readonly="!fillable"
			pattern="[0-9]*"
			:style="{width: width}">
		<a class="k-number-plus"
			@click="add"
			:class="[disabledMax||disable?'k-number-disabled':'']">
			<i class="iconfont icon-jiahao1"></i>
		</a>
	</div>
</template>
<script>
	export default {
		name: 'k-number',
		data () {
			return {
				currentValue: 0
			};
		},
		props: {
			min: Number,
			max: Number,
			step: {
				type: Number,
				default: 1
			},
			value: {
				type: Number,
				default: 0
			},
			fillable: {
				type: Boolean,
				default: false
			},
			disable: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '35px'
			}
		},
		computed: {
			disabledMin () {
				return this.min === 'undefined' ? false : this.currentValue <= this.min;
			},
			disabledMax () {
				return this.max === 'undefined' ? false : this.currentValue >= this.max;
			}
		},
		watch: {
			currentValue (newValue, old) {
				if (this.min && this.currentValue < this.min) {
					this.currentValue = this.min;
				}
				if (this.max && this.currentValue > this.max) {
					this.currentValue = this.max;
				}
				this.$emit('on-change', this.currentValue);
				this.$emit('input', this.currentValue);
			},
			value (newValue) {
				this.currentValue = newValue;
			}
		},
		created () {
			this.currentValue = this.value;
		},
		methods: {
			add () {
				if (!this.disable && !this.disabledMax) {
					this.currentValue += this.step;
				}
			},
			sub () {
				if (!this.disable && !this.disabledMin) {
					this.currentValue -= this.step;
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/fonts/iconfont.css';
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.k-number-panel{
		color: inherit;
		@include border-all($border-color)
		&:before {
			border-radius: 4px;
		}
		position: absolute;
		height: 25px;
	}
	.k-number-content{
		color: inherit;
		height: 100%;
	    text-align: center;
        vertical-align: top;
        border: none;
        background-color: inherit;
	}
	.k-number-plus, .k-number-minus{
		position: relative;
	    width: 25px;
	    height: 100%;
	    overflow: hidden;
	    display: inline-block;
	}
	.k-number-plus{
		@include border-left($border-color)
	}
	.k-number-minus{
		@include border-right($border-color)
	}
	.k-number-plus>i, .k-number-minus>i{
		position: absolute;
	    top: 6px;
	    left: 5px;
	    line-height: 1;
	}
	.k-number-disabled{
		color: #ccc;
		cursor: not-allowed;
	}
</style>
