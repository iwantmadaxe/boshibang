<template>
	<div class="register input-field-con">
		<div class="heading">
			<img src="../../assets/images/logo/logo.png" alt="logo" class="heading-img">
		</div>
		<div class="content">
			<mt-field placeholder="请输入手机号" type="text" v-model="phone"></mt-field>
			<mt-field placeholder="请输入验证码" type="text" v-model="code">
				<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
				<mt-button type="primary" @click="sendSms" v-else>发送验证码</mt-button>
			</mt-field>
			<mt-field placeholder="请输入密码" type="tel" v-model="pass"></mt-field>
		</div>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="register">确认注册</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { downTime, dropTime } from '../../utils/downTime.js';
	import { saveLocal } from '../../utils/localstorage.js';
	import { mapActions } from 'vuex';

	export default {
		name: 'boss-register',
		data () {
			return {
				phone: '',
				pass: '',
				code: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				}
			};
		},
		created () {
			let hasAuth = this.getCookie('has_auth');
			if (hasAuth) {
				this.$router.push({name: 'OrderCreate'});
			}
		},
		methods: {
			...mapActions([
				'goLogin'
			]),
			sendSms () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				// 开启倒计时
				let setTime = downTime(120, _this.downTime);
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phone, type: 'register'}}).then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				}, (response) => {
					dropTime(setTime);
					apis.errors(response, _this);
					return false;
				});
			},
			register () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				// 手机号检测
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				if (!requiredMe(_this.pass)) {
					_this.valid.msg = '密码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写密码！', '提示');
					return false;
				}
				if (!requiredMe(_this.code)) {
					_this.valid.msg = '验证码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写验证码！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					phone: _this.phone,
					password: _this.pass,
					code: _this.code
				};
				axios.post(apis.urls.user, postTpl)
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '注册成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					_this.goLogin(loginTpl);
					_this.$router.push({name: 'Index'});
				})
				.catch((error) => {
					apis.errors.errorLogin(error.response, _this);
				});
			},
			getCookie (name) {
				let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
				let arr = document.cookie.match(reg);
				if (arr) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	
	.input-field-con {
		min-height: 100vh;
		background-color: #fff;
	}
	.input-field-con .btn-register{
		width: 90%;
		margin: 20px auto;
	}
	.input-field-con .heading{
		min-height: 1.4rem;
		display: flex;
		justify-content: center;
  		align-items: center;
	}
	.input-field-con .heading .heading-img{
		width: 30%;
		border-radius: 50%;
	}
	.register .btn-register .mint-button {
		background: $color-red;
	}
	.register .content .mint-button {
		background: $color-red;
	}
</style>
