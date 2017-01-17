<template>
	<div class="zeco-recruit-notice">
		<ul class="recruit-notice-list" v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
			<li v-for="listItem in list">
				<div class="recruit-title-base cl-fx">
					<div class="base-left" v-link="{name: 'Recruit', params: {recruit_no: listItem.id}}">
						<h3 class="recruit-title">{{listItem.title}}</h3>
					</div>
					<div class="base-right">
						<b>[</b>
						<span class="recruit-address one-line">{{listItem.province}}</span>
						<b>]</b>
					</div>
				</div>
				<div class="recruit-info-detail cl-fx block-center-v">
					<div class="detail-left">
						<p class="detail-capital">
							<span class="capital-title">注册资本:</span>
							<span class="capital-content">{{listItem.providerMoney}}</span>
						</p>
						<p class="detail-publishment">
							<span class="publishment-title">发布日期:</span>
							<span class="publishment-content">{{listItem.updatedAt}}</span>
						</p>
						<p class="detail-limitation">
							<span class="limitation-title">截至日期:</span>
							<span class="limitation-content">{{listItem.deadline}}</span>
						</p>
					</div>
					<div class="detail-right">
						<mt-button size="small" type="primary" @click="upSign(listItem.id)">我要报名</mt-button>
					</div>
				</div>
			</li>
		</ul>
		<!-- 加载动画-->
		<div class="zeco-info-loading">
			<div class="zeco-loading-cover" v-show="!(allLoaded || loadingError)">
				<div class="loading-animation" style="float: left;margin-top: 11px;">
					<mt-spinner type="fading-circle"></mt-spinner>
				</div>
				<div class="loading-name" style="float: left">加载中...</div>
			</div>
			<div v-show="allLoaded && !loadingError">
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
	import { Button, InfiniteScroll, Spinner, MessageBox, Toast } from 'mint-ui';
	import apis from '../../api';
	import { goLogout } from '../../vuex/actions.js';

	export default {
		name: 'zeco-recruit-notice',
		data () {
			return {
				list: [],
				pageInfo: {
					currentPage: 1,
					lastPage: 1
				},
				loading: true,
				loadingError: false
			};
		},
		props: {
			companyId: {
				default: null
			},
			token: {
				default: ''
			},
			isLogin: {
				default: function () {
					return false;
				}
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
		vuex: {
			actions: {
				goLogout
			}
		},
		ready () {
			this.companyId = this.$route.params.demond_no;
			this.loadingData();    // 加载初始数据
		},
		components: {
			[Button.name]: Button,
			[Spinner.name]: Spinner
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
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
				this.$http.get(apis.urls.companyLatestRecruit, {params: {id: this.companyId, page: page}}).then((response) => {
					let listTpl = apis.pures.pureCompanyLatestRecruit(response.body);
					this.list = this.list.concat(listTpl.items);
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
				}, (response) => {
					apis.errors.errorCompanyLatestRecruit(response, this);
					this.loadingError = true;
				});
			},
			loadingData () {
				this.loading = true;
				// 获取列表数据
				this.$http.get(apis.urls.companyLatestRecruit, {params: {id: this.companyId, page: 1}}).then((response) => {
					let tpl = apis.pures.pureCompanyLatestRecruit(response.body);
					this.list = tpl.items;
					this.pageInfo.currentPage = tpl.currentPage;
					this.pageInfo.lastPage = tpl.lastPage;
					this.loading = false;
					this.loadingError = false;
				}, (response) => {
					apis.errors.errorCompanyLatestRecruit(response, this);
					this.loadingError = true;
				});
			},
			upSign (id) {
				let _this = this;
				// 未登录需要提示并让登录
				if (this.isLogin === false) {
					MessageBox.alert('请登录！', '提示').then(function () {
						// 返回登录页面
						_this.$route.router.go({name: 'Login'});
					});
					return false;
				}
				let options = {
					params: {recruit_id: id},
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.get(apis.urls.recruitApply, options).then((response) => {
					Toast({
						message: '报名成功',
						iconClass: 'mintui mintui-success',
						duration: 2000
					});
				}, (response) => {
					apis.errors.errorRecruitApply(response, this);
				});
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	// 招募标题
	.zeco-recruit-notice ul>li{
		margin: 0 10px;
		padding: 15px 0;
		@include border-bottom($border-color);
	}
	.zeco-recruit-notice .base-left{
		float: left;
		text-align: left;
		width: 70%;
	}
	.zeco-recruit-notice .base-right{
		float: right;
		text-align: right;
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
		width: 30%;
	}
	.zeco-recruit-notice .recruit-title{
		font-size: 0.9rem;
		word-break: break-all;
	}
	.zeco-recruit-notice .recruit-address{
		display: inline-block;
		vertical-align: middle;
		max-width: 80%;
	}

	// 招募信息
	.zeco-recruit-notice .recruit-info-detail{
		margin-top: 10px;
		font-size: 0.8rem;
	}
	.zeco-recruit-notice .detail-left{
		float: left;
		text-align: left;
		width: 70%;
	}
	.zeco-recruit-notice .detail-right{
		float: right;
		text-align: right;
		width: 30%;
	}
	.zeco-recruit-notice .detail-left>p:not(:last-child){
		padding-bottom: 5px;
	}
	.zeco-recruit-notice .detail-left .capital-title,
	.zeco-recruit-notice .detail-left .publishment-title,
	.zeco-recruit-notice .detail-left .limitation-title{
		color: darken($color-grey, 20%);
	}
	.zeco-recruit-notice .detail-left .capital-content{
		color: $bid-color;
	}

	.zeco-recruit-notice .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-recruit-notice .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-recruit-notice .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-recruit-notice .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>