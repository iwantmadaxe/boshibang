<template>
	<div class="zeco-change-password">
		<section>
			<mt-field placeholder="请输入原密码" type="password" :value.sync="originPwd"></mt-field>
			<mt-field placeholder="请输入新密码" type="password" :value.sync="pwd"></mt-field>
			<mt-field placeholder="请确认新密码" type="password" :value.sync="confirmedPwd"></mt-field>
			<div class="btn-change">
				<mt-button size="large" type="primary" @click="changePwd">确认修改</mt-button>
			</div>
		</section>
	</div>
</template>
<script>
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, equal } from '../../utils/valids.js';
	import apis from '../../api';
	import { userToken } from '../../vuex/getters.js';    // 全局参数
	import { goLogout } from '../../vuex/actions.js';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-change-password',
		data () {
			return {
				token: '',
				originPwd: '',
				pwd: '',
				confirmedPwd: '',
				valid: {
					msg: '',
					ok: true
				}
			};
		},
		vuex: {
			getters: {
				userToken
			},
			actions: {
				goLogout
			}
		},
		route: {
			data () {
				// 读取localStorage信息
				let userInfo = readLocal('user');
				// 获取token
				if (this.userToken) {
					this.token = this.userToken;
				} else if (userInfo !== false && userInfo.token) {
					this.token = userInfo.token;
				}
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button
		},
		methods: {
			changePwd () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(this.originPwd)) {
					this.valid.msg = '原密码必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写原密码！', '提示');
					return false;
				}
				if (!requiredMe(this.pwd)) {
					this.valid.msg = '新密码必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写新密码！', '提示');
					return false;
				}
				if (!requiredMe(this.confirmedPwd)) {
					this.valid.msg = '确认密码必填！';
					this.valid.ok = false;
					MessageBox.alert('请填写确认密码！', '提示');
					return false;
				}

				// 原密码和新密码不能一致
				if (equal(this.pwd, this.originPwd)) {
					this.valid.msg = '原密码和新密码不能相同！';
					this.valid.ok = false;
					MessageBox.alert('原密码和新密码不能相同！', '提示');
					return false;
				}

				// 密码一致性检测
				if (!equal(this.pwd, this.confirmedPwd)) {
					this.valid.msg = '两次密码不一致！';
					this.valid.ok = false;
					MessageBox.alert('两次密码不一致！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					oldpassword: this.originPwd,
					password: this.pwd
				};
				let option = {
					headers: {Authorization: 'Bearer ' + this.token}
				};
				this.$http.post(apis.urls.changepass, postTpl, option).then((response) => {
					// 提示成功
					Toast({
						message: '修改成功！',
						iconClass: 'mintui mintui-success',
						duration: 2000
					});
					this.$route.router.go({name: 'Home'});
				}, (response) => {
					apis.errors.errorForgetPass(response, _this);
				});
			}
		}
	};
</script>
<style lang="scss">
	.zeco-change-password .btn-change{
		width: 90%;
		margin: 20px auto;
	}
	.zeco-change-password section{
		margin-bottom: 20px;
	}
	.zeco-change-password .mint-cell::before{
		left: 0;
	}
	.zeco-change-password .mint-cell-title{
		display: none;
	}
	.zeco-change-password .mint-field-other{
		top: 3px;
	}
</style>