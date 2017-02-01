<template>
	<div class="register">
		<mt-navbar class="page-part" :selected.sync="selected">
			<mt-tab-item id="supplier">我是供应商</mt-tab-item>
			<mt-tab-item id="developer">我是开发商</mt-tab-item>
		</mt-navbar>

		<mt-tab-container :active.sync="selected" swipeable>
			<mt-tab-container-item id="supplier">
				<zeco-register-sup></zeco-register-sup>		
			</mt-tab-container-item>
			<mt-tab-container-item id="developer">
				<zeco-register-dev></zeco-register-dev>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import RegisterG from './register-g.vue';
	import RegisterK from './register-k.vue';
	import { loginStatus } from '../../vuex/getters.js';    // 全局参数
	import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-register',
		data () {
			return {
				selected: 'developer'
			};
		},
		vuex: {
			getters: {
				loginStatus
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
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[RegisterG.name]: RegisterG,
			[RegisterK.name]: RegisterK,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	.register  .page-part {
	    margin-bottom: 15px;
	}
	.register .mint-navbar .mint-tab-item:nth-child(2n+1){
		@include border-right(#d9d9d9);
	}
	.register .mint-navbar .mint-tab-item .mint-tab-item-label{
		font-size: 15px;
	}
</style>
