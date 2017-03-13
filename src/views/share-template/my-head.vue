<template>
	<div class="odin-my-head cl-fx">
		<div class="my-pic">
			<div class="poster">
				<img :src="userInfo.logo ? userInfo.logo : myDefaultHead">
			</div>
		</div>
		<div class="user-info">
			<div class="nick-info">
				<span class="nick-name one-line">{{ userInfo.phone ? userInfo.phone : '' }}</span>
				<span class="nick-edit">
					<router-link :to="{name: 'MineInfo'}">
						<!-- <div style="width: 15px; height: 18px;"></div> -->
						<img src="../../assets/images/my/edit.png">
					</router-link>
				</span>
			</div>
			<div class="addition-info">暂无信息</div>
		</div>
		<div class="user-for-auth" v-if="!isLogin">
			<mt-button size="small" @click="goRegister">请注册 >></mt-button>
		</div>
	</div>
</template>
<script>
	import { Button } from 'mint-ui';
	const myDefaultHead = require('../../assets/images/my/my-default-head.png');

	export default {
		name: 'odin-my-head',
		data () {
			return {
				myDefaultHead: myDefaultHead
			};
		},
		props: {
			isLogin: {
				default: function () {
					return false;
				}
			},
			userInfo: {
				default: null
			}
		},
		components: {
			[Button.name]: Button
		},
		methods: {
			goRegister () {
				this.$router.push({name: 'Register'});
				return false;
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	
	.odin-my-head .my-pic,
	.odin-my-head .user-info{
		float: left;
	}
	.odin-my-head .user-for-auth{
		float: right;
	}

	// 头像
	.odin-my-head .my-pic{
		width: 58px;
		height: 58px;
		padding: 2px;
		border-radius: 100%;
		background-color: $color-white;
		overflow: hidden;
	}
	.odin-my-head .my-pic .poster{
		width: 54px;
		height: 54px;
		border-radius: 100%;
		overflow: hidden;
		position: relative;
	}
	.odin-my-head .my-pic img{
		width: 100%;
	    position: absolute;
	    display: block;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	}

	// 信息|用户
	.odin-my-head .user-info{
		margin-left: 10px;
		margin-top: 4px;
		font-size: 0.8rem;
		max-width: 40%;
	}
	.odin-my-head .user-info .nick-name,
	.odin-my-head .user-info .nick-edit{
		display: inline-block;
		vertical-align: middle;
		color: $color-white;
	}
	.odin-my-head .user-info .nick-name{
		max-width: 80%;
		float: left;
	}
	.odin-my-head .user-info .nick-edit{
		width: 15px;
		margin-left: 5px;
		overflow: hidden;
	}
	.odin-my-head .user-info .nick-edit img{
		width: 100%;
	}
	.odin-my-head .addition-info{
		text-align: left;
		color: #fff;
		margin-top: 5px;
	}

	// 认证
	.odin-my-head .user-for-auth{
		margin-top: 9px;
	}
	.odin-my-head .user-for-auth .mint-button{
		background-color: #ffda44;
		color: $bid-color;
		border-radius: 17px;
	}
</style>
