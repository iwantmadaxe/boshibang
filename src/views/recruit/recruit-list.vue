<template>
	<div class="recruit-list-info">
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
			<!-- 信息栏目 -->
			<div class="info-list">
				<!-- 信息展示 -->
				<ul v-infinite-scroll="loadMore()" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-show="list.length">
					<li class="list-box-content" v-for="(index, item) in list" v-link="{ name: 'Recruit', params: { recruit_no: item.id }}">
						<box-section :head-title="item.title" :sub-title="item.range">
							<img slot="img" :src="item.companyLogo">
							<div class="zeco-vote-info" slot="more">
								<div class="zeco-box-option cl-fx">
									<div class="option-left cl-fx">
										<div class="option-icon">
											<small-tag tag-name="招募" class="icon-tag-recruit"></small-tag>
										</div>
										<div class="option-addresses">
											<b>[</b>
											<span class="address-detail one-line">{{item.address}}</span>
											<b>]</b>
										</div>
									</div>
									<div class="option-right">
										<span class="option-money one-line">{{item.companyMoney}}万已上</span>
									</div>
								</div>
								<div class="zeco-box-assistant cl-fx">
									<div class="option-left cl-fx">
										<span class="assistant-time one-line">{{item.createdAt}}</span>
										<span class="assistant-watch-number cl-fx">
											<i class="icon-watch"></i>
											<span class="watch-number one-line">{{item.view}}</span>
										</span>
									</div>
									<div class="option-right">
										<span class="assistant-limit">
											<span class="limit-name">截止:</span>
											<span class="limit-time">{{item.deadline}}</span>
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
		</div>
		<div class="fixedtop">
			<search-bar :search-name.sync="searchTpl">
				<img src="../../assets/images/home/logo-icon.png" slot="search-icon-logo" width="44">
				<img src="../../assets/images/home/search.png" slot="search-form-icon" width="20">
				<a @click="goSearch" slot="search-btn" class="search-btn-content">
					<span class="search-login-icon">搜索</span>
				</a>
			</search-bar>	
		</div>
	</div>
