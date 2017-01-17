<template>
	<div class="zeco-project-notice">
		<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
			<li class="list-box-content" v-for="listItem in list">
				<box-section :head-title="listItem.title">
					<img :src="companyLogo" slot="img" width="100%">
					<div class="addition-info" slot="more">
						<div class="project-cate">
							<span class="cate-title">项目类型:</span>
							<span class="cate-content">{{listItem.type}}</span>
						</div>
						<div class="floor-area">
							<span class="floor-title">占地面积:</span>
							<span class="floor-content">{{listItem.area}}</span>
						</div>
						<div class="building-area">
							<span class="building-title">建筑面积:</span>
							<span class="building-content">{{listItem.area}}</span>
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
		name: 'zeco-project-notice',
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
				this.$http.get(apis.urls.companyLatestProject, {params: {id: this.companyId, page: page}}).then((response) => {
					let listTpl = apis.pures.pureCompanyLatestProject(response.body);
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
				this.$http.get(apis.urls.companyLatestProject, {params: {id: this.companyId, page: 1}}).then((response) => {
					let tpl = apis.pures.pureCompanyLatestProject(response.body);
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
	.zeco-project-notice .addition-info{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-project-notice ul{
		@include border-bottom($border-color);
	}
	.zeco-project-notice ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-project-notice .addition-info .cate-content,
	.zeco-project-notice .addition-info .building-content,
	.zeco-project-notice .addition-info .floor-content{
		color: #666;
	}

	.zeco-project-notice .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-project-notice .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-project-notice .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-project-notice .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>