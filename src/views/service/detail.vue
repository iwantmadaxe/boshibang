<template>
	<div class="service-detail">
		<img class="detail-img" v-bind:src="detail[0].image">
		<div class="service-detail-context cl-fx">
			<div class="service-mainbody">
				<div class="topic cl-fx">
					<p class="one-line title">{{detail[0].name}}</p>
					<p class="one-line price">
						<span class="price-title">服务价格：</span>
						<span class="price-num">&#165;{{detail[0].price}}</span>
						<span class="price-unit">元/件</span>
					</p>
					<p class="two-line exp">{{detail[0].introduction}}</p>
				</div>
				<div class="operate cl-fx">
					<div v-if="item.type === 2" class="operate-row cl-fx" v-for="item in detail[0].attributes">
						<span class="title">{{item.name}}：</span>
						<div
							class="choose-con cl-fx"
							readonly
							@click="changeAreaVisible">
							<div class="choose-area">
								{{item.defaultPath.province.name}}-
								{{item.defaultPath.city.name}}-
								{{item.defaultPath.district.name}}
							</div>
						</div>
						<k-area-picker
						class="operate-row cl-fx"
						v-model="areaVisible"
						:area-choose="item.defaultPath"
						@choose-area="chooseArea"
						></k-area-picker>
					</div>
					<div v-if="item.type === 1" class="operate-row cl-fx" v-for="(item, index) in detail[0].attributes">
						<span class="title">{{item.name}}：</span>
						<div class="choose-con cl-fx">
							<div
							v-for="item2 in item.option"
							@click="chooseService(item, item2.id)"
							class="choose-button"
							:class="{'choose-button-active': item2.id === item.defaultValue}"
							>{{item2.name}}</div>
						</div>
					</div>
					<div class="operate-row cl-fx">
						<span class="title">购买数量：</span>
						<div class="choose-con cl-fx">
							<div class="service-detail-number">
								<number-choose v-model:value="serviceNum" v-bind:min="0"></number-choose>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="service-navbar cl-fx">
				<mt-navbar class="page-part" v-model="selected">
					<mt-tab-item id="service-detail">
						<div class="border-navbar-right">服务详情</div>
					</mt-tab-item>
					<mt-tab-item id="shop-info">
						<div class="border-navbar-right">网点信息</div>
					</mt-tab-item>
					<mt-tab-item id="user-evaluate">
						<div class="border-navbar-right">用户评价</div>
					</mt-tab-item>
					<mt-tab-item id="service-maintain">
						<div>服务保障</div>
					</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected" swipeable style="margin-top: 0.12rem;">
					<mt-tab-container-item id="service-detail">
						<div class="item-detail nav-item-context">
							<img v-bind:src="detail[0].detail">
						</div>		
					</mt-tab-container-item>
					<mt-tab-container-item id="shop-info">
						<div class="item-shop-info nav-item-context">
							2
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="user-evaluate">
						<div class="item-user-evaluate nav-item-context">
							3
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="service-maintain">
						<div class="item-service-maintain nav-item-context">
							4
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<div class="fixedbottom">
			<div class="button-ask">
				<img class="ask-img" src="../../assets/images/main/ask.png">
				<span class="text">咨询</span>
			</div>
			<div class="button-join" @click="shoppingCartJoin">
				加入购物车
			</div>
			<div class="button-buy" @click="postOrder">
				立即购买
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import AreaPicker from '../../components/area-picker/area-picker.vue';
	import NumberChoose from '../../components/number/number.vue';
	import { Toast, MessageBox, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import { mapActions } from 'vuex';

	export default {
		name: 'boss-service-detail',
		data () {
			return {
				token: '',
				selected: 'service-detail',
				serviceId: '',
				serviceNum: 0,  //  购买数量
				detail: [
					{
						attributes: [
							{
								option: []
							}
						]
					}
				],
				areaVisible: false
			};
		},
		computed: {
			combineOption () {
				return this.detail[0].attributes
				.map(function (item) {
					return item.currentValue;
				});
			}
		},
		watch: {
			$route () {
				this.fetchData();
			}
		},
		created () {
			// 获取服务详情
			this.fetchData();
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			this.detail[0].reducePrice2 = '';  //  选择优惠券后的优惠
			this.detail[0].finalPrice2 = '';  //  选择优惠券后的价格
		},
		methods: {
			...mapActions([
				'changeUserOrder'
			]),
			fetchData () {
				// 获取服务id
				this.serviceId = this.$route.params.service_id;

				if (this.serviceId) {
					// 获取服务详情
					axios.get(apis.urls.service + '/' + this.serviceId)
					.then((response) => {
						this.detail = apis.pures.pureService(response.data.data);
						this.detail[0].status = {
							code: '',
							value: ''
						};
					})
					.catch((error) => {
						apis.errors.errorPublic(error.response, this);
					});
				}
			},
			changeAreaVisible () {
				if (this.areaVisible) {
					this.areaVisible = false;
				} else {
					this.areaVisible = true;
				}
			},
			chooseService (item, id) {
				item.currentValue = id;
				// 根据选项查询sku接口
				axios.get(apis.urls.service + '/' + this.serviceId + '/sku', {params: {selected_ids: this.combineOption}})
				.then((response) => {
					this.detail[0].sku_id = response.data.data.id;
					this.detail[0].price = response.data.data.price;
					item.defaultValue = id;
				})
				.catch((error) => {
					item.currentValue = item.defaultValue;
					apis.errors.errorPublic(error.response, this);
				});
			},
			chooseArea () {
				let area = arguments[0];
				this.detail[0].attributes = this.detail[0].attributes.map(function (item) {
					if (item.type === 2) {
						item.currentValue = area.district.code;
						item.defaultValue = area.district.code;
						item.defaultPath = area;
					}
					return item;
				});
			},
			postOrder () {
				let _this = this;
				// if (!_this.regions) {
				// 	MessageBox.alert('请选择服务地区！', '提示');
				// 	return false;
				// }
				if (!_this.serviceNum) {
					MessageBox.alert('购买数量不能为0！', '提示');
					return false;
				}
				// _this.detail[0].regions = _this.regions;
				_this.detail[0].serviceNum = _this.serviceNum;
				_this.detail[0].finalPrice = parseInt(_this.detail[0].serviceNum) * parseInt(_this.detail[0].price);
				_this.changeUserOrder(_this.detail);
				_this.$router.push({name: 'OrderConfirm', params: {service_id: _this.serviceId}});
			},
			shoppingCartJoin () {
				axios.post(apis.urls.shoppingCartJoin, {sku_id: this.detail[0].sku_id})
				.then((response) => {
					if (response.data) {
						MessageBox.alert(response.data.data.message, '提示');
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[Toast.name]: Toast,
			[MessageBox.name]: MessageBox,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[AreaPicker.name]: AreaPicker,
			NumberChoose
			// [Field.name]: Field,
			// [Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.service-detail {
		padding-bottom: 0.45rem;
		.detail-img {
			width: 100%;
			display: block;
		}
	}
	.service-detail .service-mainbody {
		background: $color-white;
	}
	.service-detail .mint-navbar {
		margin-bottom: 0.12rem;
		@include border-top($border-gray);
	}
	.service-detail .border-navbar-right {
		@include border-right($border-gray);
	}
	.service-detail .service-detail-context {
		text-align: left;
	}
	.service-detail .service-detail-context .topic {
	    margin-left: 5%;
	    width: 95%;
	    border-bottom: 0.01rem solid $border-gray;
	    padding-bottom: 0.12rem;
	    padding-right: 5%;
	}
	.service-detail .service-detail-context .topic .title {
	    font-size: $page-title;
	    color: $color-black;
	    margin-top: 0.2rem;
	}
	.service-detail .service-detail-context .topic .price {
	    margin-top: 0.12rem;
    	font-size: $normal-text;
	}
	.service-detail .price .price-title {
		color: $color-context-title;
	}
	.service-detail .price .price-num {
		color: $color-context-active;
		font-size: $price;
	}
	.service-detail .price .price-unit {
		color: $color-black;
	}
	.service-detail .exp {
		margin-top: 0.12rem;
	    line-height: 0.2rem;
	    color: $color-context-title;
	}
	.service-detail .operate {
		width: 100%;
	    padding: 0.1rem 0 0.1rem 5%;
	}
	.service-detail .operate .operate-row {
	    height: auto;
    	line-height: 0.25rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	}
	.service-detail .operate .operate-row .title {
		font-size: $normal-text;
        min-width: 0.6rem;
		float: left;
	}
	.service-detail .operate .operate-row .choose-con {
		font-size: $normal-text;
		float: left;
        -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.service-detail .operate .operate-row .choose-con .choose-area {
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
	.service-detail .operate .operate-row .choose-button {
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
	.service-detail .operate .operate-row .choose-button-active {
		background-image: url('../../assets/images/index/button-active.png');
	    background-repeat: no-repeat;
	    background-size: 0.09rem 0.09rem;
	    background-position: 100% 100%;
	    border: 0.01rem solid $color-context-active;
	    color: $color-context-active;
	}
	.service-detail .service-detail-number .k-number-panel {
		margin-left: 0.08rem;
		right: 5%;
	}
	.service-detail .fixedbottom {
		display: block;
		position: fixed;
		bottom: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
		height: 0.45rem;
    	background: #fff;
	}
	.service-detail .fixedbottom .button-ask {
		background: $bg-gray;
		color: $color-white;
		text-align:center;
		font-size: $page-title;
		height: 0.45rem;
		line-height: 0.45rem;
		width: 16%;
		float: left;
		.ask-img {
			width: 0.2rem;
			height: 0.2rem;
			display: block;
			margin: 0.05rem auto 0;
		}
		.text {
			display: block;
			margin: 0 auto;
			width: 100%;
			text-align: center;
			color: $color-text;
			font-size: $normal-text;
			height: 0.2rem;
			line-height: 0.2rem;
		}
	}
	.service-detail .fixedbottom .button-join {
		background: $color-yellow;
		color: $color-white;
		text-align:center;
		font-size: $big-text;
		height: 0.45rem;
		line-height: 0.45rem;
		width: 42%;
		float: left;
	}
	.service-detail .fixedbottom .button-buy {
		background: $color-red;
		color: $color-white;
		text-align:center;
		font-size: $big-text;
		height: 0.45rem;
		line-height: 0.45rem;
		width: 42%;
		float: left;
	}
	.service-detail .mint-navbar .mint-tab-item {
		padding: 12px 0;
	}
	.service-detail .mint-navbar .mint-tab-item.is-selected {
	    border-bottom: 0;
	    color: inherit;
	    margin-bottom: 0;
	    position: relative;
	}
	.service-detail .mint-navbar .mint-tab-item.is-selected:after {
       	margin: auto;
	    height: 3px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: $color-red;
	    width: 70%;
	    content: "";
	}
	.service-detail .nav-item-context {
		background: $color-white;
		padding-top: 0.15rem;
	}
	.service-detail .nav-item-context img {
		width: 100%;
		display: block;
	}
</style>
