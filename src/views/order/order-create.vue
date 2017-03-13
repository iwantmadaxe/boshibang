<template>
	<div class="order-create">
		<div class="custom-address" @click="openContact">
			<k-box-section class="address" :width="0">
				<div slot="more">
					<div class="address-heading cl-fx">
						<div class="address-name"><span>{{defaultUser.name}}</span></div>
						<div class="address-phone"><span>{{defaultUser.phone}}</span></div>
					</div>
					<div class="address-body">
						<i class="icon iconfont icon-location"></i>
						<span class="address-where">
							{{(defaultUser.province_name+defaultUser.city_name+defaultUser.district_name+defaultUser.address) || '暂无'}}
						</span>
					</div>
					<i class="mint-cell-allow-right"></i>
				</div>
			</k-box-section>
		</div>

		<div class="place-photo">
			<k-complex-cell title="实景照片">
				<ul class="img-list">
					<li
					class="img-item"
					v-for="(photo, index) in photos">
						<k-img-btn type="cell"
							:img="photo.img"
							:disable="true">
						</k-img-btn>
						<div class="delete-icon" v-if="photo.localId" @click="deletePhoto(index)">
							<i class="mintui mintui-field-error"></i>
						</div>
					</li>
					<li class="img-item" v-if="photos.length < 6">
						<k-img-btn type="cell" @click.native="choosePhoto">
						</k-img-btn>
					</li>
				</ul>
			</k-complex-cell>
		</div>

		<div class="purchase-order">
			<k-complex-cell title="订货清单">
				<ul class="order-list">
					<li class="order-item" v-for="(listItem, index) in list">
						<mt-cell-swipe :right="rightButtons(index)">
							<i @click="removeItem(index)" class="icon-error iconfont icon-minus-round-fill"></i>
							<select class="production-selector" name="production" v-model="listItem.production_id">
								<option value="-1">请选择产品</option>
								<option v-for="production in productions" :value="production.id">{{production.name}}</option>
							</select>
							<div class="order-number">
								<k-number
									:min="1"
									:fillable="true"
									v-model="listItem.num"></k-number>
							</div>
						</mt-cell-swipe>
					</li>
				</ul>
				<!-- 添加项目 -->
				<div class="add-control">
					<mt-cell title="添加清单" icon="more" @click.native="addItem">
						<i class="icon-success iconfont icon-jiahao2fill" slot="icon"></i>
					</mt-cell>
				</div>
				<div class="add-note">
					<mt-field placeholder="请输入备注" :attr="{ maxlength: 250 }" v-model="note" type="textarea" rows="4"></mt-field>
				</div>
			</k-complex-cell>
		</div>

		<div class="meta-order">
			<k-complex-cell title="附加信息">
				<mt-field label="安装位置" class="input-content" placeholder="安装位置" :attr="{ maxlength: 250 }" v-model="location" type="text"></mt-field>
				<mt-field label="期望到货时间" class="input-content" placeholder="期望到货时间" v-model="hopeDate" readonly type="text" @click.native="openDate('picker1')"></mt-field>
			</k-complex-cell>
		</div>

		<div class="order-control">
			<mt-button size="large" type="primary" @click="createOrder">创建订单</mt-button>
		</div>

		<!-- 底部栏 -->
		<odin-bottom-pannel tab-selected="home"></odin-bottom-pannel>

		<!-- 日期控件 -->
		<mt-datetime-picker
			ref="picker1"
			type="date"
			v-model="defaultTime"
			@confirm="handleChange">
		</mt-datetime-picker>

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
	import axios from 'axios';
	import WX from 'weixin-js-sdk';
	import apis from '../../apis/index.js';
	import BoxSection from '../../components/box-section/box-section.vue';
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';
	import ImgBtn from '../../components/image-upload/image-upload.vue';
	import KNumber from '../../components/number/number.vue';
	import ChooseContact from './choose-contact.vue';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { Field, CellSwipe, Cell, Button, Toast, Popup, DatetimePicker } from 'mint-ui';

	export default {
		name: 'odin-order-create',
		data () {
			return {
				location: '',
				contact_id: '',
				list: [{
					production_id: -1,
					num: 0
				}],
				photos: [],
				hopeDate: '',
				note: '',
				productions: [],
				defaultUser: {},
				defaultTime: '',
				contactVisible: false
			};
		},
		created () {
			// 设置默认时间
			let dateTime = new Date();
			this.defaultTime = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()}`;

			// 获取默认联系人
			axios.get(apis.urls.contact)
			.then((response) => {
				this.contact_id = response.data.data.id;
				this.defaultUser = response.data.data;
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});

			// 获取产品列表
			axios.get(apis.urls.production)
			.then((response) => {
				this.productions = response.data.data;
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});

			// 获取jssdk参数
			let curUrl = window.location.href;
			let cur = curUrl.split('#')[0];
			let params = {
				url: cur,
				jsApiList: ['chooseImage', 'uploadImage', 'getLocalImgData']
			};
			axios.get(apis.urls.jsSdk, {params: params})
			.then((response) => {
				WX.config(response.data.data.config);
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			openContact () {
				this.contactVisible = true;
			},
			handleContact (val) {
				if (val) {
					this.defaultUser = val;
					this.contact_id = val.id;
				}
			},
			openDate (picker) {
				this.$refs[picker].open();
			},
			handleChange (value) {
				this.hopeDate = `${value.getFullYear()}-${(value.getMonth() + 1)}-${value.getDate()}`;
			},
			rightButtons (index) {
				return [
					{
						content: '取消',
						style: { background: 'lightgray', color: '#fff' }
					},
					{
						content: '删除',
						style: { background: 'red', color: '#fff' },
						handler: (index) => this.removeItem(index)
					}
				];
			},
			choosePhoto (e) {
				let self = this;
				e.preventDefault();
				e.stopPropagation();
				// 判断是否已经到达 6 张图片上限
				if (this.photos.length >= 6) {
					return false;
				}
				WX.chooseImage({
					count: 6 - self.photos.length,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success (res) {
						let allLocalIds = res.localIds;
						let i = 0;
						let length = allLocalIds.length;
						self.upload(allLocalIds, i, length);
					}
				});
			},
			upload (allLocalIds, i, length) {
				let self = this;
				if (i >= length && length === 0) { // 图片为空时或者图片达到上限
					return false;
				}
				WX.uploadImage({    // 上传图片
					localId: allLocalIds[i],
					isShowProgressTips: 1,
					success (res) {
						self.photos.push({
							localId: allLocalIds[i],
							img: allLocalIds[i],
							serverId: res.serverId
						});// 返回图片的服务器端ID
						i++;
						if (i < length) {
							self.upload(allLocalIds, i, length);
						} else {
							return false;
						}
					}
				});
			},
			deletePhoto (index) {
				this.photos.splice(index, 1);
				return false;
			},
			removeItem (index) {
				this.list.splice(index, 1);
			},
			addItem () {
				this.list.push({production_id: -1, num: 0});
			},
			createOrder () {
				let params = {
					location: this.location,
					contact_id: this.contact_id,
					list: this.list,
					note: this.note,
					photos: this.photos.map(function (item) {
						return item.serverId;
					}),
					hopeDate: this.hopeDate
				};
				axios.post(apis.urls.order, params)
				.then((response) => {
					// 提示成功并返回列表
					Toast({
						message: '创建成功！',
						iconClass: 'mintui mintui-success'
					});
					this.$router.push({name: 'OrderList'});
					return true;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[Cell.name]: Cell,
			[Popup.name]: Popup,
			[Field.name]: Field,
			[Button.name]: Button,
			[ImgBtn.name]: ImgBtn,
			[KNumber.name]: KNumber,
			[CellSwipe.name]: CellSwipe,
			[BoxSection.name]: BoxSection,
			[ComplexCell.name]: ComplexCell,
			[BottomPannel.name]: BottomPannel,
			[ChooseContact.name]: ChooseContact,
			[DatetimePicker.name]: DatetimePicker
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-create{
		padding-bottom: 20px;
	}
	// 默认地址
	.custom-address{
		position: relative;
		text-align: left;
		background-color: #fff;
		@include border-bottom($border-color);
	}
	.address{
		padding: 14px 10px 9px 10px;
		border-bottom: 3px solid transparent;
		border-image: 3 repeating-linear-gradient(-45deg, #e55a71 0, #e55a71 0.5em, transparent 0, transparent 1em, #58a 0, #58a 1.5em, transparent 0, transparent 2em, #e9803e 0, #e9803e 2.5em, transparent 0, transparent 3em);
	}
	.address-heading .address-name,
	.address-heading .address-phone{
		float: left;
	}
	.address-heading .address-phone{
		margin-left: 1em;
	}
	.address .address-heading{
		margin-left: 23px;
		font-weight: 700;
		padding-bottom: 10px;
		color: #252525;
	}
	.address .address-body{
		position: relative;
		padding: 0px 14px 0px 23px;
		font-size: 14px;
		color: #232326;
		line-height: 1.5;
	}
	.address .address-body .icon{
		position: absolute;
		left: 0;
		line-height: 1.3;
	}
	.address .address-body .address-where{
		word-break: break-word;
	}
	.custom-address .mint-cell-allow-right:after{
		right: 15px
	}

	// 图片列表
	.place-photo{
		margin-top: 10px;
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.place-photo .img-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-left: -15px;
	}
	.place-photo .img-list>.img-item{
		margin-bottom: 15px;
		margin-left: 15px;
		position: relative;
	}
	.place-photo .img-item .delete-icon{
		position: absolute;
		top: -11px;
		right: -6.5px;
		color: #f23030;
	}
	
	// 订货清单
	.purchase-order, .meta-order{
		margin-top: 10px;
		@include border-top($border-color);
		@include border-bottom($border-color);
	}
	.purchase-order .complex-cell .complex-cell-content,
	.meta-order .complex-cell .complex-cell-content{
		padding-top: 0;
	}
	.purchase-order .complex-cell .complex-cell-title:before,
	.meta-order .complex-cell .complex-cell-title:before{
		border: 0;
	}
	.order-number{
		color: #000;
		background-color: #fff;
		position: relative;
		min-height: 25px;
		min-width: 100px;
		margin-left: 10px
	}
	.mint-field-other{
		position: relative;
	}
	.icon-success{
		color: #4cd964;
		font-size: 18px;
	    vertical-align: middle;
	}
	.icon-error{
		color: #ff3b30;
		font-size: 18px;
	    vertical-align: middle;
	}
	.order-item .mint-cell-swipe .mint-cell-title{
		display: none;
	}
	.add-control{
		color: #000;
	}
	.add-control .mint-cell-wrapper{
		background-image: none;
	}
	.add-control .mint-cell-wrapper:last-child{
		background-image: none;
	}
	.add-note .mint-cell{
		background-image: none;
	}
	.production-selector{
		border: 0;
		min-width: 13rem;
		background-color: #fff;
		padding-left: 3px;
	}
	@media screen and (max-width: 320px) {
		.production-selector{
			min-width: 10rem;
		}
	}

	.order-create .order-control{
		width: 90%;
		margin: 20px auto 0;
	}
	.meta-order .input-content{
		color: #000;
	}
	.meta-order .mint-field-core,
	.meta-order .mint-cell-value{
		color: #000;
		background-color: #fff;
	}

	.order-create .contact-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 1001;
	}
</style>
