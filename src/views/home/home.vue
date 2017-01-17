<template>
	<div class="home">
		<header class="topheader" style="display: none;"></header>
		<div class="scwrapper">
			<!-- 滑动层 -->
			<mt-swipe :auto="3000">
				<mt-swipe-item class="slide1">
					<img src="../../assets/images/home/banner1.png" width="100%">
				</mt-swipe-item>
				<mt-swipe-item class="slide2">
					<img src="../../assets/images/home/banner2.png" width="100%">
				</mt-swipe-item>
			</mt-swipe>
			<!-- 按钮集合 -->
			<div class="choose-btns">
				<mt-tabbar :selected.sync="midSelected">
					<mt-tab-item id="招募" v-link="{ name: 'RecruitList'}">
						<img slot="icon" src="../../assets/images/home/zm.png">
						招募
					</mt-tab-item>
					<mt-tab-item id="招标" v-link="{ name: 'BidList'}">
						<img slot="icon" src="../../assets/images/home/zb.png">
						招标
					</mt-tab-item>
					<mt-tab-item id="找需求" v-link="{ name: 'DemondList'}">
						<img slot="icon" src="../../assets/images/home/xq.png">
						找需求
					</mt-tab-item>
					<mt-tab-item id="找供应" v-link="{ name: 'SupplyList'}">
						<img slot="icon" src="../../assets/images/home/gy.png">
						找供应
					</mt-tab-item>
				</mt-tabbar>
			</div>
			<!-- 信息栏目 -->
			<div class="info-list">
				<!-- 信息展示 -->
				<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
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
			<zeco-bottom-pannel tab-selected="home" :role="role"></zeco-bottom-pannel>
		</div>
		<div class="fixedtop">
			<search-bar :search-place="goSearch" :disabled="true">
				<img src="../../assets/images/home/logo-icon.png" slot="search-icon-logo" width="44">
				<img src="../../assets/images/home/search.png" slot="search-form-icon" width="20">
				<a v-link="{name: 'Login'}" slot="search-btn" v-if="!role">
					<span class="search-login-icon">登录</span>
				</a>
				<a v-link="{name: role}" slot="search-btn" v-else>
					<img src="../../assets/images/tab-bars/my.png" class="mine-icon">
				</a>
			</search-bar>	
		</div>
	</div>
</template>

