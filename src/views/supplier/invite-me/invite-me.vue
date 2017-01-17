<template>
	<div class="zeco-invite-me">
		<section class="invite-me-list">
			<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li v-for="listItem in list">
					<mt-cell-swipe
					:right="[
					{content: '同意邀请',style: { background: '#4caf50', color: '#fff' },handler: () => this.inviteRespond(listItem, 1)},
					{content: '拒绝邀请',style: { background: 'red', color: '#fff' },handler: () => this.inviteRespond(listItem, 2)}
					]">
						<box-section :head-title="listItem.title" :sub-title="listItem.range" @click="goPath(listItem.bidId)">
							<div class="pic-avatar" slot="img">
								<img :src="listItem.logo ? listItem.logo : ''">
							</div>
							<div class="zeco-vote-info" slot="more">
								<div class="zeco-box-option cl-fx">
									<div class="option-left cl-fx">
										<div class="option-icon">
											<small-tag tag-name="招标" class="icon-tag-bid"></small-tag>
										</div>
										<div class="option-addresses">
											<b>[</b>
											<span class="address-detail one-line">{{listItem.address}}</span>
											<b>]</b>
										</div>
									</div>
									<div class="option-right">
										<span class="option-status one-line">{{listItem.status | bidApplyStatus}}</span>
									</div>
								</div>
								<div class="zeco-box-assistant cl-fx">
									<div class="option-left cl-fx">
										<span class="assistant-time one-line">{{listItem.createdAt}}</span>
										<span class="assistant-watch-number cl-fx">
											<i class="icon-watch"></i>
											<span class="watch-number one-line">{{listItem.view}}</span>
										</span>
									</div>
									<div class="option-right">
										<span class="assistant-limit">
											<span class="limit-name">截止:</span>
											<span class="limit-time">{{listItem.deadline}}</span>
										</span>
									</div>
								</div>
							</div>
						</box-section>
					</mt-cell-swipe>
				</li>
			</ul>

			<!-- 加载动画-->
			<div class="zeco-info-loading">
				<div class="zeco-loading-cover" v-show="(!allLoaded && !loadingError) || ($loadingRouteData && !loadingError)">
					<div class="loading-animation" style="float: left;margin-top: 11px;">
						<mt-spinner type="fading-circle"></mt-spinner>
					</div>
					<div class="loading-name" style="float: left">加载中...</div>
				</div>
				<div v-show="allLoaded && !loadingError && !$loadingRouteData">
					<span>已无更多</span>
				</div>
				<!-- 搜索出错重新加载 -->
				<div @click="loadingData" v-show="loadingError">
					<span>请重新加载...</span>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import { InfiniteScroll, Indicator, Spinner, CellSwipe, MessageBox } from 'mint-ui';
	import BoxSection from '../../../components/box-section/box-section.vue';
	import SmallTag from '../../../components/small-tag/small-tag.vue';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';
	import BidApplyStatus from '../../../filters/bid-apply-status/bid-apply-status-filter.js';

	export default {
		name: 'zeco-invite-me',
		data () {
			return {
				list: [],
				pageInfo: {
					lastPage: 1,
					currentPage: 1
				},
				loading: true,
				loadingError: false,
				token: ''
			};
		},
		computed: {
			allLoaded () {
				if (this.pageInfo.lastPage <= this.pageInfo.currentPage) {
					return true;
				} else {
					return false;
				}
			}
		},
		vuex: {
			getters: {
				userToken
			},
			actions: {
				goLogout
			}
		},
		route: {
			data (transition) {
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
		beforeDestroy () {
			Indicator.close();
		},
		methods: {
			loadMore () {
				this.loading = true;
				// 获取列表数据
				let page = 1;
				if (this.pageInfo.currentPage < this.pageInfo.lastPage) {
					page = this.pageInfo.currentPage + 1;
				} else {
					return false;
				}
				let options = {
					params: {
						page: page
					},
					headers: {
						Authorization: 'Bearer ' + this.token
					}
				};
				this.$http.get(apis.urls.bidInviteList, options).then((response) => {
					let listTpl = apis.pures.pureBidInviteList(response.body);
					this.list = this.list.concat(listTpl.items);
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
				}, (response) => {
					apis.errors.errorAllList(response, this);
					this.loadingError = true;
				});
			},
			loadingData (transition) {
				Indicator.open('加载中...');
				this.loading = true;
				// 获取列表数据
				let options = {
					params: {
						page: 1
					},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.bidInviteList, options).then((response) => {
					let listTpl = apis.pures.pureBidInviteList(response.body);
					this.list = listTpl.items;
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					Indicator.close();
					this.loading = false;
					this.loadingError = false;
					if (transition) {
						transition.next();
					}
				}, (response) => {
					apis.errors.errorAllList(response, this);
					Indicator.close();
					this.loadingError = true;
					if (transition) {
						transition.next();
					}
				});
			},
			inviteRespond (item, status) {
				// 获取列表数据
				let options = {
					params: {
						id: item.id,
						status: status
					},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.bidInviteRespond, options).then((response) => {
					this.list.$remove(item);
					MessageBox.alert('操作成功！');
					// 如果是同意，成功后跳转详情页面
					if (status === 1) {
						this.$route.router.go({name: 'Bid', params: {bid_no: item.bidId}});
					}
				}, (response) => {
					apis.errors.errorAllList(response, this);
				});
			},
			goPath (id) {
				this.$route.router.go({name: 'Bid', params: {bid_no: id}});
				return true;
			}
		},
		components: {
			[Spinner.name]: Spinner,
			[SmallTag.name]: SmallTag,
			[CellSwipe.name]: CellSwipe,
			[BoxSection.name]: BoxSection
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
		},
		filters: {
			[BidApplyStatus.name]: BidApplyStatus
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_var.scss';
	@import '../../../assets/sass/partials/_border.scss';

	// 修正列表项背景色和底部线
	.zeco-invite-me .invite-me-list{
		background-color: $color-white;
	}
	.zeco-invite-me ul>li .mint-cell{
		padding: 15px 0;
	}
		// 取消cell滑动边框
	.zeco-invite-me .mint-cell{
		&:after{
			border: 0;
		}
	}
	.zeco-invite-me .mint-cell .mint-cell-title{
		display: none;
	}
	.zeco-invite-me .mint-cell .mint-cell-value{
		width: 100%;
	}
	.zeco-invite-me .mint-cell-swipe-button{
		line-height: 118px;
	}

	// box-section中图片居中
	.zeco-invite-me .pic-avatar{
		position: relative;
		height: 88px;
		overflow: hidden;
	}
	.zeco-invite-me .pic-avatar img{
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.zeco-invite-me .box-section{
		width: 100%;
		line-height: 1.5;
	}
	.zeco-invite-me .zeco-box-option{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-invite-me .zeco-box-option .option-left{
		margin-top: 2px;
	}
	.zeco-invite-me .option-left{
		float: left;
		width: 60%;
		text-align: left;
	}
	.zeco-invite-me .option-right{
		float: right;
		width: 40%;
		text-align: right;
	}
	.zeco-invite-me .option-left>div, 
	.zeco-invite-me .option-left b, 
	.zeco-invite-me .option-left .address-detail{
		float: left;
		margin-top: 1px;
	}
	.zeco-invite-me .option-left, 
	.zeco-invite-me .option-right{
		display: inline-block;
	}
	.zeco-invite-me .icon-tag-bid{
		background-color: #fcc854;
		color: $bid-color;
	}
	.zeco-invite-me .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}
	.zeco-invite-me .option-addresses{
		max-width: 70%;
		padding-left: 5px;
	}
	.zeco-invite-me .address-detail{
		max-width: 90%;
	}
	.zeco-invite-me .option-status{
		padding: 3px;
		font-size: 0.9rem;
		color: $bid-color;
	}

	.zeco-invite-me .zeco-box-assistant{
		line-height: 1rem;
		vertical-align: sub;
	}
	.zeco-invite-me .zeco-box-assistant .option-left, 
	.zeco-invite-me .zeco-box-assistant .option-right{
		width: 50%;
	}
	.zeco-invite-me .zeco-box-assistant .option-left{
		margin-top: 1px;
	}
	.zeco-invite-me .assistant-time, 
	.zeco-invite-me .assistant-watch-number{
		font-size: 0.7rem;
		color: darken($color-grey, 15%);
		float: left;
	}
	.zeco-invite-me .assistant-time{
		width: 60%;
	}
	.zeco-invite-me .assistant-limit{
		font-size: 0.8rem;
		color: #ef7979;
	}

	.zeco-invite-me.assistant-watch-number{
		width: 40%;
	}
	.zeco-invite-me .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
		float: left;
		margin-top: 4px;
	}
	.zeco-invite-me .assistant-watch-number .watch-number{
		float: left;
		max-width: 70%; 
	}

	// 加载控件
	.zeco-invite-me .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-invite-me .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-invite-me .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-invite-me .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>