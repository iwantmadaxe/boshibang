<template>
	<div class="zeco-my-news">
		<div class="none-news"><span>暂无消息</span></div>
	</div>
</template>
<script>
	export default {
		name: 'zeco-my-news',
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		}
	};
</script>
<style>
	.zeco-my-news .none-news{
		padding: 15px 0;
		background-color: #fff;
		color: #b5b5b5;
	}
</style>