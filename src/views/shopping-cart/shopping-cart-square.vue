<template>
	<div class="shopping-cart-square" v-show="!deleted">
		<mt-cell-swipe
			:right="[
				{
					content: '删除',
					style: { background: '#c91425', color: '#fff' },
					handler: () => this.delete()
				}
			]"
		>
			<div class="shopping-cart-cell">
				<div class="order-topic cl-fx">
					<div class="choose-btn cl-fx">
						<img class="choose-img" v-if="detail.choose" src="../../assets/images/shopping-cart/choose.png">
						<img class="choose-img" v-else src="../../assets/images/shopping-cart/not-choose.png">
						<input class="choose-input" type="checkbox" v-model="detail.choose" value="detail.choose" @change="chooseService">
					</div>
					<div class="choose-context cl-fx">
						<div class="order-image-con">
							<img class="order-image" v-bind:src="detail.image">
						</div>
						<div class="detail-context cl-fx">
							<p class="title one-line">{{detail.name}}</p>
							<p class="text one-line" v-if="item.type === 1" v-for="item in detail.attributes">{{item.name}}：
								<span>{{item.value}}</span>
							</p>
							<p style="display: none;" class="text" v-if="item.type === 2" v-for="item in detail.attributes">
								{{item.name}}：
							</p>
							<div class="price-con cl-fx">
								<span class="price one-line">&#165;{{detail.price}}</span>
								<span class="num one-line">x{{detail.serviceNum}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</mt-cell-swipe>
		<div class="operate-row cl-fx">
			<span class="title">数量</span>
			<div class="choose-con cl-fx">
				<div class="service-detail-number">
					<number-choose v-model:value="detail.serviceNum" v-bind:min="0"></number-choose>
				</div>
			</div>
		</div>
		<div class="coupon-choose-con">
			<div class="coupon-row cl-fx" @click="openCoupon">
				<img class="right-arrow" src="../../assets/images/main/right-arrow.png">
				<span class="title one-line">优惠券</span>
				<span class="name one-line">
				已选择：{{couponDetail.name}}
				</span>
			</div>
			<div v-show="couponDetail.id !== ''" class="coupon-money-count cl-fx">
				<span class="coupon-reduce one-line">
					总计&nbsp;&#165;&nbsp;&nbsp;{{detail.price}}  优惠&nbsp;&#165;&nbsp;&nbsp;{{detail.reducePrice2}}
				</span>
				<span class="should-pay one-line">
					<span class="text">应付：</span>
					<span class="num"> &#165;{{detail.finalPrice2}}</span>
					<span class="unit">元</span>
				</span>
			</div>
		</div>
		<div class="coupon-modal">
			<mt-popup
			v-model="couponVisible"
			position="right"
			class="mint-popup-3"
			:modal="false">
				<choose-coupon
				:coupon-list="couponList"
				@save-coupon="handleCoupon"
				@close-coupon="couponVisible = false"></choose-coupon>
			</mt-popup>
		</div>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Button, Indicator, Popup, CellSwipe, MessageBox } from 'mint-ui';
	import NumberChoose from '../../components/number/number.vue';
	import ChooseCoupon from '../order/choose-coupon.vue';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'shopping-cart-square',
		data () {
			return {
				token: '',
				deleted: false,
				couponVisible: false,
				couponList: [],
				couponDetail: {
					id: '',
					name: '',
					reduce: 0,
					type: '',
					need: 0
				}  //  选好的优惠券
			};
		},
		props: {
			detail: {
				default: function () {
					return {
						id: '',
						image: '',
						name: '',
						price: '',
						serviceNum: '',
						attributes: [
						]
					};
				}
			}
		},
		created () {
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
		},
		methods: {
			goOrderDetail (id) {
				this.$router.push({name: 'OrderDetail', params: {order_no: id}});
			},
			goComment (id) {
				this.$router.push({name: 'Comment', params: {order_no: id}});
			},
			openCoupon () {
				this.couponVisible = true;
			},
			handleCoupon (val) {
				Indicator.open('加载中...');
				this.couponDetail = val;
				axios.get(apis.urls.coupon + '/' + this.couponDetail.id + '/price', {params: {sku_id: this.detail.sku_id}})
				.then((response) => {
					Indicator.close();
					this.detail.finalPrice2 = response.data.data.price.final_price;
					this.detail.reducePrice2 = response.data.data.price.reduce_price;
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			delete () {
				Indicator.open('删除中...');
				axios.delete(apis.urls.shoppingCart + '/' + this.detail.id)
				.then((response) => {
					Indicator.close();
					this.deleted = true;
					MessageBox.alert(response.data.data.message, '提示');
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			chooseService () {
				if (this.detail.choose) {
					this.$emit('choose-service', this.detail.id);
				} else {
					this.$emit('cancel-service', this.detail.id);
				}
			}
		},
		components: {
			[Button.name]: Button,
			[Popup.name]: Popup,
			NumberChoose,
			[Indicator.name]: Indicator,
			[ChooseCoupon.name]: ChooseCoupon,
			[CellSwipe.name]: CellSwipe,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.shopping-cart-square {
		width: 100%;
		background: $color-white;
		.order-title {
			height: 0.35rem;
			line-height: 0.35rem;
			background: $color-white;
			width: 100%;
			padding: 0 5%;
			font-size: $normal-text;
			.order-time {
				text-align: left;
				color: $color-text;
				width: 50%;
				height: 100%;
				display: block;
				float: left;
			}
			.order-status {
				text-align: right;
				color: $color-red;
				width: 50%;
				height: 100%;
				display: block;
				float: left;
			}
		}
		.order-topic {
			width: 100%;
			padding: 0.15rem 5% 0.1rem;
			.order-image-con {
				width: 40%;
				min-height: 0.9rem;
				display: block;
				float: left;
				.order-image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.bg-gray {
			background: $bg-gray;
		}
	}
	.shopping-cart-square .detail-context {
	    width: 60%;
    	float: left;
    	text-align: left;
    	padding-left: 0.1rem;
    	font-size: $normal-text;
    	.title {
			width: 100%;
			font-size: $page-title;
			color: $color-black;
    	}
    	.text {
    		width: 100%;
    		color: $color-context-title;
    		line-height: 0.2rem;
    	}
    	.price-con {
    		width: 100%;
    		height: 0.24rem;
    		line-height: 0.24rem;
    		.price {
    			width: 50%;
    			float: left;
    			color: $color-red;
    			font-size: $big-text;
    			display: block;
    		}
    		.num {
    			width: 50%;
    			float: left;
    			color: $color-text;
    			text-align: right;
    			display: block;
    		}
    	}
	}
	/* 优惠券弹窗 */
	.shopping-cart-square .mint-header {
		background: $color-red;
	}
	.shopping-cart-square .coupon-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 999;
	}
	.shopping-cart-square .coupon-choose-con span {
		height: 0.45rem;
		line-height: 0.45rem;
	}
	.shopping-cart-square {
		.coupon-choose-con {
			background: $color-white;
    		position: relative;
			.coupon-row {	
				width: 95%;
    			margin-left: 5%;
				position: relative;
				@include border-top($border-gray);
		    	height: 0.45rem;
    			line-height: 0.45rem;
    			.right-arrow {
				    position: absolute;
				    right: 0.05rem;
				    top: 0;
				    bottom: 0;
				    width: 0.07rem;
				    height: 0.12rem;
				    margin-top: auto;
				    margin-bottom: auto;
				}
				.title {
					color: $color-text;
					font-size: $order-title;
					width: 50%;
					display: block;
					float: left;
					text-align: left;
				}
				.name {
					color: $color-text;
					font-size: $normal-text;
					width: 50%;
					display: block;
					float: left;
					text-align: right;
					padding-right: 5%;
				}
			}
			.coupon-money-count {
				height: 0.45rem;
    			line-height: 0.45rem;
    			width: 100%;
    			padding: 0 5%;
    			@include border-top($border-gray);
				.coupon-reduce {
					width: 60%;
					display: block;
					float: left;
					text-align: left;
					color: $coupon-text;
				}
				.should-pay {
					width: 40%;
					display: block;
					float: left;
					text-align: right;
					color: $color-text;
					.text {

					}
					.num {
						color: $color-red;
						font-size: $page-title;
					}
					.unit {
						color: $color-red;
					}
				}
			}
		}
	}
	.shopping-cart-square .service-detail-number .k-number-panel {
		margin-left: 0.08rem;
		right: 5%;
	}
	.shopping-cart-square .operate-row {
	    height: auto;
    	line-height: 0.25rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    width: 95%;
	    margin-left: 5%;
	    padding: 0.1rem 0;
	    @include border-top($border-gray);
	    .title {
			font-size: $order-title;
	        min-width: 0.6rem;
			float: left;
			text-align: left;
		}
		 .choose-con {
			font-size: $normal-text;
			float: left;
	        -webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		    .choose-area {
		        min-width: 1rem;
		    	padding: 0 8% 0 0.1rem;
			    height: 0.24rem;
			    line-height: 0.24rem;
			    text-align: center;
			    color: #333;
			    border: 0.01rem solid $button-border-gray;
			    border-radius: 0.03rem;
			    float: left;
			    margin: 0 0 0.1rem 0.08rem;
			    background-image: url('../../assets/images/main/choose-icon.png');
			    background-repeat: no-repeat;
				background-size: 0.05rem 0.07rem;
		    	background-position: 96% 0.08rem;
			}
		}
		.choose-button {
			min-width: 0.65rem;
	    	padding: 0 0.1rem;
			height: 0.24rem;
			line-height: 0.24rem;
			text-align: center;
			color: $color-text;
			border: 0.01rem solid $border-gray;
			border-radius: 0.03rem;
		    float: left;
		    margin: 0 0 0.1rem 0.08rem;
		}
		.choose-button-active {
			background-image: url('../../assets/images/index/button-active.png');
		    background-repeat: no-repeat;
		    background-size: 0.09rem 0.09rem;
		    background-position: 100% 100%;
		    border: 0.01rem solid $color-context-active;
		    color: $color-context-active;
		}
	}
	.shopping-cart-square {
		.shopping-cart-cell {
			width: 100%;
		}
		.mint-cell-wrapper {
			padding: 0;
		}
		.mint-cell-value {
			width: 100%;
		}
		.mint-cell-title {
			width: 0 !important;
			height: 0 !important;
			-webkit-box-flex: none !important;
		    -ms-flex: none !important;
		    flex: none !important;
		}
		.mint-cell-swipe-buttongroup {
			position: relative;
			.mint-cell-swipe-button {
				line-height: 1.2rem;
				font-size: $page-title;
			}
		}
	}
	.shopping-cart-square .order-topic{
		width: 100%;
	    display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		.choose-context {
		    -webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		}
		.choose-btn {
			position: relative;
			width: 0.3rem;
			height: 100%;
			.choose-img {
				width: 0.2rem;
				height: 0.2rem;
				top: 0.35rem;
				float: left;
				left: 0;
				z-index: 9;
				position: absolute;
			}
			.choose-input {
				width: 0.2rem;
				height: 0.2rem;
				top: 0.35rem;
				float: left;
				left: 0;
				opacity: 0;
				z-index: 10;
				position: absolute;
			}
		}
	}
</style>
