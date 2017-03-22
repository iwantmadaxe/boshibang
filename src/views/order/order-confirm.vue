<template>
	<div class="order-confirm">
		<order-square :detail="detail" :total-price="couponDetail.id ===''"></order-square>
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
		<div class="contact-con">
			<p class="title">联系方式</p>
			<div class="contact" @click="openContact">
				<k-box-section class="" :width="0">
					<div slot="more" class="address">
						<div class="address-heading cl-fx">
							<div class="address-name"><span>{{defaultUser.name}}</span></div>
							<div class="address-phone"><span>{{defaultUser.phone}}</span></div>
						</div>
						<div class="address-body">
							<i class="icon iconfont icon-location"></i>
							<span class="address-where">
								{{(defaultUser.area.province.name+defaultUser.area.city.name+defaultUser.area.district.name+defaultUser.address) || '暂无'}}
							</span>
						</div>
						<img class="right-arrow" src="../../assets/images/main/right-arrow.png">
					</div>
				</k-box-section>
			</div>
		</div>
		<div class="btn-order-confirm">
			<mt-button size="large" type="primary" @click="orderPost">提交订单</mt-button>
		</div>
		<div class="contact-modal">
			<mt-popup
			v-model="contactVisible"
			position="right"
			class="mint-popup-3"
			:modal="false">
				<choose-contact
				v-model="defaultUser"
				@save-contact="handleContact"
				@close-contact="contactVisible = false"></choose-contact>
			</mt-popup>
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
	import { mapGetters } from 'vuex';
	import { Button, Popup, MessageBox, Toast, Indicator } from 'mint-ui';
	import ChooseContact from './choose-contact.vue';
	import ChooseCoupon from './choose-coupon.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import { readLocal } from '../../utils/localstorage.js';
	import OrderSquare from './order-square.vue';

	export default {
		name: 'boss-order-confirm',
		data () {
			return {
				token: '',
				serviceId: '',
				contact_id: '',  //  联系人id
				contactVisible: false,
				couponVisible: false,
				couponList: [],
				couponDetail: {
					id: '',
					name: '',
					reduce: 0,
					type: '',
					need: 0
				},  //  选好的优惠券
				defaultUser: {
					name: '',
					phone: '',
					area: {
						province: {
							id: '',
							code: '',
							name: ''
						},
						city: {
							id: '',
							code: '',
							name: ''
						},
						district: {
							id: '',
							code: '',
							name: ''
						}
					},
					address: ''
				},
				detail: {
					attributes: [
						{
							option: []
						}
					]
				}
			};
		},
		computed: {
			// 使用对象展开运算符将 getters 混入 computed 对象中
			...mapGetters([
				'userOrder'
			])
		},
		created () {
			this.serviceId = this.$route.params.service_id;
			if (this.userOrder === {} || this.userOrder.id === null || this.userOrder.id === undefined) {
				this.$router.push({name: 'ServiceDetail', params: {service_id: this.serviceId}});
				return true;
			}
			// 获取订单详情
			this.fetchData();
		},
		methods: {
			fetchData () {
				this.token = 'bearer ' + readLocal('user').token;
				axios.defaults.headers.common['Authorization'] = this.token;
				this.detail = this.userOrder;
				this.getCouponList(this.detail.sku_id);
				axios.get(apis.urls.contactDefault)  //  默认联系人
				.then((response) => {
					if (response.data.data.length !== 0) {
						this.defaultUser = response.data.data;
						this.contact_id = response.data.data.id;
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
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
			orderPost () {
				let _this = this;
				MessageBox.confirm('确认购买?')
				.then(function () {
					let orderTpl = {};
					orderTpl.services = [];
					let services = {};
					services.sku_id = _this.detail.sku_id;
					services.amount = _this.detail.serviceNum;
					// orderTpl.sku_id = _this.detail.sku_id;
					for (let item of _this.detail.attributes) {
						if (item.type === 2) {
							services.area = item.defaultValue;
							// orderTpl.area = item.defaultValue;
						}
					}
					if (_this.contact_id) {
						orderTpl.contact_id = parseInt(_this.contact_id);
					} else {
						MessageBox.alert('联系人不能为空！');
						return false;
					}
					// orderTpl.amount = _this.detail.serviceNum;
					orderTpl.services.push(services);
					axios.post(apis.urls.order, orderTpl)
					.then((response) => {
						Toast({
							message: '购买成功！',
							iconClass: 'mintui mintui-success'
						});
						_this.$router.push({name: 'ServiceDetail', params: {service_id: _this.serviceId}});
					})
					.catch((error) => {
						apis.errors.errorPublic(error.response, this);
					});
				})
				.catch(() => {
				});
			},
			openContact () {
				this.contactVisible = true;
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
			handleContact (val) {
				if (val) {
					this.defaultUser = val;
					this.contact_id = val.id;
				}
			}
		},
		components: {
			[Popup.name]: Popup,
			[Button.name]: Button,
			[ChooseContact.name]: ChooseContact,
			[BoxSection.name]: BoxSection,
			[MessageBox.name]: MessageBox,
			[Toast.name]: Toast,
			[OrderSquare.name]: OrderSquare,
			[ChooseCoupon.name]: ChooseCoupon,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-confirm .mint-header {
		background: $color-red;
	}
	.order-confirm .btn-order-confirm .mint-button {
		color: $color-white;
	}
	.order-confirm .create-contact-people .mint-button {
		border: 1px solid $color-red;
		color: $color-red;
	}
	.order-confirm {
		.btn-order-confirm{
		    width: 90%;
    		margin: 20px auto;
			.mint-button {
				background: $color-red;
			}
		}
	}
	
	.order-confirm .contact-con {
		.title {
			font-size: $square-title;
			color: $color-context-title;
			width: 100%;
			line-height: 0.24rem;
			margin-top: 0.1rem;
			margin-bottom: 0.02rem;
			text-align: left;
			padding: 0 5%;
		}
		.contact {
			background: $color-white;
		}
	}
	.order-confirm .coupon-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 999;
	}
	.order-confirm .contact-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 999;
	}
	.order-confirm .address {
		position: relative;
		border-image: none;
	}
	.order-confirm .contact .right-arrow {
		position: absolute;
		right: 0.05rem;
		top: 0;
		bottom: 0;
		width: 0.07rem;
		height: 0.12rem;
		margin-top: auto;
		margin-bottom: auto;
	}
	.order-confirm .coupon-choose-con span {
		height: 0.45rem;
		line-height: 0.45rem;
	}
	.order-confirm {
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
</style>
