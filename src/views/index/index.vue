<template>
	<div class="index">
		<!-- 头部搜索 -->
		<div class="fixedtop">
			<search-bar search-place="" :disabled="true">
<!-- 				<img src="../../assets/images/logo/logo.png" slot="search-icon-logo">
				<img src="../../assets/images/index/mag.png" slot="search-form-icon">
				<a v-link="{name: 'Login'}" slot="search-btn">
					<span class="search-login-icon">登录</span>
				</a> -->
			</search-bar>	
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="home"></boss-bottom-pannel>
		<div class="scwrapper">
			<div class="banner-con" v-bind:style="{ height: bannerHeight}">
				<mt-swipe :auto="2000">
					<mt-swipe-item>
						<img class="banner-img" src="../../assets/images/index/banner1.png">
					</mt-swipe-item>
					<mt-swipe-item>
						<img class="banner-img" src="../../assets/images/index/banner1.png">
					</mt-swipe-item>
					<mt-swipe-item>
						<img class="banner-img" src="../../assets/images/index/banner1.png">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="service-bg cl-fx">
				<p class="servie-title">{{categoryData.data.data.category[activeCate].name}}</p>
				<div class="service-con cl-fx">
					<div @click="goServiceDetail(item.id)" class="service-icon-square" v-for="item in categoryData.data.data.category[activeCate].child">
						<img v-bind:src="item.icon">
						<p>{{item.name}}</p>
					</div>
				</div>
				<div class="service-con cl-fx service-con-border" style="margin-top: 0.1rem;">
					<div class="service-topic-square-con cl-fx">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square1.png">
						</div>
						<div class="text">
							<p class="topic one-line">租赁服务</p>
							<p class="exp one-line">场地租赁 设备租赁</p>
						</div>
					</div>
					<div class="service-topic-square-con cl-fx">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square2.png">
						</div>
						<div class="text">
							<p class="topic one-line">税务服务</p>
							<p class="exp one-line">场地租赁 设备租赁</p>
						</div>
					</div>
					<div class="service-topic-square-con cl-fx">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square3.png">
						</div>
						<div class="text">
							<p class="topic one-line">成长期服务</p>
							<p class="exp one-line">场地租赁 设备租赁</p>
						</div>
					</div>
					<div class="service-topic-square-con cl-fx">
						<div class="rad service-topic-square">
							<img src="../../assets/images/index/service-square4.png">
						</div>
						<div class="text">
							<p class="topic one-line">资质认证</p>
							<p class="exp one-line">场地租赁 设备租赁</p>
						</div>
					</div>
				</div>
			</div>
<!-- 			<div class="package-select cl-fx service-con-border">
				<div class="package-topic cl-fx">
					<img class="topic-left-icon" src="../../assets/images/index/package-left.png">
					<span class="topic">精选套餐</span>
					<img class="topic-right-icon" src="../../assets/images/index/package-right.png">
				</div>
				<img class="package-index" src="../../assets/images/index/package-index.png">
			</div> -->
		</div>
	</div>
</template>

