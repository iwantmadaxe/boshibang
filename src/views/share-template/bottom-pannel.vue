<template>
	<div class="bottom-bar-pannel">
		<mt-tabbar v-model="currentTabSelected" :fixed="fixed">
			<mt-tab-item id="home" @click.native="goPath('home')">
				<img slot="icon" v-if="currentTabSelected === 'home'" src="../../assets/images/tab-bars/home-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/home.png">
				企业服务
			</mt-tab-item>
			<mt-tab-item id="enroll" @click.native="goPath('OrderMine')">
				<img slot="icon" v-if="currentTabSelected === 'enroll'" src="../../assets/images/tab-bars/wait-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/wait.png">
				订单列表
			</mt-tab-item>
			<mt-tab-item id="shoppingcart" @click.native="goPath('ShoppingCart')">
				<img slot="icon" v-if="currentTabSelected === 'shoppingcart'" src="../../assets/images/tab-bars/wait-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/wait.png">
				购物车列表
			</mt-tab-item>
			<mt-tab-item id="mine" @click.native="goPath('mine')">
				<img slot="icon" v-if="currentTabSelected === 'mine'" src="../../assets/images/tab-bars/my-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/my.png">
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';

	export default {
		name: 'boss-bottom-pannel',
		props: {
			tabSelected: {
				default: 'home'
			}
		},
		data () {
			return {
				currentTabSelected: this.tabSelected,
				fixed: true
			};
		},
		watch: {
			tabSelected (val) {
				this.currentTabSelected = val;
			}
		},
		components: {
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem
		},
		methods: {
			goPath (place) {
				// 跳转<>
				if (place === 'home') {
					this.$router.push({name: 'Index'});
					return false;
				}
				// 跳转<>
				if (place === 'OrderMine') {
					this.$router.push({name: 'OrderMine'});
					return false;
				}
				// 跳转<>
				if (place === 'ShoppingCart') {
					this.$router.push({name: 'ShoppingCart'});
					return false;
				}
				// 跳转<>
				if (place === 'mine') {
					this.$router.push({name: 'Mine'});
					return false;
				}

				return true;
			}
		}
	};
</script>

<style scoped lang="scss">
	@import '../../assets/sass/partials/_var.scss';

	/* .bottom-bar-pannel{
		height: 0.55rem;
	} */
	.bottom-bar-pannel .mint-tabbar > .mint-tab-item.is-selected {
	    color: #ca1728;
	}
</style>
