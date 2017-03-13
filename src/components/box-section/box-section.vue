<template>
	<div class="box-section cl-fx block-center-v">
		<div
		class="box-pic"
		:style="{width: `${width*10}%`}"
		v-if="width">
			<slot name="img"></slot>
		</div>
		<div
		class="box-content cl-fx"
		:style="{width: `${(10-width)*10}%`}"
		v-if="10-width">
			<h3 v-if="headTitle" class="box-head" v-text="headTitle"></h3>
			<p v-if="subTitle" class="box-sub" v-text="subTitle"></p>
			<slot name="more"></slot>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'k-box-section',
		props: {
			headTitle: {
				default: ''
			},
			subTitle: {
				default: ''
			},
			width: {
				default: 3
			}
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	.box-pic{
		display: inline-block;
		float: left;
		padding-right: 10px;
	}
	.box-content{
		display: inline-block;
		float: right;
		text-align: left;
	}
	.box-content .box-head{
		font-size: 1.1rem;
		font-weight: 700;
		white-space: nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.box-content .box-sub{
		font-size: 0.79rem;
		font-weight: 500;
		color: darken($color-grey, 20%);		
		white-space: nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
</style>
