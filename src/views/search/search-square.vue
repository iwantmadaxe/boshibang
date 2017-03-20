<template>
	<div class="service-square">
		<div class="service-topic cl-fx">
			<img class="service-image" v-bind:src="detail.image">
			<div class="detail-context cl-fx">
				<p class="title one-line">{{detail.name}}</p>
				<p class="text">
					{{detail.name}}
					{{detail.intro}}
				</p>
				<div class="price-con cl-fx">
					<span class="price one-line">&#165;{{detail.price}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Button } from 'mint-ui';

	export default {
		name: 'service-square',
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
			}
		},
		methods: {
			goOrderDetail (id) {
				this.$router.push({name: 'OrderDetail', params: {order_no: id}});
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

	.service-square {
		.service-title {
			height: 0.35rem;
			line-height: 0.35rem;
			background: $color-white;
			width: 100%;
			padding: 0 5%;
			font-size: $normal-text;
			.service-time {
				text-align: left;
				color: $color-text;
				width: 50%;
				height: 100%;
				display: block;
				float: left;
			}
			.service-status {
				text-align: right;
				color: $color-red;
				width: 50%;
				height: 100%;
				display: block;
				float: left;
			}
		}
		.service-topic {
			width: 100%;
			padding: 0.15rem 5% 0.1rem;
			.service-image {
				width: 40%;
				display: block;
				float: left;
			}
		}
		.bg-gray {
			background: $bg-gray;
		}
	}
	.service-square .detail-context {
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
	.service-square .service-price {
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
				color: $color-red;
				font-size: $big-text;
			}
		}
	}
	.service-square {
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
</style>
