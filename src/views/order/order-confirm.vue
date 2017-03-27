<template>
	<div class="order-confirm">
		<order-confirm-square v-for="item in detail" :detail="item"></order-confirm-square>
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
	import { Button, Popup, MessageBox, Toast, Indicator } from 'mint-ui';
	import ChooseContact from './choose-contact.vue';
	import BoxSection from '../../components/box-section/box-section.vue';
	import { readLocal } from '../../utils/localstorage.js';
	import OrderConfirmSquare from './order-confirm-square.vue';

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
				detail: [
					{
						attributes: [
							{
								option: []
							}
						]
					}
				]
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
			if (this.userOrder[0] === {} || this.userOrder[0].id === null || this.userOrder[0].id === undefined) {
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
					if (response.data.data.length !== 0) {
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
				if (_this.contact_id === '') {
					MessageBox.alert('联系人不能为空！', '提示');
					return false;
				}
				MessageBox.confirm('确认购买?')
				.then(function () {
					let orderTpl = {
						services: [],
						contact_id: parseInt(_this.contact_id)
					};
					_this.detail.map(function (item) {
						let servicesObj = {};
						servicesObj.sku_id = item.sku_id;
						servicesObj.amount = item.serviceNum;
						// orderTpl.sku_id = _this.detail[0].sku_id;
						for (let item2 of item.attributes) {
							if (item2.type === 2) {
								servicesObj.area = item2.defaultValue;
								// orderTpl.area = item2.defaultValue;
							}
						}
						// orderTpl.amount = _this.detail[0].serviceNum;
						orderTpl.services.push(servicesObj);
						return item;
					});
					console.log(222);
					axios.post(apis.urls.order, orderTpl)
					.then((response) => {
						Toast({
							message: '购买成功！',
							iconClass: 'mintui mintui-success'
						});
						_this.$router.push({name: 'OrderMine'});
						// if (_this.service_id.indexOf('-') > 0) {
						// 	_this.$router.push({name: 'ServiceDetail', params: {service_id: _this.serviceId}});
						// } else {
						// 	_this.$router.push({name: 'ServiceDetail', params: {service_id: _this.serviceId}});
						// }
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
			[Toast.name]: Toast,
			[OrderConfirmSquare.name]: OrderConfirmSquare,
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
