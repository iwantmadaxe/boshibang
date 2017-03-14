<template>
	<div class="search-container">
		<div class="user-top-nav-shadow">
		</div>
		<div class="user-top-nav">
			<div class="user-info-con">
				<div class="rad user-head">
					<img src="../../assets/images/example/user-head.png">
				</div>
				<div class="user-info">
					<div class="user-info-row">
						<span class="username">陆金所小鹿</span>
						<div class="level">v1
						</div>
					</div>
					<div class="user-info-row">
						<img class="star" src="../../assets/images/index/star.png">
						<img class="star" src="../../assets/images/index/star.png">
					</div>
				</div>
			</div>
			<div class="index-search">
				搜索
			</div>
		</div>
	</div>
</template>

<script>
	import { getScrollTop } from '../../utils/fixtools.js';
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
			goSearch (e) {
				if (this.searchPlace && typeof this.searchPlace === 'function') {
					this.searchPlace(e);
				}
				return false;
			}
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	.search-container{
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		z-index: $z-index-middle;
		width: 100%;
		height: 0.46rem;
	}
</style>
