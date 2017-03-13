<template>
	<div class="zeco-supplier">
		<div class="supplier-head">
			<div class="head-bars">
				<odin-my-head :is-login="isLogin" :user-info="user"></odin-my-head>
			</div>
		</div>
		<div class="supplier-content">
			<div class="supplier-notice">
				<mt-cell title="个人信息" is-link :to="{name: 'MineInfo'}">
					<img slot="icon" src="../../assets/images/my/1.png" width="20">
				</mt-cell>
			</div>
			<div class="supplier-bar">
				<mt-cell title="地址管理" is-link :to="{name: 'MineAddress'}">
					<img slot="icon" src="../../assets/images/my/6.png" width="20">
				</mt-cell>
			</div>
		</div>

		<!-- 底部栏 -->
		<odin-bottom-pannel tab-selected="mine"></odin-bottom-pannel>
	</div>
</template>
<script>
	import { Cell } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import MyHead from '../share-template/my-head.vue';
	import { getCookie } from '../../utils/cookie.js';
	import apis from '../../apis';
	import axios from 'axios';

	export default {
		name: 'odin-mine',
		data () {
			return {
				isLogin: false,
				user: {
					phone: '',
					logo: null
				}
			};
		},
		created () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';

			// 获取登录状态
			this.isLogin = getCookie('has_auth');

			axios.get(apis.urls.register)
			.then((response) => {
				this.user.phone = response.data.data.phone;
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});
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
</style>
