<template>
	<div class="step">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'k-step',
	props: {
		current: Number,
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		gutter: {
			type: String,
			default: '10px'
		}
	},
	ready () {
		this._mapPropsToChildComponent();
	},
	watch: {
		current () {
			this._mapPropsToChildComponent();
		}
	},
	methods: {
		_mapPropsToChildComponent () {
			const _this = this;
			const len = this.$children.length - 1;
			this.$children.forEach((child, index) => {
				child.stepNumber = Number(index + 1);
				child.stepLast = index === len;
				if (index === _this.current) {
					child.status = 'process';
				} else if (index < _this.current) {
					child.status = 'finish';
				} else {
					child.status = 'wait';
				}
			});
		}
	}
};
</script>

<style lang="scss">
.step {
	display: flex;
	text-align: left;
}
.step-item {
	display: inline-block;
	position: relative;
	overflow: hidden;
}
.step-item-with-tail {
	flex: 1;
}
.step-item-tail {
	height: 1px;
	position: absolute;
	left: 0;
	top: 10px;
	padding: 0 0;
	transition: all 0.4s ease 0s;
}
.step-item-tail-finish {
	background: #09bb07 none repeat scroll 0 0;
}
.step-item-tail-process, .step-item-tail-wait {
	background: #CCC none repeat scroll 0 0;
}
.step-item-checked::before {
	font-size: 12px;
	transform: translateY(-10%);
}
.step-item-title {
	font-size: 0.8rem;
}
.step-item-head {
	position: relative;
	display: inline-block;
	margin-right: -4px;
	.step-item-head-inner {
		width: 20px;
		height: 20px;
		border-radius: 99px;
		text-align: center;
		font-size: 0.9rem;
		transition: all 0.4s ease 0s;
		background: #fff none repeat scroll 0 0;
	}
}
.step-item-head-finish .step-item-head-inner{
	border: 1px solid #09bb07;
	color: #09bb07;
}
.step-item-head-process .step-item-head-inner{
	border: 1px solid #09bb07;
	color: #FFF;
	background: #09bb07 none repeat scroll 0 0;
}
.step-item-head-wait .step-item-head-inner {
	border: 1px solid #888;
	color: #888;
}
.step-item-main {
	display: inline-block;
	position: relative;
	vertical-align: top;
	color: #888;
	padding-left: 5px;
}
.step-item-main-process {
	font-weight: bold;
	color: #666;
}
</style>