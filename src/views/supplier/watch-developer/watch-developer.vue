<template>
	<div class="zeco-watch-developer">
		<section class="watch-developer-list">
			<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li v-for="listItem in list">
					<mt-cell-swipe :right="[{content: '取消关注',style: { background: 'red', color: '#fff' },handler: () => this.deleteAttention(listItem)}]">
						<box-section :head-title="listItem.companyName" @click="goPath(listItem.companyType, listItem.companyId)">
							<div class="pic-avatar" slot="img">
								<img :src="listItem.logo" class="recruit-logo">
							</div>
							<div class="manage-more" slot="more">
								<div class="manage-base cl-fx">
									<div class="manage-left">
										<span class="base-title">注册资本:</span>
										<span class="base-content one-line">{{listItem.companyMoney}}万以上</span>
									</div>
								</div>
								<div class="manage-ability">
									<span class="ability-content one-line">{{listItem.category}}</span>
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
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';
	
	export default {
		name: 'zeco-watch-developer',
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
				this.$http.get(apis.urls.attention, options).then((response) => {
					let listTpl = apis.pures.pureAttentionList(response.body);
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
				this.$http.get(apis.urls.attention, options).then((response) => {
					let listTpl = apis.pures.pureAttentionList(response.body);
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
			deleteAttention (item) {
				let options = {
					params: {
						attention: item.companyId
					},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.attentionUpdate, options).then((response) => {
					this.list.$remove(item);
					MessageBox.alert('取消成功！');
				}, (response) => {
					apis.errors.errorAllList(response, this);
				});
			},
			goPath (path, id) {
				if (path === 'provider') {
					this.$route.router.go({name: 'Supply', params: {supply_no: id}});
					return true;
				} else if (path === 'developer') {
					this.$route.router.go({name: 'Demond', params: {demond_no: id}});
					return true;
				}
			}
		},
		components: {
			[Spinner.name]: Spinner,
			[CellSwipe.name]: CellSwipe,
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
	
	.zeco-watch-developer .watch-developer-list{
		background-color: $color-white;
	}
	.zeco-watch-developer ul>li .mint-cell{
		padding: 15px 0;
	}

	// 取消cell滑动边框
	.zeco-watch-developer .mint-cell{
		&:after{
			border: 0;
		}
	}
	.zeco-watch-developer .mint-cell .mint-cell-title{
		display: none;
	}
	.zeco-watch-developer .mint-cell .mint-cell-value{
		width: 100%;
	}
	.zeco-watch-developer .mint-cell-swipe-button{
		line-height: 95px;
	}

	// box-section中图片居中
	.zeco-watch-developer .pic-avatar{
		position: relative;
		height: 65px;
		overflow: hidden;
	}
	.zeco-watch-developer .pic-avatar img{
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.zeco-watch-developer .manage-base,
	.zeco-watch-developer .manage-ability{
		margin-top: 5px;
		font-size: 0.9rem;
		color: darken($color-grey, 20%);
	}
	.zeco-watch-developer .manage-base .manage-left{
		float: left;
		text-align: left;
		max-width: 95%;
	}
	.zeco-watch-developer .box-section{
		width: 100%;
	}
	.zeco-watch-developer .manage-base .base-title{
		color: #666;
	}
	.zeco-watch-developer .manage-base .base-content{
		display: inline-block;
		vertical-align: middle;
		max-width: 65%;
		color: $bid-color;
	}
	.zeco-watch-developer .box-content .box-head{
		line-height: 1.5;
	}

	// 加载控件
	.zeco-watch-developer .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-watch-developer .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-watch-developer .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-watch-developer .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>