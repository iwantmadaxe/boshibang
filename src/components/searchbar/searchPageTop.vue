<template>
	<div class="search-page-top">
		<mt-search
		:value.sync="value"
  		cancel-text="取消"
  		placeholder="搜索"></mt-search>
	</div>
</template>

<script>
	import { getScrollTop } from '../../utils/fixtools.js';
	import { Search } from 'mint-ui';

	export default {
		name: 'search-bar',
		data () {
			return {};
		},
		props: {
			searchPlace: {
				default: null
			},
			disabled: {
				type: Boolean,
				default: false
			},
			searchName: {
				default: ''
			}
		},
		components: {
			[Search.name]: Search
		},
		ready () {
			// searchbar的渐变色
			let scrollTop = 0;
			let fullHeight = 300;
			let fullOpacity = 0.85;
			let opacity = 0;
			document.onscroll = function () {
				scrollTop = getScrollTop();
				opacity = scrollTop / fullHeight;
				if (opacity <= fullOpacity) {
					if (document.querySelector('.search-box-cover')) {
						document.querySelector('.search-box-cover').style.opacity = opacity;
					}
				} else {
					if (document.querySelector('.search-box-cover')) {
						document.querySelector('.search-box-cover').style.opacity = fullOpacity;
					}
				}
			};
		},
		methods: {
			goSearchPage () {
				this.$router.push({name: 'Search'});
			}
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	.search-page-top {
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		z-index: $z-index-middle;
		width: 100%;
		height: 0.46rem;
		background: #d45968;
		font-size: $input-text;
	    padding: 0 4%;
	}
	.search-page-top .mint-searchbar {
	    background-color: #d45968;
	}
	.search-page-top .mint-searchbar-cancel {
		color: #fff;
	}
	.search-page-top .mint-searchbar-placeholder .mintui-search {
		margin-right: 0.05rem;
	}
	.search-page-top .mint-searchbar-core {
		margin-left: 0.05rem;
	}
	.search-page-top .mint-search {
		height: 100%;
	}
</style>
