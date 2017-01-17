<template>
	<div class="zeco-supplier">
		<div class="supplier-head">
			<div class="head-bars">
				<zeco-my-head :auth-info="authInfo" :user-info="user"></zeco-my-head>
			</div>
			<div class="button-bars block-space-v">
				<section class="for-recruit" @click="goPath('ParticipateRecruit')">
					<div class="recruit-title">参与的招募</div>
					<div class="recruit-content" v-text="num.invitedRecruit"></div>
				</section>
				<section class="for-bid" @click="goPath('ParticipateBid')">
					<div class="bid-title">参与的招标</div>
					<div class="bid-content" v-text="num.invitedBid"></div>
				</section>
				<section class="my-bid" @click="goPath('MyBid')">
					<div class="my-bid-title">我的招标</div>
					<div class="my-bid-content" v-text="num.givenBid"></div>
				</section>
			</div>
		</div>
		<div class="supplier-content">
			<div class="supplier-notice">
				<!-- <mt-cell title="企业信息" is-link>
					<img slot="icon" src="../../assets/images/my/1.png" width="20">
				</mt-cell> -->
				<mt-cell title="我的消息" is-link v-link="{name: 'MyNews'}">
					<img slot="icon" src="../../assets/images/my/2.png" width="20">
				</mt-cell>
			</div>
			<div class="supplier-addition-content">
				<mt-cell title="邀请我的招标" is-link v-link="{name: 'InviteMe'}">
					<img slot="icon" src="../../assets/images/my/3.png" width="20">
				</mt-cell>
				<mt-cell title="我关注的需求方" is-link v-link="{name: 'WatchDeveloper'}">
					<img slot="icon" src="../../assets/images/my/4.png" width="20">
				</mt-cell>
				<mt-cell title="中标业绩" is-link v-link="{name: 'WinBidRecord'}">
					<img slot="icon" src="../../assets/images/my/5.png" width="20">
				</mt-cell>
			</div>
			<div class="supplier-bar">
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
	import { Cell, MessageBox } from 'mint-ui';
	import MyHead from '../share-template/my/my-head.vue';
	import { loginStatus, authStatus, userToken, userInfo } from '../../vuex/getters.js';    // 全局参数
	import { goLogout, changeAuth } from '../../vuex/actions.js';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import localLogout from '../../services/logout.js';
	import BottomPannel from '../share-template/bottom-pannel/bottom-pannel.vue';
	import apis from '../../api';

	export default {
		name: 'zeco-supplier',
		data () {
			return {
				token: '',
				authInfo: 0,
				user: null,
				num: {
					invitedRecruit: 0,
					invitedBid: 0,
					givenBid: 0
				}
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
				/**
				 * 获取招募招标数量
				 * 缓存1min
				 */
				if (readLocal('infoNum') === false) {
					this.$http.get(apis.urls.myNum, {headers: {Authorization: 'Bearer ' + this.token}})
					.then((response) => {
						this.num.invitedRecruit = Number(response.body.num1);
						this.num.invitedBid = Number(response.body.num2);
						this.num.givenBid = Number(response.body.num3);
						saveLocal('infoNum', this.num, 60);
					},
					(response) => {
						apis.errors.errorCertificateStatus(response, this);
					});
				} else {
					this.num = readLocal('infoNum');
				}
			}
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
		},
		components: {
			[Cell.name]: Cell,
			[MyHead.name]: MyHead,
			[BottomPannel.name]: BottomPannel
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.zeco-supplier .supplier-head{
		min-height: 13rem;
		background: url('../../assets/images/my/my-background.png') no-repeat;
		background-size: cover;
		background-color: $bid-background-color;
	}

	// 用户头像信息
	.zeco-supplier .head-bars{
		padding: 20px 10px 0 10px;
	}

	// 个人中心
	.zeco-supplier .supplier-content{
		margin-top: 10px;
		text-align: left;
	}
	.zeco-supplier .supplier-content .supplier-notice{
		background-color: $color-white;
	}
	.zeco-supplier .supplier-content .supplier-bar,
	.zeco-supplier .supplier-content .supplier-addition-content{
		margin-top: 10px;
		background-color: $color-white;
	}

	// 功能键
	.zeco-supplier .button-bars{
		margin: 4rem 10px 0 10px;
	    color: #fff;
	}

	// 退出键
	.zeco-supplier .developer-logout{
		margin-top: 20px;
		text-align: center;
		color: $color-blue;
	}
</style>