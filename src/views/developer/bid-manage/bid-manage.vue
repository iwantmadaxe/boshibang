<template>
	<div class="zeco-bid-manage">
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
								<span class="address-detail one-line">{{details.providerAddress}}</span>
							<b>]</b>
						</span>
					</div>
					<div class="option-right">
						<span class="option-money one-line">{{details.providerMoney}}</span>
					</div>
				</div>
				<div class="project-assistant cl-fx">
					<div class="option-left">
						<span class="assistant-time one-line">{{details.createdAt}}</span>
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
					<span class="range-content">{{details.serviceAddress}}</span>
				</div>
				<div class="service-qualification">
					<span class="qualification-title">服务资质:</span>
					<span class="qualification-content">{{details.providerProject}}</span>
				</div>
			</x-complex-cell>
			<div class="gap-p"></div>
			<x-complex-cell title="招标详情">{{details.providerOther}}</x-complex-cell>
		</section>
		<section class="manage-bars">
			<mt-navbar class="page-part" :selected.sync="selected">
				<mt-tab-item id="enroll">报名</mt-tab-item>
				<mt-tab-item id="candidate">入围</mt-tab-item>
				<mt-tab-item id="win-bid">中标</mt-tab-item>
				<mt-tab-item id="no-win-bid">未中标</mt-tab-item>
			</mt-navbar>
			<mt-tab-container :active.sync="selected" swipeable>
				<mt-tab-container-item id="enroll">
					<zeco-enrolled-list :token="token" :bid-no="bidNo"></zeco-enrolled-list>
				</mt-tab-container-item>
				<mt-tab-container-item id="candidate">
					<zeco-passed-list :token="token" :bid-no="bidNo"></zeco-passed-list>
				</mt-tab-container-item>
				<mt-tab-container-item id="win-bid">
					<zeco-win-bid-list></zeco-win-bid-list>
				</mt-tab-container-item>
				<mt-tab-container-item id="no-win-bid">
					<zeco-lose-bid-list></zeco-lose-bid-list>
				</mt-tab-container-item>
			</mt-tab-container>
		</section>
	</div>
</template>
<script>
	import { Tabbar, TabItem, Toast, Navbar, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import SmallTag from '../../../components/small-tag/small-tag.vue';
	import BoxSection from '../../../components/box-section/box-section.vue';
	import ComplexCell from '../../../components/complex-cell/complex-cell.vue';
	import EnrolledList from './enrolled-list.vue';
	import PassedList from './passed-list.vue';
	import WinBidList from './win-bid-list.vue';
	import LoseBidList from './lose-bid-list.vue';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout, giveApplyBidCompanies } from '../../../vuex/actions.js';
	import handleBidStatus from '../../../services/handle-bid-status.js';

	export default {
		name: 'zeco-bid-manage',
		data () {
			return {
				token: '',
				bidNo: null,
				selected: 'enroll',
				details: {}
			};
		},
		vuex: {
			getters: {
				userToken
			},
			actions: {
				goLogout,
				giveApplyBidCompanies
			}
		},
		route: {
			data (transition) {
				Indicator.open('加载中...');
				// 获取招标id
				this.bidNo = this.$route.params.bid_no;
				// 读取localStorage信息
				let userInfo = readLocal('user');
				// 获取token
				if (this.userToken) {
					this.token = this.userToken;
				} else if (userInfo !== false && userInfo.token) {
					this.token = userInfo.token;
				}

				// 请求招标详情
				let options = {
					params: {
						id: this.bidNo
					},
					headers: {
						Authorization: 'bearer ' + this.token
					}
				};
				this.$http.get(apis.urls.bid_detail, options).then((response) => {
					Indicator.close();
					transition.next();
					this.details = apis.pures.pureDeveloperBidDetail(response.body);
					let applyCompanies = handleBidStatus(this.details.bidapply, this.details.bidStatus);
					this.giveApplyBidCompanies(applyCompanies, this.details.bidStatus);
				}, (response) => {
					Indicator.close();
					apis.errors.errorAllList(response, this);
					transition.abort();
				});
			}
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
				Toast({
					message: '报名成功',
					iconClass: 'mintui mintui-success',
					duration: 2000
				});
				return false;
			}
		},
		components: {
			[Tabbar.name]: Tabbar,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[SmallTag.name]: SmallTag,
			[PassedList.name]: PassedList,
			[WinBidList.name]: WinBidList,
			[BoxSection.name]: BoxSection,
			[LoseBidList.name]: LoseBidList,
			[ComplexCell.name]: ComplexCell,
			[EnrolledList.name]: EnrolledList,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_border.scss';
	@import '../../../assets/sass/partials/_var.scss';

	// 控制条
	.zeco-bid-manage .bid-project-bar{
		height: 55px;
	}
	.zeco-bid-manage .bid-project-bar .mint-tab-item .mint-tab-item-label{
		line-height: 41px;
		@include border-right($border-color);
		font-size: 0.9rem;
	}
	.zeco-bid-manage .bid-project-bar .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
	}
	.zeco-bid-manage .bid-project-bar .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
	}

	// 条件
	.zeco-bid-manage .bid-project-condition{
		margin-top: 10px;
		@include border-top($border-color);
		@include border-bottom($border-color);
	}

	// 标题栏目
	.zeco-bid-manage .bid-project-info{
		background-color: $color-white;
		padding: 20px 0 0 10px;
		@include border-bottom($border-color);
	}
	.zeco-bid-manage .project-summary{
		padding-right: 10px;
	}
	.zeco-bid-manage .option-left{
		float: left;
		text-align: left;
	}
	.zeco-bid-manage .option-right{
		float: right;
		text-align: right;
	}

	// 主标题
	.zeco-bid-manage .project-name{
		color: $color-black;
		font-size: 1rem;
		text-align: left;
		padding-bottom: 10px;
	}
	// 副标题
	.zeco-bid-manage .project-qualification{
		text-align: left;
		font-size: 0.9rem;
		color: darken($color-grey, 20%);
		padding-bottom: 10px;
	}
	// 基础信息
	.zeco-bid-manage .project-option{
		padding-bottom: 10px;
	}
	.zeco-bid-manage .project-summary .project-option span,
	.zeco-bid-manage .project-summary .project-option b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.9rem;
	}
	.zeco-bid-manage .icon-tag-bid{
		color: $bid-color;
		background-color: $main-background-color;
	}
	.zeco-bid-manage .option-addresses{
		color: darken($color-grey, 20%);
	}
	.zeco-bid-manage .option-money{
		color: $bid-color;
	}

	// 限制条件
	.zeco-bid-manage .project-summary .project-assistant span,
	.zeco-bid-manage .project-summary .project-assistant b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.8rem;
	}
	.zeco-bid-manage .option-left{
		color: darken($color-grey, 20%);
	}
	// 人数和时间
	.zeco-bid-manage .project-assistant{
		padding-bottom: 10px;
	}
	.zeco-bid-manage .assistant-watch-number{
		padding-left: 5px;
	}
	.zeco-bid-manage .assistant-watch-number .watch-number{
		margin-left: -3px;
	}
	.zeco-bid-manage .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
	}
	// 截止报名时间
	.zeco-bid-manage .assistant-limit{
		color: $limit-color;
	}

	// 控制条
	.zeco-bid-manage .manage-bars{
		background-color: $color-white;
		margin-top: 10px;
		@include border-top($border-color);
	}
	
	// checkbox控制条
	.zeco-bid-manage .company-bars .mint-cell-wrapper,
	.zeco-bid-manage .company-bars .mint-checklist-label{
		padding: 0;
	}
</style>