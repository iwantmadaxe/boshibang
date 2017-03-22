<template>
	<div class="choose-coupon">
		<mt-header title="优惠券选择">
			<mt-button @click="backStep" icon="back" slot="left">返回</mt-button>
			<!-- <mt-button @click="" slot="right">保存</mt-button> -->
		</mt-header>
		<div class="coupon-list">
			<div @click="saveCoupon(item)" v-for="item in couponList">
				<coupon-square :item="item"></coupon-square>
			</div>
		</div>	
	</div>
</template>
<script>
	import { Header, Button } from 'mint-ui';
	import CouponSquare from '../../views/coupon/coupon-square.vue';

	export default {
		name: 'choose-coupon',
		data () {
			return {
				token: ''
			};
		},
		props: {
			couponList: {
				default: function () {
					return [];
				}
			}
		},
		created () {
		},
		methods: {
			close () {
				// 关闭弹出层，并清理数据
				this.$emit('close-coupon');
			},
			backStep () {
				this.close();
				return false;
			},
			saveCoupon (val) {
				console.log(val);
				this.close();
				this.$emit('save-coupon', val);
			}
		},
		components: {
			[Button.name]: Button,
			[Header.name]: Header,
			[CouponSquare.name]: CouponSquare
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';


</style>
