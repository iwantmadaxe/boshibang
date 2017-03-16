<template>
	<div class="order-confirm">
		<div class="order-topic cl-fx">
			<img class="order-image" v-bind:src="detail.image">
			<div class="detail-context cl-fx">
				<p class="title one-line">{{detail.name}}</p>
				<p class="text one-line" v-if="item.type === 1" v-for="item in detail.attributes">{{item.name}}：<span v-if="item2.id === item.defaultValue" v-for="item2 in item.option">{{item2.name}}</span></p>
				<p class="text"  v-if="item.type === 2" v-for="item in detail.attributes">{{item.name}}：{{detail.regions}}</p>
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
				<span class="total-price-num">&#165;{{detail.price}}</span>
				<span class="total-price">元</span>
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
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { mapGetters } from 'vuex';
	import { Button, Popup, MessageBox, Toast } from 'mint-ui';
	import ChooseContact from './choose-contact.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'boss-order-confirm',
		data () {
			return {
				token: '',
				serviceId: '',
				contact_id: '',  //  联系人id
				contactVisible: false,
				defaultUser: {
					name: '',
					phone: '',
					area: {
						province: {
							name: ''
						},
						city: {
							name: ''
						},
						district: {
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
				axios.get(apis.urls.contactDefault)  //  默认联系人
				.then((response) => {
					if (response.data) {
						this.defaultUser = response.data.data;
						this.contact_id = response.data.data.id;
					}
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
					orderTpl.sku_id = _this.detail.sku_id;
					for (let item of _this.detail.attributes) {
						if (item.type === 2) {
							orderTpl.area = item.defaultValue;
						}
					}
					if (_this.contact_id) {
						orderTpl.contact_id = _this.contact_id;
					} else {
						MessageBox.alert('联系人不能为空！');
						return false;
					}
					orderTpl.amount = _this.detail.serviceNum;
					axios.post(apis.urls.order, orderTpl)
					.then((response) => {
						Toast({
							message: '购买成功！',
							iconClass: 'mintui mintui-success'
						});
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
			[Toast.name]: Toast
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
	.order-confirm .order-topic {
		width: 100%;
		padding: 0.1rem 5%;
		.order-image {
			width: 40%;
			display: block;
			float: left;
		}
	}
	.order-confirm .detail-context {
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
	.order-confirm .service-price {
		height: 0.45rem;
		line-height: 0.45rem;
		background: $color-white;
		@include border-top($border-gray);
		@include border-bottom($border-gray);
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
</style>
