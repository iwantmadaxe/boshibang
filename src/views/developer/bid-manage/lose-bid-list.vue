<template>
	<div class="zeco-lose-bid-list">
		<section class="lose-project-manage">
			<ul>
				<li class="list-box-content" v-for="item in loseBid">
					<box-section :head-title="item.companyName">
						<img :src="item.logo" slot="img" width="80%">
						<div class="option-more" slot="more">
							<div class="company-info cl-fx">
								<div class="info-left">
									<span class="qualification-title">地址:</span>
									<span class="qualification-content">{{item.companyAddress}}</span>
								</div>
								<div class="info-right">
									<b>[</b>
									<span class="company-address one-line">{{item.category}}</span>
									<b>]</b>
								</div>
							</div>
							<div class="company-bars">
								<span>申请人:{{item.username}}</span>
							</div>
						</div>
					</box-section>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
	import BoxSection from '../../../components/box-section/box-section.vue';
	import { loseBid } from '../../../vuex/getters.js';

	export default {
		name: 'zeco-lose-bid-list',
		vuex: {
			getters: {
				loseBid
			}
		},
		components: {
			[BoxSection.name]: BoxSection
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_border.scss';
	@import '../../../assets/sass/partials/_var.scss';
	// 用户信息布局
	.zeco-lose-bid-list ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-lose-bid-list .company-info{
		margin-top: 3px;
	}
	.zeco-lose-bid-list .company-info .company-address{
		display: inline-block;
		vertical-align: middle;
		max-width: 65%;
	}
	.zeco-lose-bid-list .company-info .info-left{
		float: left;
		text-align: left;
		max-width: 70%;
		overflow: hidden;
		word-break: break-all;
	}
	.zeco-lose-bid-list .company-info .info-right{
		float: right;
		text-align: right;
		max-width: 30%;
		overflow: hidden;
		word-break: break-all;
	}
	// 选项框修正
	.zeco-lose-bid-list .company-bars{
		margin-top: 15px;
	}
</style>