<script>
	import { Swipe, SwipeItem, Tabbar, TabItem, InfiniteScroll, Spinner, Indicator } from 'mint-ui';
	import SmallTag from '../../components/small-tag/small-tag.vue';
	import SearchBar from '../../components/searchbar/searchbar.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import BottomPannel from '../share-template/bottom-pannel/bottom-pannel.vue';
	import apis from '../../api/index.js';
	import { readLocal } from '../../utils/localstorage.js';
	import { identityStatus } from '../../vuex/getters.js';

	export default {
		name: 'zeco-home',
		data () {
			return {
				midSelected: '',
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
			let _this = this;
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 修改banner图的高度
			let width = document.body.clientWidth;
			document.querySelector('.swipe').style.minHeight = `${Math.round(width / 1242 * 414)}px`;
			document.querySelector('.swipe-items-wrap').style.minHeight = `${Math.round(width / 1242 * 414)}px`;
			for (let nodeList of document.querySelectorAll('.swipe-item')) {
				nodeList.style.lineHeight = `${Math.round(width / 1242 * 414)}px`;
			}
			// 根据窗口变动，修改banner大小
			window.addEventListener('resize', _this.resizeSwipe);

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
			[Swipe.name]: Swipe,
			[Tabbar.name]: Tabbar,
			[Spinner.name]: Spinner,
			[TabItem.name]: TabItem,
			[SmallTag.name]: SmallTag,
			[Indicator.name]: Indicator,
			[SwipeItem.name]: SwipeItem,
			[SearchBar.name]: SearchBar,
			[BoxSection.name]: BoxSection,
			[BottomPannel.name]: BottomPannel
		},
		directives: {
			[InfiniteScroll.name]: InfiniteScroll
		},
		methods: {
			goSearch (e) {
				this.$route.router.go({name: 'Search'});
				return false;
			},
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
			resizeSwipe () {
				let width = document.body.clientWidth;
				document.querySelector('.swipe').style.minHeight = `${Math.round(width / 1242 * 414)}px`;
				document.querySelector('.swipe-items-wrap').style.minHeight = `${Math.round(width / 1242 * 414)}px`;
				document.querySelector('.swipe-item').style.lineHeight = `${Math.round(width / 1242 * 414)}px`;
				if (width >= 400) {
					for (let item of document.querySelectorAll('.home .address-detail')) {
						item.style.maxWidth = '100%';
					}
				} else {
					for (let item of document.querySelectorAll('.home .address-detail')) {
						item.style.maxWidth = '90%';
					}
				}
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
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.home .scwrapper{
		background-color: #e9ecf5;
	}
	.home .swipe {
		min-height: 6rem;
		color: $color-white;
		font-size: 30px;
		text-align: center;
	}
	.home .swipe-item {
		line-height: 6rem;
	}
	.home .slide1 img,
	.home .slide2 img{
		display: block;
	}
	.home .mint-tabbar{
		background-color: $color-white;
	}
	.home .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
	}
	.home .choose-btns{
		position: relative;
		height: 67px;
	}
	.home .info-list{
		margin-top: 10px;
		background-color: $color-white;
	}
	.home ul{
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.home ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.home .box-section img{
		width: 80px;
	}
	.home .zeco-box-option{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.home .zeco-box-option .option-left{
		margin-top: 2px;
	}
	.home .option-left{
		float: left;
		width: 60%;
		text-align: left;
	}
	.home .option-right{
		float: right;
		width: 40%;
		text-align: right;
	}
	.home .option-left>div,
	.home .option-left b,
	.home .option-left .address-detail{
		float: left;
		margin-top: 1px;
	}
	.home .option-left,
	.home .option-right{
		display: inline-block;
	}
	.home .icon-tag-bid{
		background-color: #fcc854;
		color: $bid-color;
	}
	.home .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}
	.home .option-addresses{
		max-width: 70%;
		padding-left: 5px;
	}
	.home .address-detail{
		max-width: 90%;
	}
	.home .option-money{
		padding: 3px;
		font-size: 0.9rem;
		color: $bid-color;
	}

	.home .zeco-box-assistant{
		line-height: 1rem;
		vertical-align: sub;
	}
	.home .zeco-box-assistant .option-left,
	.home .zeco-box-assistant .option-right{
		width: 50%;
	}
	.home .zeco-box-assistant .option-left{
		margin-top: 1px;
	}
	.home .assistant-time,
	.home .assistant-watch-number{
		font-size: 0.7rem;
		color: darken($color-grey, 15%);
		float: left;
	}
	.home .assistant-time{
		width: 60%;
		// width: 100%;
	}
	.home .assistant-watch-number{
		width: 40%;
	}
	.home .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
		float: left;
		margin-top: 4px;
	}
	.home .assistant-watch-number .watch-number{
		float: left;
		max-width: 70%; 
	}
	.home .assistant-limit{
		font-size: 0.8rem;
		color: #ef7979;
	}

	.home .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.home .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.home .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.home .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}
	
	.home .search-login-icon{
		font-size: 15px;
		display: inline-block;
	}
	.home .mine-icon{
		width: 60%;
		margin-top: 6px;
	}

	.home .search-form-input input:-moz-placeholder{
		color: #774c21;
	}
	.home .search-form-input input::-moz-placeholder{
		color: #774c21;
	}
	.home .search-form-input input:-ms-input-placeholder{
		color: #774c21;
	}
	.home .search-form-input input::-webkit-input-placeholder{
		color: #774c21;
	}
	.home .choose-btns .mint-tab-item-icon{
		width: 35px;
		height: 35px;
	}
	.home .choose-btns .mint-tab-item-label{
		font-size: 13px;
	}
</style>
