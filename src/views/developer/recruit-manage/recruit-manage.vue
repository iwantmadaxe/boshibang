<template>
	<div class="zeco-recruit-manage">
		<section class="recruit-project-info">
			<div class="project-summary">
				<p class="project-name">{{ details.title }}</p>
				<p class="project-qualification">{{ details.range }}</p>
				<div class="project-option cl-fx">
					<div class="option-left">
						<span class="option-tag">
							<small-tag tag-name="招募" class="icon-tag-recruit"></small-tag>
						</span>
						<span class="option-addresses">
							<b>[</b>
								<span class="address-detail one-line">{{ details.addressRange }}</span>
							<b>]</b>
						</span>
					</div>
					<div class="option-right">
						<span class="option-money one-line">{{ details.providerMoney }}</span>
					</div>
				</div>
				<div class="project-assistant cl-fx">
					<div class="option-left">
						<span class="assistant-time one-line">{{ details.createdAt }}</span>
						<span class="assistant-watch-number">
							<i class="icon-watch"></i>
							<span class="watch-number one-line">{{ details.view }}</span>
						</span>
					</div>
					<div class="option-right">
						<span class="assistant-limit">
							<span class="limit-name">截止:</span>
							<span class="limit-time">{{ details.deadline }}</span>
						</span>
					</div>
				</div>
			</div>
		</section>
		<section class="recruit-project-condition">
			<x-complex-cell title="招募范围">{{ details.range }}</x-complex-cell>
			<div class="gap-p"></div>
			<x-complex-cell title="报名条件">
				<div class="registered-capital">
					<span class="capital-title">注册资本:</span>
					<span class="capital-content">{{ details.providerMoney }}</span>
				</div>
				<div class="service-range">
					<span class="range-title">服务地区:</span>
					<span class="range-content">{{ details.serviceAddress }}</span>
				</div>
				<div class="service-qualification">
					<span class="qualification-title">服务资质:</span>
					<span class="qualification-content">{{ details.providerProject }}</span>
				</div>
			</x-complex-cell>
			<div class="gap-p"></div>
			<x-complex-cell title="招募详情">{{ details.providerOther }}</x-complex-cell>
		</section>
		<section class="recruit-project-manage">
			<x-complex-cell :title="participation">
				<ul>
					<li class="list-box-content" v-for="applyItem in details.apply">
						<box-section :head-title="applyItem.companyName">
							<img :src="applyItem.logo" slot="img" width="80%">
							<div class="option-more" slot="more">
								<div class="company-info cl-fx" v-link="{name: 'Supply', params: {supply_no: applyItem.companyId}}">
									<div class="info-left">
										<span class="qualification-title">地址:</span>
										<span class="qualification-content">{{ applyItem.companyAddress }}</span>
									</div>
									<div class="info-right">
										<b>[</b>
										<span class="company-address one-line">{{ applyItem.category }}</span>
										<b>]</b>
									</div>
								</div>
								<div class="company-bars">
									<k-checkbox align="right" :value.sync="value" :option="applyItem.option"></k-checkbox>
								</div>
							</div>
						</box-section>
					</li>
				</ul>
			</x-complex-cell>
		</section>
		<section :class="['recruit-project-bar', details.allDisabledStatus ? 'disable-btn' : '']">
			<mt-tabbar :fixed="true">
				<mt-tab-item @click="checkedRecruit">
					确认入库
				</mt-tab-item>
				<mt-tab-item @click="sureFinished">
					结束招募
				</mt-tab-item>
			</mt-tabbar>
		</section>
	</div>
