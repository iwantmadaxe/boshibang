<template>
	<div class="zeco-my-head cl-fx">
		<div class="my-pic">
			<div class="poster">
				<img :src="userInfo ? userInfo.logo : ''">
			</div>
		</div>
		<div class="user-info">
			<div class="nick-info">
				<span class="nick-name one-line">{{ userInfo ? userInfo.phone : '' }}</span>
				<span class="nick-edit">
					<div style="width: 15px; height: 18px;"></div>
					<!-- <img src="../../../assets/images/my/edit.png"> -->
				</span>
			</div>
			<div class="auth-info">
				<div class="has-no-auth" v-if="authInfo === 0">
					<equal-tag tag-name="暂未认证" class="no-auth"></equal-tag>
				</div>
				<div class="has-no-auth" v-if="authInfo === 1">
					<equal-tag tag-name="认证中" class="auth-ing"></equal-tag>
				</div>
				<div class="has-auth" v-if="authInfo === 2">
					<span class="auth-confirm-icon"></span>
					<span>已认证企业</span>
				</div>
			</div>
		</div>
		<div class="user-for-auth" v-if="authInfo === 0">
			<mt-button size="small" @click.prevent="goAuth">企业认证 >></mt-button>
		</div>
	</div>
</template>
<script>
	import { Button } from 'mint-ui';
	import EqualTag from '../../../components/equal-tag/equal-tag.vue';

	export default {
		name: 'zeco-my-head',
		props: {
			authInfo: {
				default: function () {
					return 0;
				}
			},
			userInfo: {
				default: null
			}
		},
		components: {
			[Button.name]: Button,
			[EqualTag.name]: EqualTag
		},
		methods: {
			goAuth () {
				this.$route.router.go({name: 'Identification'});
				return false;
			}
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_var.scss';
	@import '../../../assets/sass/partials/_border.scss';
	
	.zeco-my-head .my-pic,
	.zeco-my-head .user-info{
		float: left;
	}
	.zeco-my-head .user-for-auth{
		float: right;
	}

	// 头像
	.zeco-my-head .my-pic{
		width: 58px;
		height: 58px;
		padding: 2px;
		border-radius: 100%;
		background-color: $color-white;
		overflow: hidden;
	}
	.zeco-my-head .my-pic .poster{
		width: 54px;
		height: 54px;
		border-radius: 100%;
		overflow: hidden;
		position: relative;
	}
	.zeco-my-head .my-pic img{
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
	.zeco-my-head .user-info{
		margin-left: 10px;
		margin-top: 4px;
		font-size: 0.8rem;
		max-width: 40%;
	}
	.zeco-my-head .user-info .nick-name,
	.zeco-my-head .user-info .nick-edit{
		display: inline-block;
		vertical-align: middle;
		color: $color-white;
	}
	.zeco-my-head .user-info .nick-name{
		max-width: 80%;
		float: left;
	}
	.zeco-my-head .user-info .nick-edit{
		width: 15px;
		margin-left: 5px;
		overflow: hidden;
	}
	.zeco-my-head .user-info .nick-edit img{
		width: 100%;
	}
	// 信息|认证
	.zeco-my-head .auth-info{
		margin-top: 5px; 
	}
	.zeco-my-head .auth-info .no-auth,
	.zeco-my-head .auth-info .auth-ing{
		width: 80%;
		color: $color-white;
		padding: 3px 6px;
		font-size: 12px;
		border-radius: 16px;
		background-color: #195590;
	}
	.zeco-my-head .has-auth{
		text-align: left;
	}
	.zeco-my-head .has-auth .auth-confirm-icon{
		display: inline-block;
		vertical-align: middle;
		color: $success-color;
		width: 16px;
		height: 16px;
		background: url("../../../assets/images/my/confirm.png") no-repeat;
		background-size: contain;
		background-color: transparent;
	}
	.zeco-my-head .has-auth>span{
		display: inline-block;
		vertical-align: middle;
		color: $color-white;
		padding-top: 1px;
	}

	// 认证
	.zeco-my-head .user-for-auth{
		margin-top: 9px;
	}
	.zeco-my-head .user-for-auth .mint-button{
		background-color: #ffda44;
		color: $bid-color;
		border-radius: 17px;
	}
</style>