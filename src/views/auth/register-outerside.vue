<template>
	<div class="register-foreign bg-gray">
		<div class="register-foreign-banner">

		</div>
		<mt-navbar class="page-part" :selected.sync="selected">
			<mt-tab-item id="foreign-stand">外资代表处</mt-tab-item>
			<mt-tab-item id="foreign-only">外商独资</mt-tab-item>
			<mt-tab-item id="chinese-foreign-cooperative">中外合作</mt-tab-item>
			<mt-tab-item id="sino-foreign-joint-venture">中外合资</mt-tab-item>
		</mt-navbar>
		<mt-tab-container :active.sync="selected" swipeable>
			<mt-tab-container-item id="foreign-stand">
				<boss-foreign-stand></boss-foreign-stand>		
			</mt-tab-container-item>
			<mt-tab-container-item id="foreign-only">
				<boss-foreign-only></boss-foreign-only>
			</mt-tab-container-item>
			<mt-tab-container-item id="chinese-foreign-cooperative">
				<boss-chinese-foreign-cooperative></boss-chinese-foreign-cooperative>
			</mt-tab-container-item>
			<mt-tab-container-item id="sino-foreign-joint-venture">
				<boss-sino-foreign-joint-venture></boss-sino-foreign-joint-venture>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import RegisterForeignStand from './register-foreign-stand.vue';
	import RegisterForeignOnly from './register-foreign-only.vue';
	import RegisterChineseForeignCooperative from './register-chinese-foreign-cooperative.vue';
	import RegisterSinoForeignJointVenture from './register-sino-foreign-joint-venture.vue';
	import { getScreenHeight } from '../../utils/fixtools.js';
	import { loginStatus } from '../../vuex/getters.js';    // 全局参数
	import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';

	export default {
		name: 'bs-register-outerside',
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
		ready () {
			// 修正高度
			let height = getScreenHeight();
			document.querySelector('.mint-tab-container').style.height = ((height - 64) + 'px');
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[RegisterForeignStand.name]: RegisterForeignStand,
			[RegisterForeignOnly.name]: RegisterForeignOnly,
			[RegisterChineseForeignCooperative.name]: RegisterChineseForeignCooperative,
			[RegisterSinoForeignJointVenture.name]: RegisterSinoForeignJointVenture
		}
	};
</script>

<style lang="scss">
	.register-foreign {
	}
	.register-foreign-banner {
		background-image: url("../../assets/images/reg/register-foreign-banner.png");
		background-size: 100% 100%;
		background-color: #38546f;
		height: 7.5rem;
		width: 100%;
	}
</style>
