<template>
	<div class="search-page-top">
		<slot name="left-field">
		</slot>
		<slot name="right-btn">
		</slot>
	</div>
</template>

<script>
	import { getScrollTop } from '../../utils/fixtools.js';
	import { Indicator } from 'mint-ui';

	export default {
		name: 'search-bar',
		data () {
			return {
			};
		},
		components: {
			[Indicator.name]: Indicator
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
        display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		.search-con {
		    -webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 1;
		    padding: 0;
		}
	    .search-btn {
			width: 0.3rem;
			display: block;
			height: 0.46rem;
			line-height: 0.46rem;
	    }
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
	.search-page-top .mint-searchbar-cancel {
		display: none;
	}
	.search-page-top .mint-search-list {
		display: none;
	}
</style>
