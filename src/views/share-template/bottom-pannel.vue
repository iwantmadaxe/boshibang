<template>
	<div class="bottom-bar-pannel">
		<mt-tabbar v-model="currentTabSelected" :fixed="fixed">
			<mt-tab-item id="home" @click.native="goPath('home')">
				<img slot="icon" v-if="currentTabSelected === 'home'" src="../../assets/images/tab-bars/home-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/home.png">
				创建订单
			</mt-tab-item>
			<mt-tab-item id="enroll" @click.native="goPath('enroll')">
				<img slot="icon" v-if="currentTabSelected === 'enroll'" src="../../assets/images/tab-bars/wait-confirm.png">
				<img slot="icon" v-else src="../../assets/images/tab-bars/wait.png">
				订单列表
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
		name: 'odin-bottom-pannel',
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
				// 跳转<订单创建>
				if (place === 'home') {
					this.$router.push({name: 'OrderCreate'});
					return false;
				}
				// 跳转<订单列表>
				if (place === 'enroll') {
					this.$router.push({name: 'OrderList'});
					return false;
				}

				// 跳转<我的>
				if (place === 'mine') {
					this.$router.push({name: 'Mine'});
					return false;
				}

				return true;
			}
		}
	};
</script>

<style scoped>
	.bottom-bar-pannel{
		height: 55px;
	}
</style>
