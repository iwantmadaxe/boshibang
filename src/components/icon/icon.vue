<template>
	<i :class="className"></i>
</template>

<script>
export default {
	name: 'k-icon',
	props: {
		type: String
	},
	computed: {
		className () {
			return `${this.type}`;
		}
	}
};
</script>