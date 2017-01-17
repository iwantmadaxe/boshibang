<template>
	<div class="zeco-bid">
		<section class="bid-project-info">
			<div class="project-summary">
				<p class="project-name">{{details.title}}</p>
				<p class="project-qualification">{{details.range}}</p>
				<div class="project-option cl-fx">
					<div class="option-left">
						<span class="option-tag">
							<small-tag tag-name="招标" class="icon-tag-bid"></small-tag>
						</span>
						<span class="option-addresses">
							<b>[</b>
								<span class="address-detail one-line">{{details.address1}}</span>
							<b>]</b>
						</span>
					</div>
					<div class="option-right">
						<span class="option-money one-line">{{details.providerMoney}}</span>
					</div>
				</div>
				<div class="project-assistant cl-fx">
					<div class="option-left">
						<span class="assistant-time one-line">{{details.updatedAt}}</span>
						<span class="assistant-watch-number">
							<i class="icon-watch"></i>
							<span class="watch-number one-line">{{details.view}}</span>
						</span>
					</div>
					<div class="option-right">
						<span class="assistant-limit">
							<span class="limit-name">截止:</span>
							<span class="limit-time">{{details.deadline}}</span>
						</span>
					</div>
				</div>
			</div>
			<div class="company-summary" @click="goCompany(details.publish.companyType, details.publish.companyId)">
				<div class="list-box-content">
					<box-section :head-title="details.publish.companyName" sub-title="关注我们可获得更多采购需求>>">
						<img slot="img" :src="details.publish.logo" width="50">
					</box-section>
				</div>
			</div>
		</section>
		<section class="bid-project-condition">
			<x-complex-cell title="招标范围">{{details.range}}</x-complex-cell>
			<div class="gap-p"></div>
			<x-complex-cell title="报名条件">
				<div class="registered-capital">
					<span class="capital-title">注册资本:</span>
					<span class="capital-content">{{details.providerMoney}}</span>
				</div>
				<div class="service-range">
					<span class="range-title">服务地区:</span>
					<span class="range-content">{{details.address2}}</span>
				</div>
				<div class="service-qualification">
					<span class="qualification-title">服务资质:</span>
					<span class="qualification-content">{{details.providerProject}}</span>
				</div>
			</x-complex-cell>
			<div class="gap-p"></div>
			<x-complex-cell title="招标详情">{{details.providerOther}}</x-complex-cell>
		</section>
		<section class="bid-project-bar">
			<mt-tabbar :fixed="true">
				<mt-tab-item>
					报名{{details.applied}}家
				</mt-tab-item>
				<mt-tab-item @click="upSign">
					立即报名
				</mt-tab-item>
			</mt-tabbar>
		</section>
	</div>
