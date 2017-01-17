<template>
	<div class="search-container">
		<div class="search-box-cover"></div>
		<div class="search-box">
			<div class="search-icon">
				<span class="search-icon-logo">
					<slot name="search-icon-logo"></slot>
				</span>
			</div>
			<form class="search-form">
				<div class="search-form-box" @click="goSearch">
					<span class="search-form-icon"><slot name="search-form-icon"></slot></span>
					<div class="search-form-input">
						<input type="text" name="keywords" autocomplete="off" maxlength="20" placeholder="输入内容" :disabled="disabled" v-model="searchName">
					</div>
				</div>
			</form>
			<div class="search-btn">
				<slot name="search-btn"></slot>
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
	}

	.search-box-cover{
		background: $search-bar-gradient-color;
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 40px;
		top: 0;
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
	}

	.search-box{
		position: relative;
		width: 100%;
		height: 40px;
		line-height: 40px;
		color: inherit;
		overflow: hidden;
	}
	
	.search-form-icon{
		display: inline-block;
		width: 20px;
	    height: 20px;
	    margin-left: 8px;
	}

	.search-icon{
		display: inline-block;
	    height: 100%;
	    overflow: hidden;
	    position: absolute;
	    left: 10px;
	}
	
	.search-icon-logo{
		display: inline-block;
	    overflow: hidden;
	    margin-top: 5px;
	}

	.search-form{
		margin-left: 56px;
		padding-right: 105px;
		display: inline-block;
		height: 100%;
		width: 100%;
	}

	.search-form-box{
		background: #fff;
		border-radius: 15px;
		height: 30px;
		margin-top: 5px;
		overflow: hidden;
	}

	.search-form-input{
		height: 100%;
		display: inline-block;
		width: 80%;
	}

	.search-form-input input{
		color: #989191;
		border: 0;
		display: inline-block;
		background: 0;
		font-size: 13px;
		line-height: 1.2em;
		height: 1.2em;
		width: 100%;
		vertical-align: middle;
		margin-top: -13px;
		color: #666;
	}

	.search-btn{
		display: inline-block;
		position: absolute;
		color: inherit;
		right: 10px;
		top: 0;
	}
</style>
