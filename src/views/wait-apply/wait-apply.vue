<template>
	<div class="zeco-wait-apply">
		<!-- 信息栏目 -->
		<div class="info-list">
			<!-- 信息展示 -->
			<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<li class="list-box-content" v-for="(index, item) in list" @click="goDetail(item.indexName, item.id)">
					<box-section :head-title="item.title" :sub-title="item.companyName">
						<img slot="img" :src="item.companyLogo">
						<div class="zeco-vote-info" slot="more">
							<div class="zeco-box-option cl-fx">
								<div class="option-left cl-fx">
									<div class="option-icon">
										<small-tag tag-name="招募" class="icon-tag-recruit" v-if="item.indexName === 'recruit'"></small-tag>
										<small-tag tag-name="招标" class="icon-tag-bid" v-else></small-tag>
									</div>
									<div class="option-addresses">
										<b>[</b>
										<span class="address-detail one-line">{{ item.address }}</span>
										<b>]</b>
									</div>
								</div>
								<div class="option-right">
									<span class="option-money one-line">{{ item.companyMoney }}万已上</span>
								</div>
							</div>
							<div class="zeco-box-assistant cl-fx">
								<div class="option-left cl-fx">
									<span class="assistant-time one-line">{{ item.createdAt }}</span>
									<span class="assistant-watch-number cl-fx">
										<i class="icon-watch"></i>
										<span class="watch-number one-line">{{ item.view }}</span>
									</span>
								</div>
								<div class="option-right">
									<span class="assistant-limit">
										<span class="limit-name">截止:</span>
										<span class="limit-time">{{ item.deadline }}</span>
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
		</div>

		<!-- 底部栏 -->
		<zeco-bottom-pannel tab-selected="enroll" :role="role"></zeco-bottom-pannel>
	</div>
</template>
<script>
	import { InfiniteScroll, Spinner, Indicator } from 'mint-ui';
	import SmallTag from '../../components/small-tag/small-tag.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import BottomPannel from '../share-template/bottom-pannel/bottom-pannel.vue';
	import apis from '../../api/index.js';
	import { readLocal } from '../../utils/localstorage.js';
	import { identityStatus } from '../../vuex/getters.js';

	export default {
		name: 'zeco-wait-apply',
		data () {
			return {
				list: [],
				pageInfo: {
					lastPage: 1,
					currentPage: 1
				},
				loading: true,
				loadingError: false,
				role: ''
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
				identityStatus
			}
		},
		route: {
			data (transition) {
				this.loadingData(transition);
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 获取角色
			let userInfo = readLocal('user');
			if (this.identityStatus === 1 || userInfo.identityStatus === 1) {
				this.role = 'Developer';
			} else if (this.identityStatus === 2 || userInfo.identityStatus === 2) {
				this.role = 'Supplier';
			} else {
				this.role = '';
			}
		},
		beforeDestroy () {
			let _this = this;
			Indicator.close();
			window.removeEventListener('resize', _this.resizeSwipe);
		},
		components: {
			[Spinner.name]: Spinner,
			[SmallTag.name]: SmallTag,
			[Indicator.name]: Indicator,
			[BoxSection.name]: BoxSection,
			[BottomPannel.name]: BottomPannel
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
		},
		methods: {
			goDetail (path, id) {
				if (path === 'recruit') {
					this.$route.router.go({name: 'Recruit', params: {recruit_no: id}});
					return false;
				} else {
					this.$route.router.go({name: 'Bid', params: {bid_no: id}});
					return false;
				}
			},
			loadMore () {
				this.loading = true;
				// 获取列表数据
				let page = 1;
				if (this.pageInfo.currentPage < this.pageInfo.lastPage) {
					page = this.pageInfo.currentPage + 1;
				} else {
					return false;
				}
				this.$http.get(apis.urls.search, {params: {tag: 'all', page: page}}).then((response) => {
					let listTpl = apis.pures.pureAllList(response.body);
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
				this.$http.get(apis.urls.search, {params: {tag: 'all', page: 1}}).then((response) => {
					let listTpl = apis.pures.pureAllList(response.body);
					this.list = listTpl.items;
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					this.loading = false;
					this.loadingError = false;
					Indicator.close();
					if (transition) {
						transition.next();
					}
				}, (response) => {
					apis.errors.errorAllList(response, this);
					this.loadingError = true;
					Indicator.close();
					if (transition) {
						transition.next();
					}
				});
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	.zeco-wait-apply .info-list{
		background-color: $color-white;
	}
	.zeco-wait-apply ul{
		@include border-bottom($border-color);
	}
	.zeco-wait-apply ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.zeco-wait-apply .box-section img{
		width: 80px;
	}
	.zeco-wait-apply .zeco-box-option{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.zeco-wait-apply .zeco-box-option .option-left{
		margin-top: 2px;
	}
	.zeco-wait-apply .option-left{
		float: left;
		width: 60%;
		text-align: left;
	}
	.zeco-wait-apply .option-right{
		float: right;
		width: 40%;
		text-align: right;
	}
	.zeco-wait-apply .option-left>div,
	.zeco-wait-apply .option-left b,
	.zeco-wait-apply .option-left .address-detail{
		float: left;
		margin-top: 1px;
	}
	.zeco-wait-apply .option-left,
	.zeco-wait-apply .option-right{
		display: inline-block;
	}
	.zeco-wait-apply .icon-tag-bid{
		background-color: #fcc854;
		color: $bid-color;
	}
	.zeco-wait-apply .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}
	.zeco-wait-apply .option-addresses{
		max-width: 70%;
		padding-left: 5px;
	}
	.zeco-wait-apply .address-detail{
		max-width: 90%;
	}
	.zeco-wait-apply .option-money{
		padding: 3px;
		font-size: 0.9rem;
		color: $bid-color;
	}

	.zeco-wait-apply .zeco-box-assistant{
		line-height: 1rem;
		vertical-align: sub;
	}
	.zeco-wait-apply .zeco-box-assistant .option-left,
	.zeco-wait-apply .zeco-box-assistant .option-right{
		width: 50%;
	}
	.zeco-wait-apply .zeco-box-assistant .option-left{
		margin-top: 1px;
	}
	.zeco-wait-apply .assistant-time,
	.zeco-wait-apply .assistant-watch-number{
		font-size: 0.7rem;
		color: darken($color-grey, 15%);
		float: left;
	}
	.zeco-wait-apply .assistant-time{
		width: 60%;
		// width: 100%;
	}
	.zeco-wait-apply .assistant-watch-number{
		width: 40%;
	}
	.zeco-wait-apply .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
		float: left;
		margin-top: 4px;
	}
	.zeco-wait-apply .assistant-watch-number .watch-number{
		float: left;
		max-width: 70%; 
	}
	.zeco-wait-apply .assistant-limit{
		font-size: 0.8rem;
		color: #ef7979;
	}

	.zeco-wait-apply .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.zeco-wait-apply .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.zeco-wait-apply .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.zeco-wait-apply .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
</style>