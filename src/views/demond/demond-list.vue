<template>
	<div class="demond-list-info">
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
					<li class="list-box-content" v-for="(index, item) in list" v-link="{ name: 'Demond', params: { demond_no: item.id }}">
						<box-section :head-title="item.companyName">
							<img slot="img" :src="item.companyLogo">
							<div class="zeco-vote-info" slot="more">
								<div class="zeco-box-assistant">
									<span class="project-title">项目信息:</span>
									<span class="project-content one-line">
										{{item.project}}
									</span>
								</div>
								<div class="zeco-box-option cl-fx">
									<div class="option-left">
										<div class="option-icon">
											<small-tag tag-name="招募" class="icon-tag-recruit"></small-tag>
										</div>
										<div class="option-number one-line">
											{{item.recruitNum}}项目
										</div>
									</div>
									<div class="option-right">
										<div class="option-icon">
											<small-tag tag-name="招标" class="icon-tag-bid"></small-tag>
										</div>
										<div class="option-number one-line">
											{{item.bidNum}}项目
										</div>
									</div>
								</div>
								<div class="address-info">
									<span class="demond-address-title">公司地址:</span>
									<span class="demond-address-detail one-line">{{item.address}}</span>
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
		name: 'zeco-demond',
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
			let nodeListWrap = document.querySelectorAll('.swipe-item');
			for (let tplA of nodeListWrap) {
				tplA.style.lineHeight = `${Math.round(width / 1242 * 414)}px`;
			}
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
					tag: 'developer',
					page: page,
					keyword: this.search,
					industry: this.industry
				};
				this.$http.get(apis.urls.search, {params: queryParams}).then((response) => {
					let listTpl = apis.pures.pureDemondList(response.body);
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
				this.$http.get(apis.urls.search, {params: {tag: 'developer', page: 1, keyword: this.search, industry: this.industry}}).then((response) => {
					let listTpl = apis.pures.pureDemondList(response.body);
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
					tag: 'developer',
					page: 1,
					keyword: this.searchTpl
				};
				Indicator.open('加载中...');
				this.loading = true;
				// 获取列表数据
				this.$http.get(apis.urls.search, {params: queryParams}).then((response) => {
					let listTpl = apis.pures.pureDemondList(response.body);
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
	.demond-list-info .scwrapper{
		background-color: #e9ecf5;
	}
	.demond-list-info .swipe {
		min-height: 6rem;
		color: $color-white;
		font-size: 30px;
		text-align: center;
	}
	.demond-list-info .swipe-item {
		line-height: 6rem;
	}
	.demond-list-info .slide1 img,
	.demond-list-info .slide2 img{
		display: block;
	}

	// 列表
	.demond-list-info .info-list{
		margin-top: 10px;
		background-color: $color-white;
	}
	.demond-list-info ul{
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.demond-list-info ul>li:not(:last-child){
		@include border-bottom($border-color);
	}
	.demond-list-info .box-section img{
		width: 80px;
	}
	
	// 项目信息
	.demond-list-info .zeco-box-assistant{
		font-size: 0.8rem;
		line-height: 1.5;
	}
	.demond-list-info .zeco-box-assistant .project-title{
		display: inline-block;
		max-width: 30%;
		vertical-align: middle;
	}
	.demond-list-info .zeco-box-assistant .project-content{
		display: inline-block;
		max-width: 70%;
		vertical-align: middle;
	}
	
	// 发布项目数目
	.demond-list-info .zeco-box-option{
		font-size: 0.8rem;
	}
	.demond-list-info .zeco-box-option .option-left{
		float: left;
		width: 50%;
		text-align: left;
	}
	.demond-list-info .zeco-box-option .option-right{
		float: right;
		width: 50%;
		text-align: right;
	}
	.demond-list-info .zeco-box-option .option-icon,
	.demond-list-info .zeco-box-option .option-number
	{
		display: inline-block;
		vertical-align: middle;
	}
	.demond-list-info .zeco-box-option .option-number{
		max-width: 60%
	}

	// 地址信息
	.demond-list-info .address-info{
		color: darken($color-grey, 20%);
		font-size: 0.8rem;
	}
	.demond-list-info .address-info .demond-address-title,
	.demond-list-info .address-info .demond-address-detail{
		display: inline-block;
		vertical-align: middle;
	}
	.demond-list-info .address-info .demond-address-detail{
		max-width: 70%;
	}
	
	// tag标签
	.demond-list-info .icon-tag-bid{
		background-color: #fcc854;
		color: $bid-color;
	}
	.demond-list-info .icon-tag-recruit{
		background-color: #0266bb;
		color: $color-white;
	}

	// 加载控件
	.demond-list-info .zeco-info-loading{
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.demond-list-info .zeco-loading-cover{
	    position: absolute;
	    left: 50%;
	    margin-left: -44.67px;
	}
	.demond-list-info .zeco-loading-cover .loading-animation{
		float: left;
	    margin-top: 11px;
	}
	.demond-list-info .zeco-loading-cover .loading-name{
		margin-left: 10px;
		float: left;
	}

	// 搜索框
	.demond-list-info .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
	}
	.demond-list-info .fixedtop .search-icon{
		display: none;
	}
	.demond-list-info .fixedtop .search-form{
		margin-left: 10px;
		padding-right: 80px;
	}
	.demond-list-info .fixedtop .search-form-input input{
		height: 100%;
	}
	.demond-list-info .fixedtop .search-btn{
		right: 10px;
	}
	.demond-list-info .fixedtop .search-btn-content{
		padding: 5px 10px;
		background-color: #0266bb;
		border-radius: 3px;
	}
</style>