</template>
<script>
	import { Tabbar, TabItem, Toast, Indicator, MessageBox } from 'mint-ui';
	import SmallTag from '../../../components/small-tag/small-tag.vue';
	import BoxSection from '../../../components/box-section/box-section.vue';
	import ComplexCell from '../../../components/complex-cell/complex-cell.vue';
	import Checkbox from '../../../components/checkbox/checkbox.vue';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';

	export default {
		name: 'zeco-recruit-manage',
		data () {
			return {
				recruitNo: null,
				details: {},
				token: '',
				value: []
			};
		},
		computed: {
			participation: function () {
				if (this.details.apply) {
					return `已有${this.details.apply.length}家供应商报名`;
				} else {
					return 0;
				}
			}
		},
		vuex: {
			getters: {
				userToken
			}
		},
		route: {
			data (transition) {
				// 招募id
				this.recruitNo = this.$route.params.recruit_no;
				// 读取localStorage信息
				let userInfo = readLocal('user');
				// 获取token
				if (this.userToken) {
					this.token = this.userToken;
				} else if (userInfo !== false && userInfo.token) {
					this.token = userInfo.token;
				}
				this.loadingData(transition);
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		methods: {
			loadingData (transition) {
				Indicator.open('加载中...');
				this.loading = true;
				// 获取列表数据
				let options = {
					params: {id: this.recruitNo},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.recruit_detail, options).then((response) => {
					let tplDetails = apis.pures.pureDeveloperRecruitDetail(response.body);
					this.details = tplDetails;
					this.value = tplDetails.chosen;
					Indicator.close();
					if (transition) {
						transition.next();
					}
				}, (response) => {
					apis.errors.errorAllList(response, this);
					Indicator.close();
					if (transition) {
						transition.next();
					}
				});
			},
			sureFinished () {
				// 取消点击时间
				if (this.details.allDisabledStatus) {
					return false;
				}
				MessageBox.confirm('你确定要结束此招募吗？', '提示').then((value) => {
					let options = {
						params: {
							id: this.recruitNo,
							type: 2
						},
						headers: {Authorization: 'Bearer ' + this.token}
					};
					this.$http.get(apis.urls.recruitChecked, options).then((response) => {
						// 结束成功提示
						Toast({
							message: '招募结束成功！',
							iconClass: 'mintui mintui-success',
							duration: 2000
						});
						// 返回列表页
						this.$route.router.go({name: 'RecruitManageList'});
						return false;
					}, (response) => {
						apis.errors.errorAllList(response, this);
						return false;
					});
				}, (value) => {});
			},
			checkedRecruit () {
				// 取消点击时间
				if (this.details.allDisabledStatus) {
					return false;
				}
				if (!this.value.length) {
					MessageBox.alert('至少选择一家企业入库', '提示');
					return false;
				}
				let options = {
					params: {
						id: this.recruitNo,
						type: 1,
						apply_id: this.value.join('-')
					},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.recruitChecked, options).then((response) => {
					// 成功提示
					Toast({
						message: '入库成功！',
						iconClass: 'mintui mintui-success',
						duration: 2000
					});
					// 返回列表页
					this.$route.router.go({name: 'RecruitManageList'});
					return false;
				}, (response) => {
					apis.errors.errorAllList(response, this);
					return false;
				});
			}
		},
		components: {
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem,
			[SmallTag.name]: SmallTag,
			[Checkbox.name]: Checkbox,
			[BoxSection.name]: BoxSection,
			[ComplexCell.name]: ComplexCell
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_border.scss';
	@import '../../../assets/sass/partials/_var.scss';

	// 控制条
	.zeco-recruit-manage .recruit-project-bar{
		height: 55px;
	}
	.zeco-recruit-manage .recruit-project-bar .mint-tab-item .mint-tab-item-label{
		line-height: 41px;
		@include border-right($border-color);
		font-size: 0.9rem;
	}
	.zeco-recruit-manage .recruit-project-bar .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
	}
	.zeco-recruit-manage .recruit-project-bar .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
	}
	// 禁用颜色
	.zeco-recruit-manage .recruit-project-bar.disable-btn .mint-tab-item.is-selected:first-child{
		color: $color-white;
		background-color: #0266bb;
		opacity: 0.8;
		cursor: not-allowed;
	}
	.zeco-recruit-manage .recruit-project-bar.disable-btn .mint-tab-item.is-selected:last-child{
		color: $bid-color;
		background-color: $main-background-color;
		opacity: 0.8;
		cursor: not-allowed;
	}

	// 条件
	.zeco-recruit-manage .recruit-project-condition{
		margin-top: 10px;
		@include border-top($border-color);
		@include border-bottom($border-color);
	}

	// 标题栏目
	.zeco-recruit-manage .recruit-project-info{
		background-color: $color-white;
		padding: 20px 0 0 10px;
		@include border-bottom($border-color);
	}
	.zeco-recruit-manage .project-summary{
		padding-right: 10px;
	}
	.zeco-recruit-manage .option-left{
		float: left;
		text-align: left;
	}
	.zeco-recruit-manage .option-right{
		float: right;
		text-align: right;
	}

	// 主标题
	.zeco-recruit-manage .project-name{
		color: $color-black;
		font-size: 1rem;
		text-align: left;
		padding-bottom: 10px;
	}
	// 副标题
	.zeco-recruit-manage .project-qualification{
		text-align: left;
		font-size: 0.9rem;
		color: darken($color-grey, 20%);
		padding-bottom: 10px;
	}
	// 基础信息
	.zeco-recruit-manage .project-option{
		padding-bottom: 10px;
	}
	.zeco-recruit-manage .project-summary .project-option span,
	.zeco-recruit-manage .project-summary .project-option b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.9rem;
	}
	.zeco-recruit-manage .icon-tag-recruit{
		color: $color-white;
		background-color: $bid-background-color;
	}
	.zeco-recruit-manage .option-addresses{
		color: darken($color-grey, 20%);
	}
	.zeco-recruit-manage .option-money{
		color: $bid-color;
	}

	// 限制条件
	.zeco-recruit-manage .project-summary .project-assistant span,
	.zeco-recruit-manage .project-summary .project-assistant b{
		display: inline-block;
		vertical-align: middle;
		font-size: 0.8rem;
	}
	.zeco-recruit-manage .option-left{
		color: darken($color-grey, 20%);
	}
	// 人数和时间
	.zeco-recruit-manage .project-assistant{
		padding-bottom: 10px;
	}
	.zeco-recruit-manage .assistant-watch-number{
		padding-left: 5px;
	}
	.zeco-recruit-manage .assistant-watch-number .watch-number{
		margin-left: -3px;
	}
	.zeco-recruit-manage .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
	}
	// 截止报名时间
	.zeco-recruit-manage .assistant-limit{
		color: $limit-color;
	}

	// 报名信息
	.zeco-recruit-manage .recruit-project-manage{
		margin-top: 10px;
		@include border-top($border-color);
	}
	.zeco-recruit-manage .recruit-project-manage ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-recruit-manage .recruit-project-manage .box-section{
		color: #666;
	}
	// 用户信息布局
	.zeco-recruit-manage .company-info{
		margin-top: 3px;
	}
	.zeco-recruit-manage .company-info .info-left{
		float: left;
		text-align: left;
		max-width: 65%;
		overflow: hidden;
		word-break: break-all;
	}
	.zeco-recruit-manage .company-info .info-right{
		float: right;
		text-align: right;
		max-width: 35%;
		overflow: hidden;
		word-break: break-all;
	}
	.zeco-recruit-manage .company-info .company-address{
		display: inline-block;
		max-width: 70%;
		vertical-align: middle;
	}
	// 选项框修正
	.zeco-recruit-manage .company-bars{
		margin-top: 15px;
	}
</style>