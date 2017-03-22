<template>
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
				<span v-if="totalPrice === true" class="price-red total-price-num">&#165;{{detail.finalPrice}}</span>
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
</template>
<script>
	import { Button } from 'mint-ui';

	export default {
		name: 'order-square',
		data () {
			return {
			};
		},
		props: {
			detail: {
				default: function () {
					return {
						attributes: [
							{
								option: []
							}
						]
					};
				}
			},
			totalPrice: {
				default: true,
				type: Boolean
			}
		},
		methods: {
			goOrderDetail (id) {
				this.$router.push({name: 'OrderDetail', params: {order_no: id}});
			},
			goComment (id) {
				this.$router.push({name: 'Comment', params: {order_no: id}});
			}
		},
		components: {
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-square {
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
			.order-image {
				width: 40%;
				min-height: 0.9rem;
				display: block;
				float: left;
			}
		}
		.bg-gray {
			background: $bg-gray;
		}
	}
	.order-square .detail-context {
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
	.order-square .service-price {
		height: 0.45rem;
		line-height: 0.45rem;
		background: $color-white;
		@include border-top($border-gray);
		width: 100%;
		padding: 0 5%;
		.num {
			width: 50%;
			float: left;
			color: $color-text;
			text-align: left;
			display: block;
			font-size: $normal-text;
		}
		.total-price-con {
			width: 50%;
			float: left;
			display: block;
			text-align: right;
			.total-price {
				color: $color-text;
				font-size: $normal-text;
			}
			.total-price-num {
				font-size: $big-text;
			}
			.price-red {
				color: $color-red;
			}
			.price-black {
				color: $color-text;
			}
		}
	}
	.order-square {
		width: 100%;
		background: $color-white;
		.operate-operate-con {
			width: 95%;
			margin-left: 5%;
			min-height: 0.44rem;
			@include border-top($border-gray);
			padding: 0.1rem 2% 0.1rem 0;
			.mint-button {
				float: right;
	    		margin-right: 5%;	
			}
		}
	}
	.order-square .operate-btn-buy {
	    width: 0.8rem;
	    float: right;
	    margin-left: 0.1rem;
		.mint-button {
			width: 100%;
			height: 0.24rem;
			background-image: url('../../assets/images/order/buy-bg.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
	    	background-position: 0 0;
			.mint-button-text {
				font-size: $normal-text;
				color: $color-white;
			}
		}
	}
	.order-square .operate-btn-normal {
	    width: 0.8rem;
	    float: right;
	   	margin-left: 0.1rem;
		.mint-button {
			width: 100%;
			border-color: $btn-gray;
			background-color: $color-white;
			height: 0.24rem;
			.mint-button-text {
				color: $btn-gray;
				font-size: $normal-text;
			}
		}
	}
</style>
