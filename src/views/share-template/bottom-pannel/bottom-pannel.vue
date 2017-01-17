<template>
	<div class="bottom-bar-pannel">
		<mt-tabbar :selected.sync="tabSelected" :fixed="fixed">
			<mt-tab-item id="home" @click="goPath('home')">
				<img slot="icon" v-if="tabSelected === 'home'" src="../../../assets/images/tab-bars/home-confirm.png">
				<img slot="icon" v-else src="../../../assets/images/tab-bars/home.png">
				首页
			</mt-tab-item>
			<mt-tab-item id="enroll" @click="goPath('enroll')">
				<img slot="icon" v-if="tabSelected === 'enroll'" src="../../../assets/images/tab-bars/wait-confirm.png">
				<img slot="icon" v-else src="../../../assets/images/tab-bars/wait.png">
				待报名
			</mt-tab-item>
			<mt-tab-item id="mine" @click="goPath(role)">
				<img slot="icon" v-if="tabSelected === 'mine'" src="../../../assets/images/tab-bars/my-confirm.png">
				<img slot="icon" v-else src="../../../assets/images/tab-bars/my.png">
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';

	export default {
		name: 'zeco-bottom-pannel',
		props: {
			tabSelected: 'home',
			role: ''
		},
		data () {
			return {
				fixed: true
			};
		},
		components: {
			[Tabbar.name]: Tabbar,
			[TabItem.name]: TabItem
		},
		methods: {
			goPath (place) {
				if (place === 'home') {
					this.$router.go({name: 'Home'});
					return false;
				}

				if (place === 'enroll') {
					this.$router.go({name: 'WaitApply'});
					return false;
				}

				// 跳转<我的>需要判断登录和用户类型. 未登录则跳登录页面
				if (place === '') {
					this.$route.router.go({name: 'Login'});
				} else if (place === 'Developer') {
					this.$route.router.go({name: 'Developer'});
				} else if (place === 'Supplier') {
					this.$route.router.go({name: 'Supplier'});
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
