<template>
	<div class="search-container">
		<div class="user-top-nav-shadow">
		</div>
		<div class="user-top-nav">
			<div class="user-info-con">
				<div class="rad user-head">
					<img v-bind:src="mine.avatar?mine.avatar: defaultAvatar">
				</div>
				<div class="user-info">
					<div class="user-info-row">
						<span class="username">{{mine.name}}</span>
						<span class="level">v{{mine.level}}</span>
					</div>
					<div class="user-info-row">
						<img v-for="n in mine.star" class="star" src="../../assets/images/index/star.png">
					</div>
				</div>
			</div>
			<a class="index-search" @click="goSearchPage">
				搜索
			</a>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import apis from '../../apis';
	import axios from 'axios';

	const DefaultAvatar = require('../../assets/images/my/my-default-head.png');

	export default {
		name: 'search-bar',
		data () {
			return {
				mine: {},
				defaultAvatar: DefaultAvatar
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			let mineCache = readLocal('mine');
			if (mineCache) {
				this.$nextTick(() => {
					Indicator.close();
				});
				this.mine = mineCache;
			} else {
				axios.get(apis.urls.mine)
				.then((response) => {
					Indicator.close();
					this.mine = response.data.data;
					saveLocal('mine', this.mine);
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		methods: {
			goSearchPage () {
				this.$router.push({name: 'Search'});
			}
		},
		components: {
			[Indicator.name]: Indicator
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
