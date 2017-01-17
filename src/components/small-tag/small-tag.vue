<template>
	<span class="icon-tag" v-text="tagName"></span>
</template>

<script>
	export default {
		name: 'small-tag',
		props: {
			tagName: {
				default: ''
			}
		}
	};
</script>

<style>
	.icon-tag{
		border-radius: 5px;
		background-color: #fcc854;
		padding: 2px 5px;
		color: #fff;
	}	
</style>
