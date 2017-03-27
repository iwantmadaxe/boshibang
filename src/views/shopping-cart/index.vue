<template>
	<div class="shopping-cart">
		<div class="shopping-cart-list-square" v-for="item in shoppingCartList">
			<shopping-cart-square
			:detail="item"
			@choose-service="chooseService"
			@cancel-service="cancelService"
			></shopping-cart-square>
		</div>
		<div class="fixedbottom">
			<div class="button-all">
				<img @click="cancelAllOption" v-if="chooseAll" class="choose-img" src="../../assets/images/shopping-cart/choose.png">
				<img @click="chooseAllOption" v-else class="choose-img" src="../../assets/images/shopping-cart/not-choose.png">
				<span class="choose-all">全选</span>
				<span class="choose-num">共{{chooseNum}}项服务</span>
			</div>
			<div class="button-order-confirm" @click="orderPost">
				立即结算
			</div>
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="shoppingcart"></boss-bottom-pannel>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import ShoppingCartSquare from './shopping-cart-square.vue';
	import { readLocal } from '../../utils/localstorage.js';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator, MessageBox } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { mapActions } from 'vuex';

	export default {
		name: 'shopping-cart',
		data () {
			return {
				token: '',
				shoppingCartList: [
				]
			};
		},
		computed: {
			chooseNum: {
				get: function () {
					let i = 0;
					this.shoppingCartList.map(function (item) {
						if (item.choose === true) {
							i = i + 1;
						}
						return item;
					});
					return i;
				},
				set: function (v) {
				}
			},
			chooseAll () {
				if (this.chooseNum === this.shoppingCartList.length) {
					return true;
				} else {
					return false;
				}
			}
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			// 获取购物车列表
			this.fetchData();
		},
		methods: {
			...mapActions([
				'changeUserOrder'
			]),
			fetchData () {
				Indicator.open('加载中...');
				axios.get(apis.urls.shoppingCartList)
				.then((response) => {
					if (response.data) {
						this.shoppingCartList = apis.pures.pureShoppingCartList(response.data.data);
					}
					Indicator.close();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			chooseService (id) {
				this.shoppingCartList = this.shoppingCartList.map(function (item) {
					if (item.id === id) {
						item.choose = true;
					}
					return item;
				});
			},
			cancelService (id) {
				this.shoppingCartList = this.shoppingCartList.map(function (item) {
					if (item.id === id) {
						item.choose = false;
					}
					return item;
				});
			},
			chooseAllOption () {
				this.shoppingCartList = this.shoppingCartList.map(function (item) {
					item.choose = true;
					return item;
				});
			},
			cancelAllOption () {
				this.shoppingCartList = this.shoppingCartList.map(function (item) {
					item.choose = false;
					return item;
				});
			},
			orderPost () {
				let _this = this;
				let serviceIdArray = [];
				_this.shoppingCartList.map(function (item) {
					if (item.serviceNum === 0) {
						MessageBox.alert('购买数量不能为0！', '提示');
						return false;
					}
					if (item.choose) {
						serviceIdArray.push(item.id);
					}
				});
				_this.changeUserOrder(_this.shoppingCartList);
				_this.$router.push({name: 'OrderConfirm', params: {service_id: serviceIdArray.join('-')}});
			}
		},
		components: {
			[ShoppingCartSquare.name]: ShoppingCartSquare,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Indicator.name]: Indicator,
			[BottomPannel.name]: BottomPannel,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.shopping-cart .shopping-cart-list-square {
		width: 100%;
	}
	.shopping-cart .fixedbottom {
		display: block;
		position: fixed;
		bottom: 0.55rem;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
		height: 0.45rem;
    	background: #fff;
	}
	.shopping-cart {
		padding-bottom: 1.2rem;
		.button-all {
		    width: 60%;
		    height: 100%;
		    float: left;
			.choose-img {
				width: 0.2rem;
				height: 0.2rem;
				margin-top: 0.13rem;
				display: block;
				margin-left: 0.2rem;
				float: left;
			}
			.choose-all {
				height: 0.45rem;
				line-height: 0.45rem;
				display: block;
				float: left;
				margin-left: 0.1rem;
				color: $color-text;
				font-size: $page-title;
			}
			.choose-num {
				height: 0.45rem;
				line-height: 0.45rem;
				display: block;
				float: left;
				margin-left: 0.3rem;
				color: $color-text;
				font-size: $normal-text;
			}
		}
		.button-order-confirm {
			width: 40%;
			float: left;
			background: $color-red;
			color: $color-white;
			height: 0.45rem;
			line-height: 0.45rem;
			text-align: center;
			font-size: $page-title;
		}
	}
</style>