</template>
<script>
	import { Swipe, SwipeItem, InfiniteScroll, Spinner, Indicator } from 'mint-ui';
	import SmallTag from '../../components/small-tag/small-tag.vue';
	import SearchBar from '../../components/searchbar/searchbar.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import apis from '../../api/index.js';

	export default {
		name: 'zeco-recruit',
		data () {
			return {
				list: [],
				pageInfo: {
					lastPage: 1,
					currentPage: 1
				},
				loading: true,
				loadingError: false,
				search: '',
				searchTpl: '',
				industry: ''
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
		route: {
			data (transition) {
				this.search = this.$route.query.keyword;
				this.searchTpl = this.$route.query.keyword;
				this.industry = this.$route.query.industry;
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
			document.querySelector('.swipe-item').style.lineHeight = `${Math.round(width / 1242 * 414)}px`;
			// 根据窗口变动，修改banner大小
			window.addEventListener('resize', _this.resizeSwipe);
		},
		beforeDestroy () {
			let _this = this;
			Indicator.close();
			window.removeEventListener('resize', _this.resizeSwipe);
		},
		components: {
			[Swipe.name]: Swipe,
			[Spinner.name]: Spinner,
			[SmallTag.name]: SmallTag,
			[SwipeItem.name]: SwipeItem,
			[SearchBar.name]: SearchBar,
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
				let queryParams = {
					tag: 'recruit',
					page: page,
					keyword: this.search,
					industry: this.industry
				};
				this.$http.get(apis.urls.search, {params: queryParams}).then((response) => {
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
				this.$http.get(apis.urls.search, {params: {tag: 'recruit', page: 1, keyword: this.search, industry: this.industry}}).then((response) => {
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
			},
			goSearch () {
				let queryParams = {
					tag: 'recruit',
					page: 1,
					keyword: this.searchTpl
				};
				Indicator.open('加载中...');
				this.loading = true;
				// 获取列表数据
				this.$http.get(apis.urls.search, {params: queryParams}).then((response) => {
					let listTpl = apis.pures.pureAllList(response.body);
					this.list = listTpl.items;
					this.pageInfo.lastPage = listTpl.lastPage;
					this.pageInfo.currentPage = listTpl.currentPage;
					// 清空搜索情况
					this.search = this.searchTpl;
					this.industry = '';
					Indicator.close();
					this.loading = false;
					this.loadingError = false;
				}, (response) => {
					apis.errors.errorAllList(response, this);
					Indicator.close();
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
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	// 滑动banner
	.recruit-list-info .scwrapper{
		background-color: #e9ecf5;
	}
	.recruit-list-info .swipe {
		min-height: 6rem;
		color: $color-white;
		font-size: 30px;
		text-align: center;
	}
	.recruit-list-info .swipe-item {
		line-height: 6rem;
	}
	.recruit-list-info .slide1 img,
	.recruit-list-info .slide2 img{
		display: block;
	}

	// 列表
	.recruit-list-info .info-list{
		margin-top: 10px;
		background-color: $color-white;
	}
	.recruit-list-info ul{
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.recruit-list-info ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.recruit-list-info .box-section img{
		width: 80px;
	}
	.recruit-list-info .zeco-box-option{
		font-size: 0.8rem;
		color: darken($color-grey, 20%);
	}
	.recruit-list-info .zeco-box-option .option-left{
		margin-top: 2px;
	}
	.recruit-list-info .option-left{
		float: left;
		width: 60%;
		text-align: left;
	}
	.recruit-list-info .option-right{
		float: right;
		width: 40%;
		text-align: right;
	}
	.recruit-list-info .option-left>div,
	.recruit-list-info .option-left b,
	.recruit-list-info .option-left .address-detail{
		float: left;
		margin-top: 1px;
	}
	.recruit-list-info .option-left,
	.recruit-list-info .option-right{
		display: inline-block;
	}
	.recruit-list-info .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}
	.recruit-list-info .option-addresses{
		max-width: 70%;
		padding-left: 5px;
	}
	.recruit-list-info .address-detail{
		max-width: 90%;
	}
	.recruit-list-info .option-money{
		padding: 3px;
		font-size: 0.9rem;
		color: $bid-color;
	}
	.recruit-list-info .zeco-box-assistant{
		line-height: 1rem;
		vertical-align: sub;
	}
	.recruit-list-info .zeco-box-assistant .option-left,
	.recruit-list-info .zeco-box-assistant .option-right{
		width: 50%;
	}
	.recruit-list-info .zeco-box-assistant .option-left{
		margin-top: 1px;
	}
	.recruit-list-info .assistant-time,
	.recruit-list-info .assistant-watch-number{
		font-size: 0.7rem;
		color: darken($color-grey, 15%);
		float: left;
	}
	.recruit-list-info .assistant-time{
		width: 60%;
	}
	.recruit-list-info .assistant-watch-number{
		width: 40%;
	}
	.recruit-list-info .assistant-watch-number .icon-watch{
		width: 11px;
		height: 8px;
		display: inline-block;
		background: url('../../assets/images/home/watch.png') 0% 0% / 11px no-repeat;
		float: left;
		margin-top: 4px;
	}
	.recruit-list-info .assistant-watch-number .watch-number{
		float: left;
		max-width: 70%; 
	}
	.recruit-list-info .assistant-limit{
		font-size: 0.8rem;
		color: #ef7979;
	}

	// 加载控件
	.recruit-list-info .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.recruit-list-info .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.recruit-list-info .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.recruit-list-info .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}

	// 搜索框
	.recruit-list-info .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
	}
	.recruit-list-info .fixedtop .search-icon{
		display: none;
	}
	.recruit-list-info .fixedtop .search-form{
		margin-left: 10px;
		padding-right: 80px;
	}
	.recruit-list-info .fixedtop .search-form-input input{
		height: 100%;
	}
	.recruit-list-info .fixedtop .search-btn{
		right: 10px;
	}
	.recruit-list-info .fixedtop .search-btn-content{
		padding: 5px 10px;
		background-color: #0266bb;
		border-radius: 3px;
	}
</style>