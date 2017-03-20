<template>
	<div class="search">
		<!-- 头部搜索 -->
		<div class="fixedtop">
			<search-page-top :result="result" :current-value="currentValue">
				<div slot="left-field" class="search-con">
					<mt-search
					v-model:current-value.sync="currentValue"
			  		placeholder="搜索">
			  		</mt-search>
				</div>
				<a slot="right-btn" @click="search" class="search-btn">
					搜索
				</a>
			</search-page-top>
		</div>
		<div class="result-con" v-show="result.length !== 0">
			<div class="search-list-square" v-for="item in result">
				<search-square :detail="item">
				</search-square>
			</div>
		</div>
		<div class="search-con" v-show="result.length === 0">
			<p class="no-result">无搜索结果！</p>
			<p class="search-history">历史搜索</p>
			<div class="search-history-list-con cl-fx">
				<div @click="searchKeyword(historyItem)" class="search-history-row" v-for="historyItem in historyList">
					<img class="icon" src="../../assets/images/index/mag-gray.png">
					<span class="one-line history-text">{{historyItem}}</span>
				</div>
			</div>
			<div class="clear-search" @click="emptyHistory">
				清除搜索记录
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, Indicator, MessageBox, Search } from 'mint-ui';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import SearchPageTop from '../../components/searchbar/searchPageTop.vue';
	import SearchSquare from '../../views/search/search-square.vue';

	export default {
		name: 'boss-search',
		data () {
			return {
				result: [],
				currentValue: '',
				searchHistory: []
			};
		},
		computed: {
			historyList () {
				return this.searchHistory.slice(-5);
			}
		},
		created () {
			let history = readLocal('searchHistory');
			if (history) {
				this.searchHistory = history;
			}
		},
		methods: {
			search () {
				if (this.currentValue === '') {
					MessageBox.alert('请输入关键词！', '提示');
					return false;
				}
				this.searchHistory.push(this.currentValue);
				saveLocal('searchHistory', this.searchHistory);
				this.searchKeyword(this.currentValue);
			},
			searchKeyword (keyword) {
				Indicator.open('加载中...');
				axios.get(apis.urls.search, {params: {keyword: keyword}})
				.then((response) => {
					Indicator.close();
					if (response.data) {
						this.result = response.data.data;
					}
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			},
			emptyHistory () {
				this.searchHistory = [];
				saveLocal('searchHistory', '');
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			[Indicator.name]: Indicator,
			[MessageBox.nae]: MessageBox,
			[Search.name]: Search,
			SearchPageTop,
			SearchSquare
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.search .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
	}
	.search .search-con {
		padding-top: 0.46rem;
	}
	.search .search-con .search-history {
	    width: 100%;
	    padding: 0 5%;
	    text-align: left;
	    margin: 0.2rem 0 0.1rem;
	    color: $color-text;
	    font-size: $normal-text;
	}
	.search .search-history-list-con {
	    width: 100%;
	    background: #fff;
	}
	.search .search-history-list-con .search-history-row {
	    width: 94%;
	    margin-left: 6%;
	    border-bottom: 0.01rem solid $border-gray;
	    height: 0.4rem;
	    line-height: 0.4rem;
	    font-size: $page-title;
	}
	.search .search-history-row .history-text {
		color: $color-black;
		text-align: left;
	}
	.search .search-history-row .icon {
	    float: left;
	    width: 0.12rem;
	    margin: 0.14rem 0.1rem 0 0;
	}
	.search .clear-search {
		width: 100%;
	    text-align: center;
	    height: 0.45rem;
	    line-height: 0.45rem;
	    background: #fff;
	    font-size: $big-text;
	    color: $cell-value-color;
	}
	.search .result-con {
		background: $color-white;
		padding-top: 0.6rem;
		.search-list-square {
			width: 90%;
			margin: 0 auto;
			&:not(:last-child) {
				@include border-bottom($border-color);
			}
		}
	}
	.search .no-result {
	    width: 100%;
	    padding: 0.2rem 5% 0.1rem;
	    text-align: left;
	    color: $color-text;
	    font-size: $normal-text;
	    background: $color-white;
	}
</style>
