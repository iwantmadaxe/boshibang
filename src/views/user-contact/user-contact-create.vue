<template>
	<div class="user-contact-create">
		<mt-field label="收货人:" type="text" v-model="name"></mt-field>
		<mt-field label="联系方式:" type="tel" v-model="phone"></mt-field>
		<mt-field label="所在地区:" type="text" v-model="regions" readonly @click.native="areaVisible = true"></mt-field>
		<mt-field label="详细地址:" type="text" placeholder="街道、楼牌号等" v-model="address"></mt-field>

		<div class="btn-contact-save">
			<mt-button size="large" type="primary" @click="save">确定并保存</mt-button>
		</div>

		<k-area-picker
		v-model="areaVisible"
		:area-choose="choose"
		@choose-area="choose = arguments[0]"></k-area-picker>
	</div>
</template>
<script>
	import AreaPicker from '../../components/area-picker/area-picker.vue';
	import { Field, Button, MessageBox } from 'mint-ui';
	import axios from 'axios';
	import apis from '../../apis';
	import { requiredMe } from '../../utils/valids.js';    // 验证
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'boss-user-contact-create',
		data () {
			return {
				areaVisible: false,
				redirectTo: '',
				name: '',
				phone: '',
				address: '',
				choose: {
					province: {id: null, code: null, name: ''},
					city: {id: null, code: null, name: ''},
					district: {id: null, code: null, name: ''}
				}
			};
		},
		computed: {
			regions () {
				if (this.choose.district.name) {
					return this.choose.province.name + '-' + this.choose.city.name + '-' + this.choose.district.name;
				}
			}
		},
		created () {
			// 回调地址
			this.redirectTo = this.$route.query.redirect ? this.$route.query.redirect : '';
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
		},
		methods: {
			save () {
				// 验证信息
				if (!requiredMe(this.name)) {
					MessageBox.alert('收货人必填！', '提示');
					return false;
				}
				if (!requiredMe(this.phone)) {
					MessageBox.alert('联系方式必填！', '提示');
					return false;
				}
				if (!requiredMe(this.choose.district.code)) {
					MessageBox.alert('所在地区必填！', '提示');
					return false;
				}
				if (!requiredMe(this.address)) {
					MessageBox.alert('详细地址必填！', '提示');
					return false;
				}
				let params = {
					area_code: this.choose.district.code,
					address: this.address,
					name: this.name,
					phone: this.phone
				};
				axios.post(apis.urls.contact, params)  //  创建联系人
				.then((response) => {
					// 保存成功跳转回调地址
					this.redirectTo ? window.location.href = this.redirectTo : '';
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
				return true;
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[AreaPicker.name]: AreaPicker
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.user-contact-create .btn-contact-save{
		width: 90%;
		margin: 20px auto;
	}
	.user-contact-create .mint-button {
		background: $color-red;
	}
</style>
