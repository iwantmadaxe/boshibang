<template>
	<div class="register-k">
		<mt-field placeholder="请输入手机号" type="tel" :value.sync="phone"></mt-field>
		<mt-field placeholder="请输入验证码" type="tel" :value.sync="code">
			<mt-button type="primary" v-if="downTime.time" disabled>重新发送({{ downTime.time }})</mt-button>
			<mt-button type="primary" @click="sendSms" v-else>{{ buttonName }}</mt-button>
		</mt-field>
		<div class="register-user-info cl-fx">
			<mt-field placeholder="姓名" type="text" :value.sync="name"></mt-field>
			<mt-field placeholder="职务" type="text" :value.sync="job"></mt-field>
		</div>
		<div class="license">
			<mt-field placeholder="公司营业执照全称" type="text" :value.sync="license"></mt-field>
		</div>
		<mt-field placeholder="输入密码" type="password" :value.sync="pwd"></mt-field>
		<mt-field placeholder="确认密码" type="password" :value.sync="confirmedPwd"></mt-field>
		<div class="btn-register">
			<mt-button size="large" type="primary" @click="register">确认注册</mt-button>
		</div>
	</div>
</template>

<script>
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, phone, equal } from '../../utils/valids.js';
	import apis from '../../api/index.js';
	import downTime from '../../utils/downTime.js';

	export default {
		name: 'zeco-register-dev',
		data () {
			return {
				buttonName: '获取验证码',
				phone: '',
				code: '',
				name: '',
				job: '',
				license: '',
				pwd: '',
				confirmedPwd: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				}
			};
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button
		},
		methods: {
			sendSms () {
				let _this = this;
				// 数据验证
				this.valid = {msg: '', ok: true};
				if (!requiredMe(this.phone)) {
					this.valid.msg = '手机号必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!phone(this.phone)) {
					this.valid.msg = '手机号格式错误！';
					this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				this.$http.get(apis.urls.verifyLocal, {params: {phone: this.phone}}).then((response) => {
					let tplPhoneExist = apis.pures.pureVerifyPhone(response.body);
					// 验证手机号注册
					if (tplPhoneExist.isExist) {
						MessageBox.alert('手机号已经注册！', '提示');
						return false;
					}
					// 发送验证码
					this.$http.get(apis.urls.sms, {params: {phone: this.phone, type: 'other'}}).then((response) => {
						Toast({
							message: '发送成功！',
							iconClass: 'mintui mintui-success'
						});
						// 开启倒计时
						downTime(100, _this.downTime);
						this.valid = {msg: '', ok: true};
						return false;
					}, (response) => {
						apis.errors.errorSms(response, _this);
						return false;
					});
				}, (response) => {
					apis.errors.verifyPhoneError(response, _this);
				});
			},
			register () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(this.phone)) {
					this.valid.msg = '手机号必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!requiredMe(this.code)) {
					this.valid.msg = '验证码必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写验证码！', '提示');
					return false;
				}
				if (!requiredMe(this.name)) {
					this.valid.msg = '姓名必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写姓名！', '提示');
					return false;
				}
				if (!requiredMe(this.job)) {
					this.valid.msg = '职业必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写职业！', '提示');
					return false;
				}
				if (!requiredMe(this.license)) {
					this.valid.msg = '营业执照必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写营业执照！', '提示');
					return false;
				}
				if (!requiredMe(this.pwd)) {
					this.valid.msg = '密码必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写密码！', '提示');
					return false;
				}
				// 密码一致性检测
				if (!equal(this.pwd, this.confirmedPwd)) {
					this.valid.msg = '两次密码不一致！';
					this.valid.ok = false;
					MessageBox.alert('两次密码不一致！', '提示');
					return false;
				}
				// 手机号检测
				if (!phone(this.phone)) {
					this.valid.msg = '手机号格式错误！';
					this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					auth_name: 'local',
					phone: this.phone,
					password: this.pwd,
					code: this.code,
					company_type: 1,
					forshort: this.license,
					name: this.name,
					title: this.job
				};
				this.$http.post(apis.urls.register, postTpl).then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '注册成功！',
						iconClass: 'mintui mintui-success'
					});
					this.$route.router.go({name: 'Login'});
				}, (response) => {
					apis.errors.errorRegisterK(response, _this);
				});
			}
		}
	};
</script>

<style lang="scss">
	.register-k .register-user-info .mint-field{
		width: 50%;
		float: left;
	}
	.register-k .btn-register{
		width: 90%;
		margin: 20px auto;
	}
	.register-k .mint-cell:before{
		left: 0px;
	}
	.register-k .mint-cell-title{
		display: none;
	}
	.register-k .mint-field-other{
		top: 3px;
	}
	.register-k .register-user-info>a:first-child:after{
		border-top: 0;
	}
	.register-k .license .mint-cell:after{
		border-top: 0;
	}
</style>
