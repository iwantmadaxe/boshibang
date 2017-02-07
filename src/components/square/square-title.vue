<template>
	<div class="square-title cl-fx" :class="{'border-bottom-gray': border === true}">
		<span class="square-topic square-topic-icon one-line">{{topic}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			topic: {
				default: ''
			},
			border: {
				default: true
			}
		}
	};
</script>

<style lang="scss" scoped>
	.border-bottom-gray {
		border-bottom: 0.01rem solid #e5e5e5;
	}
	.square-topic-icon {

	}
	.square-topic {
		font-size: 0.15rem;
		display: block;
		padding-left: 0.1rem;
		margin: 0.15rem 0;
		text-align: left;
		border-left: 0.03rem solid #c91425;
	    height: 0.15rem;
    	line-height: 0.15rem;
    	color: #000;
	}
</style>
