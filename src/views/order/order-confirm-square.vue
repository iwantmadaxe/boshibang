<template>
	<div class="order-confirm-square">
		<div class="order-square">
			<div class="order-title one-line" v-show="detail.status.code">
				<span class="order-time">下单时间：{{detail.orderTime}}</span>
				<span class="order-status">{{detail.status.value}}</span>
			</div>
			<div class="order-topic cl-fx" :class="{'bg-gray': detail.status.code}">
				<img class="order-image" v-bind:src="detail.image">
				<div class="detail-context cl-fx">
					<p class="title one-line">{{detail.name}}</p>
					<p class="text one-line" v-if="item.type === 1" v-for="item in detail.attributes">{{item.name}}：<span v-if="item2.id === item.defaultValue" v-for="item2 in item.option">{{item2.name}}</span></p>
					<p class="text"  v-if="item.type === 2" v-for="item in detail.attributes">
						{{item.name}}：
						{{item.defaultPath.province.name}}-
						{{item.defaultPath.city.name}}-
						{{item.defaultPath.district.name}}
					</p>
					<div class="price-con cl-fx">
						<span class="price one-line">&#165;{{detail.price}}</span>
						<span class="num one-line">x{{detail.serviceNum}}</span>
					</div>
				</div>
			</div>
			<div class="service-price cl-fx">
				<span class="num one-line">共{{detail.serviceNum}}项服务</span>
				<div class="total-price-con one-line">
					<span class="total-price">总价：</span>
					<span v-if="couponDetail.id === ''" class="price-red total-price-num">&#165;{{detail.finalPrice}}</span>
					<span v-else class="price-black total-price-num">&#165;{{detail.finalPrice}}</span>
					<span class="total-price">元</span>
				</div>
			</div>
			<div class="operate-operate-con cl-fx" v-show="detail.status.code">
				<div class="operate-btn-buy cl-fx" v-if="detail.status.code === 1">
					<mt-button size="small">立即支付</mt-button>
				</div>
				<div class="operate-btn-normal cl-fx" v-if="detail.status.code === 2">
					<mt-button size="small" @click="goComment(detail.id)">评论</mt-button>
				</div>
				<div class="operate-btn-normal cl-fx" v-if="detail.status.code === 2">
					<mt-button size="small" @click="goOrderDetail(detail.id)">查看凭证</mt-button>
				</div>
				<div class="operate-btn-normal cl-fx" v-if="detail.status.code === 3">
					<mt-button size="small" @click="goComment(detail.id)">评论</mt-button>
				</div>
				<div class="operate-btn-normal cl-fx" v-if="detail.status.code === 3">
					<mt-button size="small" @click="goOrderDetail(detail.id)">查看凭证</mt-button>
				</div>
				<div class="operate-btn-normal cl-fx" v-if="detail.status.code === 4">
					<mt-button size="small" @click="goOrderDetail(detail.id)">查看凭证</mt-button>
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
	import { Button, Indicator, Popup } from 'mint-ui';
	import ChooseCoupon from './choose-coupon.vue';

	export default {
		name: 'order-confirm-square',
		data () {
			return {
				couponDetail: {
					id: '',
					name: '',
					reduce: 0,
					type: '',
					need: 0
				},  //  选好的优惠券
				couponVisible: false,
				couponList: []
			};
		},
		props: {
			detail: {
				default: function () {
					return {
						finalPrice2: '',
						reducePrice2: '',
						attributes: [
							{
								option: []
							}
						]
					};
				}
			}
		},
		created () {
			this.getCouponList(this.detail.sku_id);
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
			getCouponList (id) {
				// 获取适合的优惠券列表
				axios.get(apis.urls.couponSuit, {params: {sku_id: id}})
				.then((response) => {
					this.couponList = response.data.data;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
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
			}
		},
		components: {
			[Button.name]: Button,
			[Indicator.name]: Indicator,
			[Popup.name]: Popup,
			[ChooseCoupon.name]: ChooseCoupon
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-confirm-square .coupon-choose-con span {
		height: 0.45rem;
		line-height: 0.45rem;
	}
	.order-confirm-square {
		.coupon-choose-con {
			background: $color-white;
    		position: relative;
			.coupon-row {	
				width: 100%;
    			padding: 0 5%;
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
					font-size: 0.13rem;
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
	.order-confirm-square .coupon-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 999;
	}
</style>
