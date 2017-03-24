<template>
	<div class="odin-order-list">
		<!-- 信息展示 -->
		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
			<li class="list-box-content" v-for="(item, index) in list">
				<router-link :to="{ name: 'OrderDetail', params: { order_no: item.id }}">
					<k-box-section :width="0" :head-title="item.code" :sub-title="item.hopeDate">
						<div class="order-addition" slot="more">
							<span>订单状态：{{ item.status }}</span>
							<span class="one-line">备注：{{ item.note }}</span>
						</div>
					</k-box-section>
				</router-link>
			</li>
		</ul>

		<!-- 加载动画-->
		<div class="odin-info-loading">
			<div class="odin-loading-cover" v-show="(!allLoaded && !loadingError) || (loading && !loadingError)">
				<div class="loading-animation" style="float: left;margin-top: 11px;">
					<mt-spinner type="fading-circle"></mt-spinner>
				</div>
				<div class="loading-name" style="float: left">加载中...</div>
			</div>
			<div v-show="allLoaded && !loadingError && !loading">
				<span>已无更多</span>
			</div>
			<!-- 搜索出错重新加载 -->
			<div @click="fetchData" v-show="loadingError">
				<span>请重新加载...</span>
			</div>
		</div>

		<!-- 底部栏 -->
		<odin-bottom-pannel tab-selected="enroll"></odin-bottom-pannel>	
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { InfiniteScroll, Spinner, Indicator } from 'mint-ui';
	import BoxSection from '../../components/box-section/box-section.vue';
	import BottomPannel from '../share-template/bottom-pannel.vue';

	export default {
		name: 'boss-order-list',
		data () {
			return {
				list: [],
				pageInfo: {
					lastPage: 1,
					currentPage: 1
				},
				loading: true,
				loadingError: false
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
		watch: {
			$route () {
				this.fetchData();
			}
		},
		created () {
			// 获取订单列表
			this.fetchData();
		},
		mounted () {
			// 修改body背景色
			document.body.style.backgroundColor = '#fff';
		},
		beforeDestroy () {
			Indicator.close();
		},
		methods: {
			fetchData () {
				// 获取订单列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.orders)
				.then((response) => {
					Indicator.close();
					this.list = response.data.data;
					this.pageInfo.lastPage = response.data.meta.pagination.total_pages;
					this.pageInfo.currentPage = response.data.meta.pagination.current_page;
					this.loading = false;
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
					this.loading = false;
					this.loadingError = true;
				});
			},
			loadMore () {
				this.loading = true;
				// 获取列表数据
				let page = 1;
				if (this.pageInfo.currentPage < this.pageInfo.lastPage) {
					page = this.pageInfo.currentPage + 1;
				} else {
					this.loading = false;
					return false;
				}
				let queryParams = {
					page: page
				};
				axios.get(apis.urls.orders, {params: queryParams})
				.then((response) => {
					this.list = this.list.concat(response.data.data);
					this.pageInfo.lastPage = response.data.meta.pagination.total_pages;
					this.pageInfo.currentPage = response.data.meta.pagination.current_page;
					this.loading = false;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
					this.loading = false;
					this.loadingError = true;
				});
			}
		},
		directives: {
			InfiniteScroll
		},
		components: {
			[Spinner.name]: Spinner,
			[BoxSection.name]: BoxSection,
			[BottomPannel.name]: BottomPannel
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.odin-order-list ul{
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.odin-order-list ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	// 加载控件
	.odin-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.odin-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.odin-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.odin-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}

	.odin-order-list .order-addition{
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		margin-top: 5px;
		&>span{
			flex: 1;
		}
	}
</style>
