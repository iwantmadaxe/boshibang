<template>
	<div class="box-section cl-fx block-center-v">
		<div :class="['box-pic', boxPic]">
			<slot name="img"></slot>
		</div>
		<div :class="['box-content', 'cl-fx', boxContent]">
			<h3 class="box-head" v-text="headTitle"></h3>
			<p class="box-sub" v-text="subTitle"></p>
			<slot name="more">
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'box-section',
		props: {
			headTitle: {
				default: ''
			},
			subTitle: {
				default: ''
			},
			boxPic: {
				default: ''
			},
			boxContent: {
				default: ''
			}
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	.box-pic{
		width: 30%;
		display: inline-block;
		float: left;
		padding-right: 5px;
	}
	.box-content{
		width: 70%;
		display: inline-block;
		float: right;
		text-align: left;
		padding-left: 5px;
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