</template>
<script>
	import { Tabbar, TabItem, Toast, Indicator, MessageBox } from 'mint-ui';
	import SmallTag from '../../components/small-tag/small-tag.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';
	import apis from '../../api/index.js';
	import { goLogout } from '../../vuex/actions.js';
	import { userToken, loginStatus } from '../../vuex/getters.js';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-bid',
		data () {
			return {
				details: {
					publish: {
						companyName: '',
						logo: ''
					}
				},
				bidNo: null
			};
		},
		route: {
			data (transition) {
				Indicator.open('加载中...');
				this.bidNo = this.$route.params.bid_no;
				this.$http.get(apis.urls.biddetail, {params: {id: this.bidNo}}).then((response) => {
					Indicator.close();
					this.details = apis.pures.pureBidDetail(response.body);
				}, (response) => {
					Indicator.close();
					apis.errors.errorBidDetail(response, this);
				});
			}
		},
		vuex: {
			getters: {
				userToken,
				loginStatus
			},
			actions: {
				goLogout
			}
		},
		components: {
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem,
			[SmallTag.name]: SmallTag,
			[BoxSection.name]: BoxSection,
			[ComplexCell.name]: ComplexCell
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		beforeDestroy () {
			Indicator.close();
		},
		methods: {
			upSign () {
				let _this = this;
				// 未登录需要提示并让登录
				if (this.loginStatus === 'out') {
					if (readLocal('user') === false || readLocal('user').loginStatus === 'out') {
						MessageBox.alert('请登录！', '提示').then(function () {
							// 返回登录页面
							_this.$route.router.go({name: 'Login'});
						});
						return false;
					}
				}
				// 获取token
				let token = '';
				if (this.userToken) {
					token = this.userToken;
				} else if (readLocal('user')) {
					token = readLocal('user').token;
				}
				let options = {
					params: {bid_id: this.bidNo},
					headers: {Authorization: 'Bearer ' + token}
				};
				this.$http.get(apis.urls.bidApply, options).then((response) => {
					Toast({
						message: '报名成功',
						iconClass: 'mintui mintui-success',
						duration: 2000
					});
				}, (response) => {
					apis.errors.errorBidApply(response, this);
				});
			},
			goCompany (path, id) {
				if (path === 2) {
					this.$route.router.go({name: 'Supply', params: {supply_no: id}});
					return false;
				}
				if (path === 1) {
					this.$route.router.go({name: 'Demond', params: {demond_no: id}});
					return false;
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';

	// 控制条
	.zeco-bid .bid-project-bar{
		height: 55px;
	}
	.zeco-bid .bid-project-bar .mint-tab-item .mint-tab-item-label{
		line-height: 41px;
		@include border-right($border-color);
		font-size: 0.9rem;
	}
	.zeco-bid .bid-project-bar .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
	}
	.zeco-bid .bid-project-bar .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
	}

	// 条件
	.zeco-bid .bid-project-condition{
		margin-top: 10px;
		@include border-top($border-color);
	}

	// 标题栏目
	.zeco-bid .bid-project-info{
		background-color: $color-white;
		padding: 20px 0 0 10px;
		@include border-bottom($border-color);
	}
	.zeco-bid .project-summary{
		padding-right: 10px;
		@include border-bottom($border-color);
	}
	.zeco-bid .option-left{
		float: left;
		text-align: left;
	}
	.zeco-bid .option-right{
		float: right;
		text-align: right;
	}

	// 主标题
	.zeco-bid .project-name{
		color: $color-black;
		font-size: 1rem;
		text-align: left;
		padding-bottom: 10px;
	}
	// 副标题
	.zeco-bid .project-qualification{
		text-align: left;
		font-size: 0.9rem;
		color: darken($color-grey, 20%);
		padding-bottom: 10px;
	}
	// 基础信息
	.zeco-bid .project-option{
		padding-bottom: 10px;
	}
	.zeco-bid .project-summary .project-option span,
	.zeco-bid .project-summary .project-option b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.9rem;
	}
	.zeco-bid .icon-tag-bid{
		color: $bid-color;
		background-color: $main-background-color;
	}
	.zeco-bid .option-addresses{
		color: darken($color-grey, 20%);
	}
	.zeco-bid .option-money{
		color: $bid-color;
	}

	// 限制条件
	.zeco-bid .project-summary .project-assistant span,
	.zeco-bid .project-summary .project-assistant b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.8rem;
	}
	.zeco-bid .option-left{
		color: darken($color-grey, 20%);
	}
	// 人数和时间
	.zeco-bid .project-assistant{
		padding-bottom: 10px;
	}
	.zeco-bid .assistant-watch-number{
		padding-left: 5px;
	}
	.zeco-bid .assistant-watch-number .watch-number{
		margin-left: -3px;
	}
	.zeco-bid .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
	}
	// 截止报名时间
	.zeco-bid .assistant-limit{
		color: $limit-color;
	}

	// 公司介绍
	.zeco-bid .company-summary{
		padding-right: 10px;
	}
	.zeco-bid .company-summary .box-pic{
		text-align: left;
	}
	.zeco-bid .company-summary .box-content{
		text-align: right;
	}
	.zeco-bid .box-section{
		margin: 0;
	}
	.zeco-bid .box-section:before{
		border-bottom: 0;
	}
</style>