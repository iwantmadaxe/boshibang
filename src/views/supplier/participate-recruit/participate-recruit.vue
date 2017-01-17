<template>
	<div class="zeco-participate-recruit">
		<section class="participate-list">
			<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li class="list-box-content" v-for="listItem in list" v-link="{name: 'Recruit', params: {recruit_no: listItem.recruitId}}">
					<box-section :head-title="listItem.title" :sub-title="listItem.companyName">
						<img slot="img" :src="listItem.logo">
						<div class="zeco-vote-info" slot="more">
							<div class="zeco-box-option cl-fx">
								<div class="option-left cl-fx">
									<div class="option-icon">
										<small-tag tag-name="招募" class="icon-tag-recruit"></small-tag>
									</div>
									<div class="option-addresses">
										<b>[</b>
										<span class="address-detail one-line">{{listItem.area}}</span>
										<b>]</b>
									</div>
								</div>
								<div class="option-right">
									<span class="option-money one-line">{{listItem.providerMoney}}</span>
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
	import { InfiniteScroll, Indicator, Spinner } from 'mint-ui';
	import BoxSection from '../../../components/box-section/box-section.vue';
	import SmallTag from '../../../components/small-tag/small-tag.vue';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';

	export default {
		name: 'zeco-participate-recruit',
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
				this.$http.get(apis.urls.myRecruit, options).then((response) => {
					let listTpl = apis.pures.pureMyRecruitList(response.body);
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
					params: {page: 1},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.myRecruit, options).then((response) => {
					let listTpl = apis.pures.pureMyRecruitList(response.body);
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
			}
		},
		components: {
			[Spinner.name]: Spinner,
			[SmallTag.name]: SmallTag,
			[BoxSection.name]: BoxSection
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_var.scss';
	@import '../../../assets/sass/partials/_border.scss';

	// 修正列表项背景色和底部线
	.zeco-participate-recruit .participate-list{
		background-color: $color-white;
	}
	.zeco-participate-recruit ul{
		@include border-bottom($border-color);
	}
	.zeco-participate-recruit ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-participate-recruit ul>li:last-child .box-section:before{
		border-bottom: 0;
	}

	.zeco-participate-recruit .box-section img{
		width: 80%;
	}
	.zeco-participate-recruit .zeco-box-option{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-participate-recruit .zeco-box-option .option-left{
		margin-top: 2px;
	}
	.zeco-participate-recruit .option-left{
		float: left;
		width: 60%;
		text-align: left;
	}
	.zeco-participate-recruit .option-right{
		float: right;
		width: 40%;
		text-align: right;
	}
	.zeco-participate-recruit .option-left>div, 
	.zeco-participate-recruit .option-left b, 
	.zeco-participate-recruit .option-left .address-detail{
		float: left;
		margin-top: 1px;
	}
	.zeco-participate-recruit .option-left, 
	.zeco-participate-recruit .option-right{
		display: inline-block;
	}
	.zeco-participate-recruit .icon-tag-bid{
		background-color: #fcc854;
		color: $bid-color;
	}
	.zeco-participate-recruit .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}
	.zeco-participate-recruit .option-addresses{
		max-width: 70%;
		padding-left: 5px;
	}
	.zeco-participate-recruit .address-detail{
		max-width: 90%;
	}
	.zeco-participate-recruit .option-money{
		padding: 3px;
		font-size: 0.9rem;
		color: $bid-color;
	}

	.zeco-participate-recruit .zeco-box-assistant{
		line-height: 1rem;
		vertical-align: sub;
	}
	.zeco-participate-recruit .zeco-box-assistant .option-left, 
	.zeco-participate-recruit .zeco-box-assistant .option-right{
		width: 50%;
	}
	.zeco-participate-recruit .zeco-box-assistant .option-left{
		margin-top: 1px;
	}
	.zeco-participate-recruit .assistant-time, 
	.zeco-participate-recruit .assistant-watch-number{
		font-size: 0.7rem;
		color: darken($color-grey, 15%);
		float: left;
	}
	.zeco-participate-recruit .assistant-time{
		width: 60%;
	}
	.zeco-participate-recruit .assistant-limit{
		font-size: 0.8rem;
		color: #ef7979;
	}

	.zeco-participate-recruit.assistant-watch-number{
		width: 40%;
	}
	.zeco-participate-recruit .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
		float: left;
		margin-top: 4px;
	}
	.zeco-participate-recruit .assistant-watch-number .watch-number{
		float: left;
		max-width: 70%; 
	}

	// 加载控件
	.zeco-participate-recruit .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-participate-recruit .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-participate-recruit .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-participate-recruit .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}	
</style>