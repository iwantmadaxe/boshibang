<template>
	<div class="zeco-developer">
		<div class="developer-head">
			<div class="head-bars">
				<zeco-my-head :auth-info="authInfo" :user-info="user"></zeco-my-head>
			</div>
			<div class="button-bars block-space-v">
				<mt-button :plain="true" size="small" @click="goPath('RecruitManageList')">招募管理</mt-button>
				<mt-button :plain="true" size="small" @click="goPath('SupplierManageList')">供应商管理</mt-button>
				<mt-button :plain="true" size="small" @click="goPath('BidManageList')">招标管理</mt-button>
			</div>
		</div>
		<div class="developer-content">
			<div class="developer-notice">
				<mt-cell title="我的消息" is-link v-link="{name: 'MyNews'}">
					<img slot="icon" src="../../assets/images/my/2.png" width="20">
				</mt-cell>
				<mt-cell title="我关注的供应方" is-link v-link="{name: 'WatchSupplier'}">
					<img slot="icon" src="../../assets/images/my/4.png" width="20">
				</mt-cell>
			</div>
			<div class="developer-bar">
				<mt-cell title="修改密码" is-link v-link="{name: 'ChangePassword'}">
					<img slot="icon" src="../../assets/images/my/6.png" width="20">
				</mt-cell>
			</div>
			<div class="developer-logout" @click="logout">
				<mt-cell title="退出登录"></mt-cell>
			</div>
		</div>
		<!-- 底部栏 -->
		<zeco-bottom-pannel tab-selected="mine"></zeco-bottom-pannel>
	</div>
</template>
<script>
	import { Button, Cell, MessageBox } from 'mint-ui';
	import MyHead from '../share-template/my/my-head.vue';
	import { loginStatus, authStatus, userToken, userInfo } from '../../vuex/getters.js';    // 全局参数
	import { goLogout, changeAuth } from '../../vuex/actions.js';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import localLogout from '../../services/logout.js';
	import BottomPannel from '../share-template/bottom-pannel/bottom-pannel.vue';
	import apis from '../../api';

	export default {
		name: 'zeco-developer',
		data () {
			return {
				token: '',
				authInfo: 0,
				user: null
			};
		},
		vuex: {
			getters: {
				loginStatus,
				authStatus,
				userToken,
				userInfo
			},
			actions: {
				goLogout,
				changeAuth
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
				/**
				 * 获取企业认证状态，
				 * 未认证(0)缓存10min，认证中(1)缓存5min，已认证(2)缓存15天
				 */
				this.authInfo = userInfo === false ? this.authStatus : userInfo.authStatus;
				this.user = userInfo === false ? this.userInfo : userInfo.info;
				if (readLocal('authInfo') === false) {
					this.$http.get(apis.urls.certificateStatus, {headers: {Authorization: 'Bearer ' + this.token}}).then((response) => {
						if (response.body.status === 1 || response.body.status === '1') {
							this.changeAuth(1);
							userInfo.authStatus = 1;
							saveLocal('user', userInfo);
							saveLocal('authInfo', 1, 300);
							this.authInfo = 1;
						} else if (response.body.status === 0 || response.body.status === '0') {
							this.changeAuth(0);
							userInfo.authStatus = 0;
							saveLocal('user', userInfo);
							saveLocal('authInfo', 0, 600);
							this.authInfo = 0;
						} else if (response.body.status === 2 || response.body.status === '2') {
							this.changeAuth(2);
							userInfo.authStatus = 2;
							saveLocal('user', userInfo);
							saveLocal('authInfo', 2, 1296000);
							this.authInfo = 2;
						}
					}, (response) => {
						apis.errors.errorCertificateStatus(response, this);
					});
				} else {
					this.authInfo = readLocal('authInfo');
				}
			}
		},
		components: {
			[Cell.name]: Cell,
			[Button.name]: Button,
			[MyHead.name]: MyHead,
			[BottomPannel.name]: BottomPannel
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		methods: {
			goPath (path) {
				this.$route.router.go({name: path});

				return true;
			},
			logout () {
				this.goLogout();
				localLogout();
				MessageBox.alert('退出成功！', '提示').then(() => {
					this.$route.router.go({name: 'Home'});
				});
				return true;
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.zeco-developer .developer-head{
		min-height: 13rem;
		background: url('../../assets/images/my/my-background.png') no-repeat;
		background-size: cover;
		background-color: $bid-background-color;
	}

	// 用户头像信息
	.zeco-developer .head-bars{
		padding: 20px 10px 0 10px;
	}

	// 按钮组
	.zeco-developer .button-bars{
		margin: 4rem 10px 0 10px;
		color: $color-white;
	}
	.zeco-developer .button-bars .mint-button{
		color: $color-white;
		border: 2px solid $color-white;
		border-radius: 17px;
	}

	// 个人中心
	.zeco-developer .developer-content{
		margin-top: 10px;
		text-align: left;
	}
	.zeco-developer .developer-content .developer-notice{
		background-color: $color-white;
	}
	.zeco-developer .developer-content .developer-bar{
		margin-top: 10px;
		background-color: $color-white;
	}
	
	// 退出键
	.zeco-developer .developer-logout{
		margin-top: 20px;
		text-align: center;
		color: $color-blue;
	}
</style>