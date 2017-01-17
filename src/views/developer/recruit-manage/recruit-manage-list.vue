<template>
	<div class="zeco-recruit-manage-list">
		<section class="manage-list">
			<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li class="list-box-content" v-for="listItem in list" v-link="{name: 'RecruitManage', params: {recruit_no: listItem.id}}">
					<box-section :head-title="listItem.title">
						<img :src="listItem.logo" slot="img" class="recruit-logo">
						<div class="manage-more" slot="more">
							<div class="manage-enroll cl-fx">
								<div class="manage-left">
									<span class="enroll-title">报名数:</span>
									<span class="enroll-content">{{ listItem.number }}</span>
								</div>
								<div class="manage-right">
									<span class="enroll-status enroll-ing">{{ listItem.status | recruitApplyStatus }}</span>
								</div>
							</div>
							<div class="start-time">
								<span class="time-content">{{ listItem.createdAt }}</span>
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
	import RecruitApplyStatusFilter from '../../../filters/recruit-apply-status/recruit-apply-status-filter.js';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';

	export default {
		name: 'zeco-recruit-manage-list',
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
		components: {
			[Spinner.name]: Spinner,
			[BoxSection.name]: BoxSection
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
		},
		filters: {
			[RecruitApplyStatusFilter.name]: RecruitApplyStatusFilter
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
						status: 0,
						order: 1,
						page: page
					},
					headers: {
						Authorization: 'Bearer ' + this.token
					}
				};
				this.$http.get(apis.urls.recruit, options).then((response) => {
					let listTpl = apis.pures.pureDeveloperRecruitList(response.body);
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
					params: {status: 0, order: 1},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.recruit, options).then((response) => {
					let listTpl = apis.pures.pureDeveloperRecruitList(response.body);
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
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_var.scss';
	@import '../../../assets/sass/partials/_border.scss';

	.zeco-recruit-manage-list .manage-list{
		background-color: $color-white;
	}
	.zeco-recruit-manage-list ul{
		@include border-bottom($border-color);
	}
	.zeco-recruit-manage-list ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-recruit-manage-list .recruit-logo{
		width: 80%;
	}
	.zeco-recruit-manage-list .manage-more{
		color: darken($color-grey, 20%);
	}
	.zeco-recruit-manage-list .manage-more .manage-left{
		float: left;
		text-align: left;
	}
	.zeco-recruit-manage-list .manage-more .manage-right{
		float: right;
		text-align: right;
	}
	.zeco-recruit-manage-list .manage-enroll{
		font-size: 0.9rem;
		margin-top: 5px;
	}
	.zeco-recruit-manage-list .manage-enroll .enroll-content{
		color: #666;
	}
	.zeco-recruit-manage-list .enroll-ing{
		color: $bid-color;
	}
	.zeco-recruit-manage-list .start-time{
		font-size: 0.9rem;
		margin-top: 5px;
	}

	// 加载控件
	.zeco-recruit-manage-list .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-recruit-manage-list .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-recruit-manage-list .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-recruit-manage-list .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>