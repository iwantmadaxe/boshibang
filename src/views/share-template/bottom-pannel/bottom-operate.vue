<template>
	<div class="bottom-bar-pannel">
		<mt-tabbar :selected.sync="tabSelected" :fixed="fixed">
			<div class="consult">
				马上咨询
			</div>
			<div class="go-reg">
				我要注册
			</div>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';

	export default {
		name: 'bs-bottom-operate',
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
		}
	};
</script>

<style scoped>
	.consult {
		font-size: 0.15rem;
		background: #ef8a01;
		height: 0.4rem;
		line-height: 0.4rem;
		color: #fff;
	    width: 50%;
    	text-align: center;
	}
	.go-reg {
		font-size: 0.15rem;
		background: #c91425;
		height: 0.4rem;
		line-height: 0.4rem;
		color: #fff;
	    width: 50%;
    	text-align: center;
	}
</style>
