<template>
	<div class="zeco-win-bid-record">
		<section class="win-bid-record-list">
			<ul>
				<li class="list-box-content" v-for="listItem in list" v-link="{name: 'Bid', params: {bid_no: listItem.id}}">
					<box-section :head-title="listItem.title" :sub-title="listItem.range">
						<img :src="listItem.logo" slot="img">
						<div class="bid-addition" slot="more">
							<span class="bid-title">发布日期:</span>
							<span class="bid-content">{{listItem.createdAt}}</span>
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
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';

	export default {
		name: 'zeco-win-bid-record',
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
				this.$http.get(apis.urls.winbidList, options).then((response) => {
					let listTpl = apis.pures.pureWinBidList(response.body);
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
				this.$http.get(apis.urls.winbidList, options).then((response) => {
					let listTpl = apis.pures.pureWinBidList(response.body);
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
	
	.zeco-win-bid-record .win-bid-record-list{
		background-color: $color-white;
	}
	.zeco-win-bid-record ul{
		@include border-bottom($border-color);
	}
	.zeco-win-bid-record ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-win-bid-record img{
		width: 80%;
	}

	.zeco-win-bid-record .bid-addition{
		margin-top: 3px;
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-win-bid-record .bid-addition .bid-content{
		color: #666;
	}

	// 加载控件
	.zeco-win-bid-record .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-win-bid-record .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-win-bid-record .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-win-bid-record .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>