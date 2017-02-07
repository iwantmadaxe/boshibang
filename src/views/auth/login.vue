<template>
	<div class="login-con">
		<div class="login">
			<div class="login-field">
				<mt-field placeholder="请输入用户名" :attr="{ maxlength: 11 }" :value.sync="account"></mt-field>
				<mt-field placeholder="请输入密码" :type="typeName" :value.sync="password">
				</mt-field>
			</div>
			<div class="login-helper">
				<a class="registery" v-link="{name: 'Register'}">免费注册</a>
				<div class="cf"></div>
			</div>
			<div class="login-button">
				<mt-button size="large" type="primary" @click="login">登录</mt-button>
			</div>
			<div class="wechant-login-con">
				<div class="fl wechant-login-line">
				</div>
				<span  class="fl wechant-login-text">使用微信登录</span>
				<div class="fl wechant-login-line">
				</div>
			</div>
			<div class="login-bg">
				<img class="wechat-login-icon" src="../../assets/images/login/wechat-icon.png" />
			</div>
		</div>
		<img class="bottom-bg" src="../../assets/images/login/login-bg.png" />
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import apis from '../../api/index.js';
	import { requiredMe, phone } from '../../utils/valids.js';    // 验证
	import { loginStatus } from '../../vuex/getters.js';    // 全局参数
	import { goLogin } from '../../vuex/actions.js';    // 登录函数
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import { isWechat } from '../../utils/fixtools.js';

	export default {
		name: 'zeco-login',
		data () {
			return {
				see: false,
				account: '',
				password: '',
				valid: {
					msg: '',
					ok: true
				}
			};
		},
		vuex: {
			getters: {
				loginStatus
			},
			actions: {
				goLogin
			}
		},
		route: {
			activate: function (transition) {
				if (this.loginStatus === 'in') {
					transition.abort();
					return false;
				} else {
					let userInfo = readLocal('user');
					if (userInfo.loginStatus === 'in') {
						transition.abort();
						return false;
					}
				}
				transition.next();
			}
		},
		computed: {
			typeName () {
				return this.see ? 'text' : 'password';
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[MessageBox.name]: MessageBox
		},
		methods: {
			login () {
				let _this = this;
				// 数据验证
				this.valid = {msg: '', ok: true};
				if (!requiredMe(this.account)) {
					this.valid.msg = '手机号必填！';
					this.valid.ok = false;
					MessageBox.alert(this.valid.msg, '提示');
					return false;
				}
				if (!phone(this.account)) {
					this.valid.msg = '手机号格式错误！';
					this.valid.ok = false;
					MessageBox.alert(this.valid.msg, '提示');
					return false;
				}
				if (!requiredMe(this.password)) {
					this.valid.msg = '密码必填！';
					this.valid.ok = false;
					MessageBox.alert(this.valid.msg, '提示');
					return false;
				}
				this.$http.post(apis.urls.login, {auth_name: 'local', phone: this.account, password: this.password}).then((response) => {
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.body);
					let loginData = {loginStatus: 'in', authStatus: loginTpl.status, identityStatus: loginTpl.companyType, token: loginTpl.token, info: {phone: loginTpl.phone, logo: loginTpl.logo}};
					_this.goLogin(loginData);
					saveLocal('user', loginData);
					// 跳转路由
					if (isWechat() === true) {
						window.location.href = apis.urls.wechatOauthLogin + '?tmp_token=' + loginTpl.token;
					} else {
						Toast({
							message: '登录成功！',
							iconClass: 'mintui mintui-success'
						});
						_this.$route.router.go({name: 'Home'});
					}
				}, (response) => {
					// 错误处理
					apis.errors.errorLogin(response, _this);
				});
			}
		}
	};
</script>

<style lang="scss">
	input[type="checkbox"],
	input[type="radio"]{
		opacity: 0;
	}
	.login-field {
		margin-top: 0.4rem;
	}
	.login-bg {
		width: 100%;
		height: auto;
		position: relative;
	}
	.login-con {
		display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -ms-flex-flow: column;
	    flex-flow: column;
	    height: 100%;
	    min-height: 100vh;
	    overflow: hidden;
	}
	.login {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.bottom-bg {
		width: 100%;
		display: block;
	}
	.wechat-login-icon {
		width: 0.4rem;
		height: 0.4rem;
		top: 0.15rem;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		display: block;
	    cursor: pointer;
	    position: absolute;
	}
	.wechant-login-con {
	    width: 90%;
		height: 0.3rem;
		margin: 0.1rem auto 0;
	}
	.wechant-login-con .wechant-login-line{
	    width: 33%;
	    height: 0.01rem;
	    margin: 0.14rem 0 0;
	    background: #d4d3d3;
	}
	.wechant-login-con .wechant-login-text{
        font-size: 0.14rem;
	    color: #b4b4b4;
	    width: 33%;
	    margin-top: 0.06rem;
	    letter-spacing: 0.01rem;
	}
	.login .login-helper{
		margin: 0.2rem 0.15rem 0;
		color: #5c98cc;
		font-size: 14px;
	}
	.login-helper .registery{
	    float: right;
	    cursor: pointer;
	    color: #c91425;
	    border-bottom: 0.01rem solid #c91425;
	    padding: 0.02rem 0;
	    display: block;
	    margin-right: 5%;
	}
	.cf {
		clear: both;
	}
	.login .login-button{
		margin: 0.35rem auto 0;
    	width: 80%;
	}
	.login .login-button .mint-button {
	    border-radius: 0.2rem;
	    font-weight: 600;
	    font-size: 0.2rem;
	    background-color: #c91425;
	}
	.login .mint-switch{
		position: relative;
		height: 0.48rem;
	}
	.login .mint-cell:before{
    	left: 0px;
	}
	.login-field .mint-field{
		width: 80%;
		margin: 0 auto;
	}
	.login-field .mint-cell-wrapper{
	    margin: 0.2rem auto 0;
		height: 0.42rem;
		line-height: 0.42rem;
		background-color: #f2f2f7;
	}
	.login-field .mint-field-core {
		background-color: #f2f2f7;
		height: 0.42rem;
		line-height: 0.42rem;
		padding: 0 5%;
	}
	.login-field .mint-cell::after{
		border-top: 0;
	}
	.login-field .mint-cell::before {
		border-bottom: 0;
	}
</style>
