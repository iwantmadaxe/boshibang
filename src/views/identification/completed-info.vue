<template>
	<div class="iden-complete">
		<div class="logo">
			<img src="../../assets/images/login/logo.png" height="118" width="80">
		</div>
		<div class="complete-remind">
			<h3 class="complete-title">认证完成！</h3>
			<div class="complete-detail">
				<p class="detail-power">您将可以免费报名海量采购需求</p>
				<p class="detail-notice">请耐心等待，我们将3个工作日内进行审核，并通知您</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'zeco-iden-complete'
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';

	.iden-complete{
		background-color: #fff;
		padding: 16px 10px;
		color: #000;
		@include border-top($border-color);
		@include border-bottom($border-color);
		margin: 1px 0;
	}
	.iden-complete .complete-remind{
		margin-top: 15px;
	}
	.iden-complete .complete-remind .complete-title{
		margin-bottom: 20px;
	}
	.iden-complete .complete-remind .complete-detail{
		color: #424242;
		font-size: 0.6rem;
	}
	.iden-complete .complete-detail .detail-power,
	.iden-complete .complete-detail .detail-notice{
		margin-bottom: 10px;
	}
</style>