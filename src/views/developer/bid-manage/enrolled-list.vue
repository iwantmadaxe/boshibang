<template>
	<div class="zeco-enrolled-list">
		<section class="enrolled-project-manage">
			<ul>
				<li class="list-box-content" v-for="item in enroll">
					<box-section :head-title="item.companyName">
						<img :src="item.logo" slot="img" width="80%">
						<div class="option-more" slot="more">
							<div class="company-info cl-fx" v-link="{name: 'Supply', params: {supply_no: item.companyId}}">
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
								<k-checkbox align="right" :value.sync="value" :option="item.option"></k-checkbox>
							</div>
						</div>
					</box-section>
				</li>
			</ul>
		</section>
		<section :class="['enrolled-project-bar', bidStatus !== 1 ? 'disable-btn' : '']" v-show="bidStatus === 1">
			<mt-tabbar :fixed="true">
				<mt-tab-item @click="sureInBid">
					确认入围
				</mt-tab-item>
				<mt-tab-item @click="sureFinished">
					结束中标
				</mt-tab-item>
			</mt-tabbar>
		</section>
	</div>
</template>
<script>
	import { Tabbar, TabItem, Toast, MessageBox } from 'mint-ui';
	import Checkbox from '../../../components/checkbox/checkbox.vue';
	import BoxSection from '../../../components/box-section/box-section.vue';
	import { enroll, bidStatus } from '../../../vuex/getters.js';
	import apis from '../../../api';
	import { goLogout, giveApplyBidCompanies } from '../../../vuex/actions.js';
	import handleBidStatus from '../../../services/handle-bid-status.js';

	export default {
		name: 'zeco-enrolled-list',
		data () {
			return {
				value: []
			};
		},
		props: {
			token: '',
			bidNo: null
		},
		vuex: {
			getters: {
				enroll,
				bidStatus
			},
			actions: {
				goLogout,
				giveApplyBidCompanies
			}
		},
		methods: {
			sureInBid () {
				if (this.bidStatus !== 1) {
					return false;
				}
				MessageBox.confirm('您只有一次机会将该批企业入围，确定操作吗？', '提示')
				.then((val) => {
					let options = {
						params: {
							bid_id: this.bidNo,
							status: 1,
							company_id: this.value.join('-')
						},
						headers: {
							Authorization: 'bearer ' + this.token
						}
					};
					this.$http.get(apis.urls.bidChecked, options).then((response) => {
						let tplBidApply = apis.pures.pureDeveloperBidEnroll(response.body);
						let applyCompanies = handleBidStatus(tplBidApply.bidapply, 2);
						this.giveApplyBidCompanies(applyCompanies, 2);
						Toast({
							message: '招标入围成功！',
							iconClass: 'mintui mintui-success',
							duration: 2000
						});
						return true;
					}, (response) => {
						apis.errors.errorAllList(response, this);
						return false;
					});
					return true;
				}, (val) => {});
			},
			sureFinished () {
				if (this.bidStatus !== 1) {
					return false;
				}
				MessageBox.confirm('您确定取消此次招标吗？取消后将无法再次开启', '提示')
				.then((val) => {
					let options = {
						params: {
							bid_id: this.bidNo,
							status: 3,
							company_id: 0
						},
						headers: {
							Authorization: 'bearer ' + this.token
						}
					};
					this.$http.get(apis.urls.bidChecked, options).then((response) => {
						let tplBidApply = apis.pures.pureDeveloperBidEnroll(response.body);
						let applyCompanies = handleBidStatus(tplBidApply.bidapply, 3);
						this.giveApplyBidCompanies(applyCompanies, 3);
						Toast({
							message: '招标结束成功！',
							iconClass: 'mintui mintui-success',
							duration: 2000
						});
						return true;
					}, (response) => {
						apis.errors.errorAllList(response, this);
						return false;
					});
					return true;
				}, (val) => {});
			}
		},
		components: {
			[Toast.name]: Toast,
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem,
			[Checkbox.name]: Checkbox,
			[BoxSection.name]: BoxSection
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_border.scss';
	@import '../../../assets/sass/partials/_var.scss';
	// 用户信息布局
	.zeco-enrolled-list ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-enrolled-list .company-info{
		margin-top: 3px;
	}
	.zeco-enrolled-list .company-info .info-left{
		float: left;
		text-align: left;
		max-width: 70%;
		overflow: hidden;
		word-break: break-all;
	}
	.zeco-enrolled-list .company-info .info-right{
		float: right;
		text-align: right;
		max-width: 30%;
		overflow: hidden;
		word-break: break-all;
	}
	.zeco-enrolled-list .company-info .company-address{
		display: inline-block;
		vertical-align: middle;
		max-width: 65%;
	}

	// 控制条
	.zeco-enrolled-list .enrolled-project-bar{
		height: 55px;
	}
	.zeco-enrolled-list .enrolled-project-bar .mint-tab-item .mint-tab-item-label{
		line-height: 41px;
		@include border-right($border-color);
		font-size: 0.9rem;
	}
	.zeco-enrolled-list .enrolled-project-bar .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
	}
	.zeco-enrolled-list .enrolled-project-bar .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
	}
	// 禁用颜色
	.zeco-enrolled-list .enrolled-project-bar.disable-btn .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
		opacity: 0.8;
		cursor: not-allowed;
	}
	.zeco-enrolled-list .enrolled-project-bar.disable-btn .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
		opacity: 0.8;
		cursor: not-allowed;
	}

	// checkbox修改
	.zeco-enrolled-list .company-bars{
		margin-top: 15px;
	}
</style>