<script type="text/javascript">
	import SearchBar from '../../components/searchbar/searchbar.vue';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { Swipe, SwipeItem } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';

	export default {
		name: 'boss-index',
		data () {
			return {
				bannerHeight: '',
				categoryData: {
					data: {
						data: {
							category: [
								{
									child: []
								}
							]
						}
					}
				},  //  服务类别
				activeCate: 0  //  初始状态的服务
			};
		},
		created () {
			let _this = this;
			// document.background.color = '#e9ecf5';
			_this.bannerHeight = document.body.clientWidth / 640 * 330 + 'px';
			let serviceCategoryCache = readLocal('serviceCategory');
			if (serviceCategoryCache) {
				_this.categoryData = serviceCategoryCache;
			} else {
				axios.get(apis.urls.category).then((response) => {
					_this.categoryData = response;
					saveLocal('serviceCategory', _this.categoryData);
				}, (response) => {
					apis.errors(response, _this);
					return false;
				});
			}
		},
		methods: {
			goServiceDetail (id) {
				this.$router.push({name: 'ServiceList', params: {category_no: id}});
			}
		},
		components: {
			SearchBar,
			[BottomPannel.name]: BottomPannel,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.index {
		padding-bottom: 0.55rem;
	}
	.index .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
	}
	.index .user-top-nav-shadow {
	    height: 0.46rem;
	    width: 100%;
	    position: absolute;
	    top: 0;
	    background-color: #333;
	    opacity: 0.5;
	}
	.index .user-top-nav .index-search {
	    width: 0.65rem;
	    height: 0.2rem;
	    line-height: 0.2rem;
	    float: right;
	    background: #000;
	    border-radius: 0.2rem;
	    margin: 0.13rem 5% 0 0;
	    text-align: right;
	    padding-right: 0.12rem;
	    background-image: url('../../assets/images/index/mag.png');
	    background-size: 12px 12px;
	    background-repeat: no-repeat;
	    background-position: 8px 4px;
	    color: #fff;
	}
	.index .user-top-nav {
	    height: 0.46rem;
	    width: 100%;
	    position: absolute;
	    top: 0;
	}
	.index .user-top-nav .user-info-con {
		width: 2rem;
	    margin-left: 5%;
	    height: 100%;
	    padding: 0.05rem 0;
	    float: left;
	}
	.index .user-top-nav .user-info-con .user-head {
	    position: relative;
	    width: 0.36rem;
	    height: 0.36rem;
	    float: left;
	}
	.index .user-head img {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    display: block;
	}
	.index .user-info-con .user-info {
		float: left;
	    width: 1rem;
	    margin: 0 0 0 0.1rem;
	}
	.index .user-info-con .user-info .user-info-row {
	    height: 0.18rem;
	    line-height: 0.18rem;
	}
	.index .user-info-row .username {
		color: #fff;
	    font-size: $normal-text;
		display: block;
	    float: left;
	}
	.index .user-info-row .level {
	    padding: 0.01rem 0.04rem;
		line-height: 1;
		border-radius: 2px;
		text-align: center;
		color: $color-white;
		font-size: $normal-text;
		background-color: $color-red;
	    margin-left: 0.1rem;
	    margin-top: 0.01rem;
	}
	.index .user-info-row .star {
		width: 0.1rem;
	    display: block;
	    float: left;
	    margin: 0.04rem 0.05rem 0 0;
	}
	.index .banner-con {
		background: #fff;
	    position: relative;
	    height: 1.6rem;
	}
	.index .banner-con .banner-img {
		width: 100%;
		height: 100%;
		display: block;
	}
	.index .servie-title {
	    height: 0.2rem;
	    width: 100%;
	    font-size: $page-title;
	    color: #333;
	    text-align: left;
	    margin: 0.25rem 0 0.05rem;
	    line-height: 0.2rem;
	    padding: 0 5%;
	}
	.index .service-con {
		
	}
	.index .service-bg {
		background: #fff;
	}
	.index .service-con-border {
	    border-top: 0.01rem solid #edefef;
	    border-bottom: 0.01rem solid #edefef;
	}
	.index .service-con .service-icon-square {
	    width: 25%;
	    float: left;
	    padding-top: 0.1rem;
	    padding-bottom: 0.1rem;
	}
	.index .service-con .service-icon-square img {
		display: block;
	    margin: 0 auto;
	    width: 0.22rem;
	}
	.index .service-con .service-icon-square p {
	    width: 100%;
	    font-size: $square-title;
	    color: #333;
	    text-align: center;
	    margin-top: 0.1rem;
	}
	.index .service-con .service-topic-square-con{
		width: 50%;
	    float: left;
	    padding: 0.1rem 0;
	}
	.index .service-con .service-topic-square-con .service-topic-square{
		width: 40px;
	    float: left;
	    margin: 0 4% 0 6%;
	    display: block;
	    position: relative;
	    height: 40px;
	}
	.index .service-topic-square-con img {
	    width: 40px;
	    height: 40px;
	    display: block;
	}
	.index .service-topic-square-con .text {
	    width: 65%;
	    float: left;
	}
	.index .service-topic-square-con .text .topic {
	    font-size: $square-title;
	    color: #111;
	    text-align: left;
	}
	.index .service-topic-square-con .text .exp {
	    font-size: $normal-text;
	    color: #646464;
	    text-align: left;
	    margin-top: 0.05rem;
	}
	.index .package-select {
	    width: 100%;
	    padding: 0.1rem 0 0;
	    margin: 0.1rem 0 0.2rem;
	    background: #fff;
	}
	.index .package-select .package-topic {
	    width: 1.2rem;
	    margin: 0.05rem auto;
	    position: relative;
	}
	.index .package-select .topic-left-icon {
		display: block;
	    left: 0;
	    width: 0.17rem;
	    top: 0.08rem;
	    position: absolute;
	}
	.index .package-select .topic-right-icon {
	    width: 0.17rem;
	    display: block;
	    right: 0;
	    top: 0.08rem;
	    position: absolute;
	}
	.index .package-select .topic {
	    display: block;
	    width: 100%;
	    height: 0.2rem;
	    line-height: 0.2rem;
	    font-size: $page-title;
	    color: #5a5a5a;
	}
	.index .package-select .package-index {
	    display: block;
	    width: 90%;
	    margin: 0.2rem auto;
	}
</style>
