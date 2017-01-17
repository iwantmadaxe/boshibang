<template>
	<div class="zeco-demond">
		<section class="company-base">
			<div class="company-name-bar">
				<span class="company-name one-line">{{details.companyName}}</span>
			</div>
			<div class="company-pic">
				<img src="../../assets/images/template/company.png">
			</div>
			<mt-navbar class="page-part" :selected.sync="selected">
				<mt-tab-item id="recruit-notice">招募公告</mt-tab-item>
				<mt-tab-item id="bid-notice">招标公告</mt-tab-item>
				<mt-tab-item id="bid-win-notice">中标公告</mt-tab-item>
				<mt-tab-item id="project-notice">项目信息</mt-tab-item>
			</mt-navbar>
		</section>
		<section class="company-detail">
			<mt-tab-container :active.sync="selected" swipeable>
				<mt-tab-container-item id="recruit-notice">
					<zeco-recruit-notice :company-id="companyId" :is-login="isLogin" :token="token"></zeco-recruit-notice>
				</mt-tab-container-item>
				<mt-tab-container-item id="bid-notice">
					<zeco-bid-notice :company-id="companyId" :company-logo="details.companyLogo"></zeco-bid-notice>
				</mt-tab-container-item>
				<mt-tab-container-item id="bid-win-notice">
					<zeco-bid-win-notice :company-id="companyId" :company-logo="details.companyLogo"></zeco-bid-win-notice>
				</mt-tab-container-item>
				<mt-tab-container-item id="project-notice">
					<zeco-project-notice :company-id="companyId" :company-logo="details.companyLogo"></zeco-project-notice>
				</mt-tab-container-item>
			</mt-tab-container>
		</section>
	</div>
</template>
<script>
	import BidNotice from './bid-notice.vue';
	import BidWinNotice from './bid-win-notice.vue';
	import RecruitNotice from './recruit-notice.vue';
	import ProjectNotice from './project-notice.vue';
	import { getScreenHeight } from '../../utils/fixtools.js';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import apis from '../../api/index.js';
	import { loginStatus, userToken } from '../../vuex/getters.js';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-demond',
		data () {
			return {
				selected: 'recruit-notice',
				companyId: null,
				details: {},
				isLogin: false,
				token: ''
			};
		},
		vuex: {
			getters: {
				loginStatus,
				userToken
			}
		},
		route: {
			data (transition) {
				Indicator.open('加载中...');
				this.companyId = this.$route.params.demond_no;
				this.$http.get(apis.urls.companyLatestStatus, {params: {id: this.companyId}}).then((response) => {
					Indicator.close();
					this.details = apis.pures.pureCompanyLatestStatus(response.body);
				}, (response) => {
					Indicator.close();
					apis.errors.errorCompanyLatestStatus(response, this);
				});
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 修正高度
			let height = getScreenHeight();
			document.querySelector('.mint-tab-container').style.minHeight = `${(height - 219)}px`;
			// 获取登录参数
			this.isLogin = true;
			if (this.loginStatus === 'out') {
				if (readLocal('user') === false || readLocal('user').loginStatus === 'out') {
					this.isLogin = false;
				}
			}
			if (this.userToken) {
				this.token = this.userToken;
			} else if (readLocal('user') !== false && readLocal('user').token) {
				this.token = readLocal('user').token;
			}
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[BidNotice.name]: BidNotice,
			[BidWinNotice.name]: BidWinNotice,
			[TabContainer.name]: TabContainer,
			[RecruitNotice.name]: RecruitNotice,
			[ProjectNotice.name]: ProjectNotice,
			[TabContainerItem.name]: TabContainerItem
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.zeco-demond .company-base{
		@include border-bottom($border-color);
	}
	.zeco-demond .company-base .company-name-bar{
		padding: 15px 10px;
		background-color: #453c33;
		text-align: left;
		color: $color-white;
	}
	.zeco-demond .company-base .company-pic{
		background-color: $color-white;
	}
	.zeco-demond .company-base .company-pic img{
		width: 100%;
		background-color: $color-white;
	}

	.zeco-demond .company-detail{
		margin-top: 15px;
		background-color: $color-white;
		@include border-top($border-color);
	}

	.zeco-demond .page-part .mint-tab-item-label{
		font-size: 14px;
	}
</style>