<template>
	<div class="order-mine">
		<div class="order-mine-navbar cl-fx">
			<mt-navbar class="page-part" v-model="selected">
				<mt-tab-item id="order-notpay">
					<div class="border-navbar-right">未支付</div>
				</mt-tab-item>
				<mt-tab-item id="order-progessing">
					<div class="border-navbar-right">进行中</div>
				</mt-tab-item>
				<mt-tab-item id="order-wait">
					<div class="border-navbar-right">待评价</div>
				</mt-tab-item>
				<mt-tab-item id="order-complete">
					<div class="border-navbar-right">已完成</div>
				</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected" swipeable>
				<mt-tab-container-item id="order-notpay">
					<div class="item-order-notpay order-mine-nav-item-context">
						<div class="order-mine-list">
							<order-square v-if="item.status.code === 1" v-for="item in orderList" :detail="item">
							</order-square>
						</div>
					</div>		
				</mt-tab-container-item>
				<mt-tab-container-item id="order-progessing">
					<div class="item-order-progessing order-mine-nav-item-context">
						<div class="order-mine-list">
							<order-square v-if="item.status.code === 2" v-for="item in orderList" :detail="item"></order-square>
						</div>
					</div>		
				</mt-tab-container-item>
				<mt-tab-container-item id="order-wait">
					<div class="item-order-wait order-mine-nav-item-context">
						<div class="order-mine-list">
							<order-square v-if="item.status.code === 3" v-for="item in orderList" :detail="item"></order-square>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="order-complete">
					<div class="item-order-complete order-mine-nav-item-context">
						<div class="order-mine-list">
							<order-square v-if="item.status.code === 4" v-for="item in orderList" :detail="item"></order-square>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="enroll"></boss-bottom-pannel>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import OrderSquare from './order-square.vue';
	import { readLocal } from '../../utils/localstorage.js';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel.vue';

	export default {
		name: 'order-mine',
		data () {
			return {
				token: '',
				orderList: [
					{
						attributes: [
						],
						status: {
							code: null,
							value: null
						}
					}
				],
				selected: 'order-notpay'
			};
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取订单列表
			this.fetchData();
		},
		methods: {
			fetchData () {
				Indicator.open('加载中...');
				axios.get(apis.urls.orders)
				.then((response) => {
					if (response.data) {
						this.orderList = apis.pures.pureOrders(response.data.data);
					}
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[OrderSquare.name]: OrderSquare,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator,
			[BottomPannel.name]: BottomPannel
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-mine .mint-navbar .mint-tab-item {
		padding: 12px 0;
	}
	.order-mine .mint-navbar .mint-tab-item.is-selected {
	    border-bottom: 0;
	    color: inherit;
	    margin-bottom: 0;
	    position: relative;
	}
	.order-mine .mint-navbar .mint-tab-item.is-selected:after {
       	margin: auto;
	    height: 3px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: $color-red;
	    width: 70%;
	    content: "";
	}
	.order-mine .order-mine-nav-item-context .order-square {
		margin-top: 0.12rem;
	}
	.order-mine .order-mine-list {
		padding-bottom: 0.65rem;
	}
</style>
