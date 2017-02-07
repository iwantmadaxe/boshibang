<template>
	<div class="register-foreign bg-gray">
		<div class="register-foreign-banner register-banner">

		</div>
		<mt-navbar class="page-part" :selected.sync="selected">
			<mt-tab-item id="foreign-stand">外资代表处</mt-tab-item>
			<mt-tab-item id="foreign-only">外商独资</mt-tab-item>
			<mt-tab-item id="chinese-foreign-cooperative">中外合作</mt-tab-item>
			<mt-tab-item id="sino-foreign-joint-venture">中外合资</mt-tab-item>
		</mt-navbar>
		<mt-tab-container :active.sync="selected" swipeable style="margin-top: 0.12rem;">
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
		name: 'bs-register-foreign',
		data () {
			return {
				selected: 'foreign-stand'
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
	.mint-navbar .mint-tab-item.is-selected {
	    border-bottom: 0;
	    color: inherit;
	    margin-bottom: 0;
	    position: relative;
	}
	.mint-navbar .mint-tab-item.is-selected:after {
       	margin: auto;
	    height: 3px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: #c91425;
	    width: 70%;
	    content: "";
	}
	.register-tab-con {
		padding-bottom: 0.2rem;
	    background: #fff;
	}
	.register-foreign {
	}
	.register-foreign-banner {
		background-image: url("../../assets/images/reg/register-foreign-banner.png");
		background-size: 100% 100%;
		background-color: #38546f;
	}
	.register-tab-text {
		background: #fff;
		padding: 0 5%;
	}
	.register-tab-text .reg-title {
		font-size: 0.15rem;
		color: #000;
		text-align: left;
		padding: 10px 0;
		border-bottom: 1px solid #e6e6e6;
	}
	.register-tab-text .reg-context-con {
		font-size: 0.12rem;
		text-align: left;
		line-height: 0.24rem;
	    padding: 0.1rem 0;
	}
	.register-tab-text .reg-context-con .title {
		color: #333;
	}
	.register-tab-text .reg-context-con .context {
		font-size: 0.12rem;
		color: #969696;
		text-align: left;
	}
	.reg-progess-con {
		
	}
	.reg-progess-con .title{
		font-size: 0.14rem;
		color: #000;
	}
	.reg-progess-con .reg-progess-row{
		height: 0.24rem;
		margin: 0.05rem 0;
	}
	.reg-progess-con .reg-progess-row .choose-square{
		width: 33%;
		height: 0.24rem;
		line-height: 0.24rem;
	}
	.choose-square .icon{
		display: block;
		float: left;
		width: 0.12rem;
	    margin-right: 0.05rem;
    	margin-top: 0.06rem;
	}
	.choose-square span{
		font-size: 0.12rem;
		color: #969696;
		display: block;
		float: left;
		height: 0.24rem;
    	line-height: 0.24rem;
	}
	.reg-progess-con {
		padding: 0.1rem 5%;
		background: #faf8f8;
	}
	.reg-progess-con .reg-progess-row {
		padding: 0.05rem 0;
	}
</style>
