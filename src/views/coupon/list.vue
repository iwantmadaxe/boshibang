<template>
	<div class="coupon-list">
		<div class="top-nav">
			<mt-navbar class="page-part" v-model="selected">
				<mt-tab-item id="coupon-use">
					<div class="border-navbar-right">可以使用</div>
				</mt-tab-item>
				<mt-tab-item id="coupon-over">
					<div class="border-navbar-right">已过期</div>
				</mt-tab-item>
			</mt-navbar>
		</div>
		<div class="coupon-context">
			<mt-tab-container v-model="selected" swipeable style="margin-top: 0.12rem;">
				<mt-tab-container-item id="coupon-use">
					<div class="item-detail nav-item-context">
						<coupon-square v-for="item in list" :item="item"></coupon-square>
					</div>		
				</mt-tab-container-item>
				<mt-tab-container-item id="coupon-over">
					<div class="item-shop-info nav-item-context">
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import CouponSquare from '../../views/coupon/coupon-square.vue';

	export default {
		name: 'coupon-list',
		data () {
			return {
				token: '',
				selected: 'coupon-use',
				list: []
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取优惠券列表
			this.fetchData();
		},
		beforeDestroy () {
			// Indicator.close();
		},
		methods: {
			fetchData () {
				// 获取优惠券列表
				Indicator.open('加载中...');
				this.loading = true;
				axios.get(apis.urls.couponSuit, {params: {sku_id: 1}})
				.then((response) => {
					Indicator.close();
					this.list = response.data.data;
					// this.pageInfo.lastPage = response.data.meta.pagination.total_pages;
					// this.pageInfo.currentPage = response.data.meta.pagination.current_page;
					// this.loading = false;
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
					// this.loading = false;
					// this.loadingError = true;
				});
			}
		},
		directives: {
			// InfiniteScroll
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator,
			[CouponSquare.name]: CouponSquare
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.coupon-list {
	}
	.coupon-list .mint-navbar .mint-tab-item {
		padding: 12px 0;
	}
	.coupon-list .mint-navbar .mint-tab-item.is-selected {
	    border-bottom: 0;
	    color: inherit;
	    margin-bottom: 0;
	    position: relative;
	}
	.coupon-list .mint-navbar .mint-tab-item.is-selected:after {
       	margin: auto;
	    height: 3px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: $color-red;
	    width: 0.7rem;
	    content: "";
	}
</style>
