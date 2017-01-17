<template>
<div class="step-item" :class=" { 'step-item-with-tail' : !stepLast} ">
	<div :class="'step-item-tail ' + 'step-item-tail-' + status" v-show="!stepLast" :style="{right: $parent.gutter}"></div>
	<div :class="'step-item-head ' + 'step-item-head-' + status">
		<div class="step-item-head-inner">
			<span v-if="!icon && status!='finish'" class="step-item-icon">{{stepNumber}}</span>
			<span v-else :class="'step-item-icon ' + 'step-item-' + iconName">
				<k-icon class="step-item-checked mintui mintui-success"></k-icon>
			</span>
		</div>
	</div>
	<div :class="'step-item-main ' + 'step-item-main-' + status" :style="{backgroundColor: $parent.backgroundColor, paddingRight: stepLast ? 0 : $parent.gutter}">
		<span class="step-item-title">{{title}}</span>
		<div class="step-item-description">{{description}}</div>
	</div>
</div>
</template>

<script>
	import Icon from '../icon/icon.vue';

	export default {
		name: 'k-step-item',
		props: {
			title: String,
			description: String,
			stepNumber: {
				type: Number
			},
			stepLast: {
				type: Boolean,
				default: false
			},
			icon: String,
			status: String,
			tailWidth: {
				type: Object
			}
		},
		computed: {
			iconName () {
				return this.icon || 'check';
			}
		},
		components: {
			[Icon.name]: Icon
		}
	};
</script>

<style lang="scss">
	@import '../../assets/fonts/iconfont.css';
</style>