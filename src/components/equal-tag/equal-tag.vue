<template>
	<span class="icon-tag one-line" v-text="tagName"></span>
</template>

<script>
	export default {
		name: 'equal-tag',
		props: {
			tagName: {
				default: ''
			}
		}
	};
</script>

<style lang='scss'>
	@import '../../assets/sass/partials/_base.scss';

	.icon-tag{
		display: block;
		text-align: center;
		border-radius: 5px;
		background-color: #fcc854;
		color: #fff;
	}	
</style>
