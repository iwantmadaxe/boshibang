<template>
	<div class="complex-cell">
		<!-- <p class="complex-cell-title" v-text="title"></p> -->
		<div class="complex-cell-content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'k-complex-cell',
		props: {
			title: ''
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';
	.complex-cell{
		padding-left: 10px;
		text-align: left;
		background-color: $color-white;
	}
	.complex-cell .complex-cell-title{
		padding: 16px 0;
		font-size: $page-title;
		@include border-bottom($border-color);
	}
	.complex-cell .complex-cell-content{
		word-break: break-word;
		line-height: 1.5;
		padding: 16px 0;
		font-size: $normal-text;
		color: darken($color-grey, 20%);
	}
</style>
