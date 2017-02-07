<template>
	<div class="register-foreign bg-gray" style="padding-bottom: 0.55rem;">
		<div class="register-domestic-banner register-banner">
			<img class="banner-img" src="../../assets/images/reg/register-domestic-banner.png" />
		</div>
		<mt-navbar class="page-part" :selected.sync="selected">
			<mt-tab-item id="custom-registration">定制注册</mt-tab-item>
			<mt-tab-item id="urban-register">市区版</mt-tab-item>
			<mt-tab-item id="noworry-register">无忧版</mt-tab-item>
			<mt-tab-item id="support-register">扶持版</mt-tab-item>
		</mt-navbar>
		<mt-tab-container :active.sync="selected" swipeable style="margin-top: 0.12rem;">
			<mt-tab-container-item id="custom-registration">
				<boss-custom-registration></boss-custom-registration>
			</mt-tab-container-item>
			<mt-tab-container-item id="urban-register">
				<boss-custom-registration></boss-custom-registration>
			</mt-tab-container-item>
			<mt-tab-container-item id="noworry-register">
				<boss-custom-registration></boss-custom-registration>
			</mt-tab-container-item>
			<mt-tab-container-item id="sinsupport-register">
				<boss-custom-registration></boss-custom-registration>
			</mt-tab-container-item>
		</mt-tab-container>
		<bs-bottom-operate tab-selected="home" :role="role"></bs-bottom-operate>
	</div>
</template>

<script>
	import RegisterCustomRegistration from './register-custom-registration.vue';
	import { loginStatus } from '../../vuex/getters.js';    // 全局参数
	import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel/bottom-operate.vue';

	export default {
		name: 'bs-register-domestic',
		data () {
			return {
				selected: 'custom-registration'
			};
		},
		vuex: {
			getters: {
				loginStatus
			}
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[RegisterCustomRegistration.name]: RegisterCustomRegistration,
			[BottomPannel.name]: BottomPannel
		}
	};
</script>
