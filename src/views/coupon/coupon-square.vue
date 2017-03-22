<template>
	<div class="coupon-square">
		<div v-if="item.type === 1" class="title">
			满减券
		</div>
		<div v-if="item.type === 2" class="title">
			折扣券
		</div>
		<div class="context">
			<div class="topic one-line">
				<span class="num">{{item.reduce}}</span>
				<span class="unit">元</span>
			</div>
			<div class="intro one-line">
				{{item.name}}
			</div>
			<div class="time one-line">
				有效期至：{{item.end_time}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'coupon-square',
		data () {
			return {
			};
		},
		props: {
			item: {
				default: function () {
					return {};
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.coupon-list .coupon-square {
		width: 90%;
		margin: 0.2rem auto 0;
		height: 0.96rem;
		display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    background: $color-white;
        box-shadow: -1px 1px 5px 2px #cac5c5;
	    &:first-child {
	    	margin: 0 auto;
	    }
	    &:last-child {
	    	margin: 0.2rem auto 0.2rem;
	    }
		.title {
			width: 0.8rem;
			background-image: url('../../assets/images/coupon/coupon-bg1.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			font-size: $page-title;
			color: $color-white;
			line-height: 0.96rem;
		}
		.context {
		    -webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
			background-image: url('../../assets/images/coupon/coupon-bg2.png');
			background-size: 0.05rem 100%;
			background-repeat: no-repeat;
			background-position: 100% center;
			text-align: left;
			padding: 0.1rem 0.2rem;
			.topic {
				.num {
					font-size: $coupon-topic;
					color: $color-black;
					font-weight: 400;
					font-family: 'Impact';
				}
				.unit {
					font-size: $page-title;
					color: $color-black;
				}
			}
			.intro {
				padding: 0.06rem 0;
				font-size: $square-title;
				color: $color-text;
				border-bottom: 0.01rem dashed $border-gray;
			}
			.time {
				font-size: $normal-text;
				color: $coupon-text;
				margin-top: 0.1rem;
			}
		}
	}
</style>
