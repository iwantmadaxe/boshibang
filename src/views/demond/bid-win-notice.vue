<template>
	<div class="zeco-bid-win-notice">
		<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
			<li class="list-box-content" v-for="(index, item) in list">
				<box-section :head-title="item.title">
					<img :src="companyLogo" slot="img" width="100%">
					<div class="addition-info" slot="more">
						<div class="bid-win-company">
							<span class="bid-title">中标单位:</span>
							<span class="bid-content">{{item.apply.companyName}}</span>
						</div>
						<div class="publishment-time">
							<span class="publishment-title">发布时间:</span>
							<span class="publishment-content">{{item.createdAt}}</span>
						</div>
					</div>
				</box-section>				
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
	import { InfiniteScroll, Spinner } from 'mint-ui';
	import apis from '../../api';
	import BoxSection from '../../components/box-section/box-section.vue';

	export default {
		name: 'zeco-bid-win-notice',
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
			companyLogo: {
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
		ready () {
			this.companyId = this.$route.params.demond_no;
			this.loadingData();    // 加载初始数据
		},
		components: {
			[Spinner.name]: Spinner,
			[BoxSection.name]: BoxSection
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
				this.$http.get(apis.urls.winMyBidList, {params: {id: this.companyId, page: page}}).then((response) => {
					let listTpl = apis.pures.pureWinBidList(response.body);
					this.list = this.list.concat(listTpl.items);
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
				}, (response) => {
					apis.errors.errorCompanyLatestBid(response, this);
					this.loadingError = true;
				});
			},
			loadingData () {
				this.loading = true;
				// 获取列表数据
				this.$http.get(apis.urls.winMyBidList, {params: {id: this.companyId, page: 1}}).then((response) => {
					let tpl = apis.pures.pureWinBidList(response.body);
					this.list = tpl.items;
					this.pageInfo.currentPage = tpl.currentPage;
					this.pageInfo.lastPage = tpl.lastPage;
					this.loading = false;
					this.loadingError = false;
				}, (response) => {
					apis.errors.errorCompanyLatestBid(response, this);
					this.loadingError = true;
				});
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	.zeco-bid-win-notice ul{
		@include border-bottom($border-color);
	}
	.zeco-bid-win-notice ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-bid-win-notice .addition-info{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-bid-win-notice .addition-info .bid-content,
	.zeco-bid-win-notice .addition-info .publishment-content{
		color: #666;
	}

	.zeco-bid-win-notice .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-bid-win-notice .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-bid-win-notice .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-bid-win-notice .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>