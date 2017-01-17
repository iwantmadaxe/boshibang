<template>
	<div class="supplier-apply-info">
		<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
			<li class="list-box-content" v-for="listItem in list">
				<box-section :head-title="listItem.companyName">
					<img :src="listItem.logo" slot="img" class="recruit-logo">
					<div class="manage-more" slot="more">
						<div class="manage-apply-base cl-fx">
							<div class="manage-left">
								<span class="base-title">申请人:</span>
								<span class="base-content">{{listItem.username}}</span>
							</div>
							<div class="manage-right">
								<b>[</b>
								<span class="base-address one-line">{{listItem.industry}}</span>
								<b>]</b>
							</div>
						</div>
						<div class="manage-apply-bars">
							<mt-button size="small" class="pass" @click="handlerApply(listItem, 2)">通过</mt-button>
							<mt-button size="small" type="primary" @click="handlerApply(listItem, 1)">拒绝</mt-button>
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
	</div>
</template>
<script>
	import BoxSection from '../../../components/box-section/box-section.vue';
	import { Button, InfiniteScroll, Spinner, MessageBox } from 'mint-ui';
	import apis from '../../../api';
	import { readLocal } from '../../../utils/localstorage.js';
	import { userToken } from '../../../vuex/getters.js';
	import { goLogout } from '../../../vuex/actions.js';

	export default {
		name: 'supplier-apply-info',
		data () {
			return {
				token: '',
				list: [],
				pageInfo: {
					lastPage: 1,
					currentPage: 1
				},
				loading: true,
				loadingError: false
			};
		},
		props: {
			lock: {
				default: ''
			}
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
		watch: {
			lock: function (val) {
				if (val === 'supplier-apply') {
					this.loading = false;
				} else {
					this.loading = true;
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
		compiled () {
			// 读取localStorage信息
			let userInfo = readLocal('user');
			// 获取token
			if (this.userToken) {
				this.token = this.userToken;
			} else if (userInfo !== false && userInfo.token) {
				this.token = userInfo.token;
			}
			this.loadingData();
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
					params: {page: page},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.providerList, options).then((response) => {
					let listTpl = apis.pures.pureDeveloperApplyList(response.body);
					this.list = this.list.concat(listTpl.items);
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
				}, (response) => {
					apis.errors.errorAllList(response, this);
					this.loadingError = true;
				});
			},
			loadingData () {
				this.loading = true;
				let options = {
					params: {page: 1},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				// 获取列表数据
				this.$http.get(apis.urls.providerList, options).then((response) => {
					let listTpl = apis.pures.pureDeveloperApplyList(response.body);
					this.list = listTpl.items;
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
					this.loadingError = false;
				}, (response) => {
					apis.errors.errorAllList(response, this);
					this.loadingError = true;
				});
			},
			handlerApply (apply, status) {
				let options = {
					params: {provider_id: apply.companyId, status: status},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				// 处理申请结果
				this.$http.get(apis.urls.providerManage, options).then((response) => {
					MessageBox.alert('处理成功！', '提示');
					this.list.$remove(apply);
				}, (response) => {
					apis.errors.errorAllList(response, this);
				});
			}
		},
		components: {
			[Button.name]: Button,
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
	
	.supplier-apply-info ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.supplier-apply-info .manage-apply-base,
	.supplier-apply-info .manage-apply-bars{
		margin-top: 5px;
		font-size: 0.9rem;
		color: darken($color-grey, 20%);
	}
	.supplier-apply-info .manage-apply-bars{
		text-align: right;
	}
	.supplier-apply-info .manage-apply-base .manage-left{
		float: left;
		text-align: left;
	}
	.supplier-apply-info .manage-apply-base .manage-right{
		float: right;
		text-align: right;
	}
	.supplier-apply-info .manage-apply-base .base-content{
		color: #666;
	}
	.supplier-apply-info .manage-apply-base .manage-right{
		max-width: 35%;
	}
	.supplier-apply-info .manage-apply-base .base-address{
		display: inline-block;
		vertical-align: middle;
		max-width: 73%;
	}
	.supplier-apply-info .mint-button.pass{
		color: $bid-color;
		background-color: $main-background-color;
	}

	// 加载控件
	.supplier-apply-info .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.supplier-apply-info .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.supplier-apply-info .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.supplier-apply-info .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>