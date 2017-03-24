<template>
	<div class="mine-info-edit">
		<div class="avatar-con">
			<div class="avatar-row cl-fx">
				<span class="avatar-text">更换头像</span>
				<img v-if="user.avatar" class="avatar" v-bind:src="user.avatar">
				<span v-else class="avatar">暂无头像</span>
			</div>
			<input type="file" class="avatar-upload" @change="upload" />
		</div>
		<mt-field v-if="user.name" placeholder="姓名" type="text" v-model="user.name"></mt-field>
		<mt-field v-else placeholder="暂无" type="text" v-model="user.name"></mt-field>
		<mt-field placeholder="请输入手机号" type="tel" v-model="user.phone"></mt-field>

		<div class="info-change">
			<mt-button size="large" type="primary" @click="edit">确认修改</mt-button>
		</div>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Field, Button, Toast, MessageBox, Indicator } from 'mint-ui';
	import { phone } from '../../utils/valids.js';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'mine-info-edit',
		data () {
			return {
				token: '',
				user: {
					name: '',
					phone: '',
					avatar: ''
				},
				valid: {
					msg: '',
					ok: true
				}
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			axios.get(apis.urls.userProfile)
			.then((response) => {
				Indicator.close();
				this.user = apis.pures.pureInfoEdit(response.data.data);
			})
			.catch((error) => {
				Indicator.close();
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			edit () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 手机号检测
				if (!phone(this.user.phone)) {
					this.valid.msg = '手机号格式错误！';
					this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					phone: this.user.phone,
					name: this.user.name,
					avatar: this.user.avatar
				};
				axios.put(apis.urls.user, postTpl)
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
			},
			upload () {
				let _this = this;
				let file = event.target.files[0];
				let fr = new window.FileReader();
				fr.onloadend = function () {
					_this.user.avatar = fr.result;
				};
				if (file) {
					fr.readAsDataURL(file);
				} else {
				}
				return true;
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.mine-info-edit {
		.mint-field {
			width: 100%;
		}
		.info-change {
			width: 90%;
			margin: 20px auto;
			.mint-button {
				background: $color-red;
			}
		}
		.avatar-con {
			position: relative;
			height: 0.8rem;
			line-height: 0.8rem;
			width: 100%;
			.avatar-upload {
				height: 0.8rem;
				line-height: 0.8rem;
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 10;
				display: block;
				opacity: 0;
			}
			.avatar-row {
				height: 0.8rem;
				line-height: 0.8rem;
				background: $color-white;
				padding: 0 10px;;
				width: 100%;
				position: absolute;
				left: 0;
				top: 0;
				z-index: 9;
				.avatar-text {
					display: block;
					float: left;
					font-size: $page-title;
					color: $mint-field;
					text-align: left;
				}
				.avatar {
				    height: 0.6rem;
				    line-height: 0.6rem;
    				margin: 0.1rem 0;
					display: block;
					float: right;
					text-align: right;
					font-size: $normal-text;
					color: $color-text;
				}
			}
		}
	}
</style>
