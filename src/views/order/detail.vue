<template>
	<div class="order-detail">
		<div class="order-mine-list">
			<order-square :detail="detail"></order-square>
			<div class="contact-con cl-fx">
				<img class="check" src="../../assets/images/main/check.png">
				<div class="contact-detail cl-fx">
					<div class="contat-row cl-fx">
						<span class="username one-line">联系人：{{contactDetail.name}}</span>
						<span class="phone one-line">{{contactDetail.phone}}</span>
					</div>
					<div class="contat-row cl-fx">
						<p class="contact-address">
						联系地址：{{contactDetail.area.province.name}}{{contactDetail.area.city.name}}{{contactDetail.area.district.name}}
						</p>
					</div>
				</div>
			</div>
			<div class="other-service">
				<p class="other-service-title">您可能还需要以下服务</p>
				<div class="other-service-btn-con">
					<div class="other-service-btn">
						<mt-button size="small">商标查询</mt-button>
					</div>
					<div class="other-service-btn">
						<mt-button size="small">内资注册</mt-button>
					</div>
					<div class="other-service-btn">
						<mt-button size="small">商标变更</mt-button>
					</div>
					<div class="other-service-btn">
						<mt-button size="small">人事社保</mt-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { readLocal } from '../../utils/localstorage.js';
	import OrderSquare from './order-square.vue';
	import { Button, Indicator } from 'mint-ui';

	export default {
		name: 'order-detail',
		data () {
			return {
				token: '',
				orderNo: null,
				detail: {
					attributes: [
						{
							option: []
						}
					],
					status: {
						code: null
					}
				},
				contactDetail: {
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
					}
				}
			};
		},
		watch: {
			$route () {
				this.fetchData();
			}
		},
		created () {
			// 获取订单详情
			this.fetchData();
		},
		methods: {
			fetchData () {
				Indicator.open('加载中...');
				// 获取订单号
				this.orderNo = this.$route.params.order_no;
				if (this.orderNo) {
					// 获取订单详情
					this.token = 'bearer ' + readLocal('user').token;
					axios.defaults.headers.common['Authorization'] = this.token;
					axios.get(apis.urls.order + '/' + this.orderNo)
					.then((response) => {
						Indicator.close();
						if (response.data) {
							this.detail = apis.pures.pureOrder(response.data.data);
							this.getContactDetail(response.data.data.contact_id);
						}
					})
					.catch((error) => {
						Indicator.close();
						apis.errors.errorPublic(error.response, this);
					});
				}
			},
			getContactDetail (id) {
				axios.get(apis.urls.contact + '/' + id)
				.then((response) => {
					Indicator.close();
					if (response.data) {
						this.contactDetail = response.data.data;
					}
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[OrderSquare.name]: OrderSquare,
			[Button.name]: Button,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-detail {
		background: $color-white;
	}
	.order-detail .contact-con {
		background: $color-white;
		@include border-top($border-color);
		@include border-bottom($border-color);
		width: 95%;
		margin-left: 5%;
		position: relative;
		min-height: 0.4rem;
		.check {
			width: 0.2rem;
			height: 0.2rem;
			display: block;
			float: left;
			margin-top: 0.08rem;
			position: absolute;
			top: 0;
			bottom: 0;
			margin-top: auto;
			margin-bottom: auto;
			left: 0;
		}
		.contact-detail {
			margin-left: 0.2rem;
		    padding: 0.2rem 5% 0.2rem 0.1rem;
			line-height: 0.2rem;
			font-size: $square-title;
			color: $color-text;
			.contat-row {
				.username {
					text-align: left;
					width: 50%;
					display: block;
					float: left;
					height: 100%;
				}
				.phone {
					text-align: right;
					width: 50%;
					display: block;
					float: left;
					height: 100%;
				}
				.contact-address {
					text-align: left;
				}
			}
		}
	}
	.order-detail .other-service {
		background: $color-white;
		padding-bottom: 0.2rem;
		.other-service-title {
			font-size: $square-title;
			text-align: left;
    		padding: 0.15rem 5%;
    		color: $color-text;
		}
		.other-service-btn-con {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			.other-service-btn {
			    -webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				width: 25%;
				.mint-button {
					width: 0.7rem;
					margin: 0 auto;
					padding: 0;
					border-color: $btn-text-gray;
					background: $color-white;
					color: $btn-text-gray;
				}
			}
		}
	}
</style>
