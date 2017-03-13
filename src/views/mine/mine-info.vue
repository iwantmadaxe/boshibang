<template>
	<div class="odin-mine-info">
		<mt-field placeholder="姓名" type="text" v-model="username"></mt-field>
		<mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
		<mt-field placeholder="公司名" type="text" v-model="company"></mt-field>

		<div class="info-change">
			<mt-button size="large" type="primary" @click="save">确认修改</mt-button>
		</div>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Field, Button, Toast, MessageBox } from 'mint-ui';
	import { phone } from '../../utils/valids.js';

	export default {
		name: 'odin-mine-info',
		data () {
			return {
				username: '',
				phone: '',
				company: '',
				id: null,
				valid: {
					msg: '',
					ok: true
				}
			};
		},
		created () {
			axios.get(apis.urls.register)
			.then((response) => {
				this.username = response.data.data.username;
				this.phone = response.data.data.phone;
				this.company = response.data.data.company;
				this.id = response.data.data.id;
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			save () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
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
					phone: this.phone,
					username: this.username,
					company: this.company,
					_method: 'PUT'
				};
				axios.post(apis.urls.register, postTpl)
				.then((response) => {
					// 提示成功并返回登录
					Toast({
						message: '修改成功！',
						iconClass: 'mintui mintui-success'
					});
					this.$router.push({name: 'Mine'});
				})
				.catch((error) => {
					apis.errors.errorRegister(error.response, _this);
				});
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button
		}
	};
</script>
<style>
	.odin-mine-info .info-change{
		width: 90%;
		margin: 20px auto;
	}
</style>
