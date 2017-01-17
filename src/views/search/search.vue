<template>
	<div class="zeco-search">
		<!-- 搜索控件 -->
		<section class="search-bar-head">
			<!-- 搜索框 -->
			<div class="zeco-search-bar">
				<search-bar :search-name.sync="keyword">
					<img src="../../assets/images/home/logo-icon.png" slot="search-icon-logo" width="44">
					<img src="../../assets/images/home/search.png" slot="search-form-icon" width="20">
					<a @click="goSearch" slot="search-btn" class="search-btn-content">
						<span class="search-login-icon">搜索</span>
					</a>
				</search-bar>	
			</div>

			<!-- 搜索项目 -->
			<div class="zeco-search-pro">
				<mt-navbar class="page-part" :selected.sync="selected">
					<mt-tab-item id="1">招募</mt-tab-item>
					<mt-tab-item id="2">招标</mt-tab-item>
					<mt-tab-item id="3">开发商</mt-tab-item>
					<mt-tab-item id="4">供应商</mt-tab-item>
				</mt-navbar>
			</div>

			<!-- 历史搜索 -->
			<div class="zeco-search-history">
				<p class="history-title">常用搜索</p>
				<div class="history-tag-list">
					<ul class="cl-fx">
						<li v-for="historyItem in searchHistory">
							<div class="history-tag" @click="giveKeyWord(historyItem)">
								<equal-tag :tag-name="historyItem"></equal-tag>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- 分类列表 -->
		<section class="category-full">
			<zeco-search-full :selected="selected" :height="height"></zeco-search-full>
		</section>
	</div>
</template>

<script>
	import SearchBar from '../../components/searchbar/searchbar.vue';
	import { Navbar, TabItem } from 'mint-ui';
	import EqualTag from '../../components/equal-tag/equal-tag.vue';
	import SearchFull from './search-full.vue';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-search',
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[EqualTag.name]: EqualTag,
			[SearchBar.name]: SearchBar,
			[SearchFull.name]: SearchFull
		},
		data () {
			return {
				selected: '1',
				keyword: '',
				searchHistory: [],
				height: '-199'
			};
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 获取搜索历史
			this.searchHistory = readLocal('searchHistory') !== false ? readLocal('searchHistory') : [];
			// 获取搜索头部高度
			this.$nextTick(function () {
				this.height = '-' + (Number(document.querySelector('.search-bar-head').offsetHeight) + 20);
			});
		},
		methods: {
			goSearch () {
				let tpl = this.keyword.trim();
				if (tpl) {
					if (this.searchHistory.indexOf(tpl) === -1) {
						if (this.searchHistory.length >= 5) {
							this.searchHistory.shift();
							this.searchHistory.push(tpl);
						} else {
							this.searchHistory.push(tpl);
						}
						saveLocal('searchHistory', this.searchHistory);
					}
				}
				if (this.selected === '1') {
					this.$route.router.go({name: 'RecruitList', query: {keyword: this.keyword}});
					return false;
				}
				if (this.selected === '2') {
					this.$route.router.go({name: 'BidList', query: {keyword: this.keyword}});
					return false;
				}
				if (this.selected === '3') {
					this.$route.router.go({name: 'DemondList', query: {keyword: this.keyword}});
					return false;
				}
				if (this.selected === '4') {
					this.$route.router.go({name: 'SupplyList', query: {keyword: this.keyword}});
					return false;
				}
				this.$route.router.go({name: 'RecruitList', query: {keyword: this.keyword}});
			},
			giveKeyWord (word) {
				this.keyword = word;
			}
		}
	};
</script>

<style lang="scss">
	// 搜索框
	.zeco-search .zeco-search-bar{
		padding: 10px 0 0 0;
		background-color: #fff;
	}
	.zeco-search .zeco-search-bar .search-form .search-form-box{
		background: #e8e8e8;
	}
	.zeco-search .zeco-search-bar .search-box-cover{
		background: #fff;
	}
	.zeco-search .zeco-search-bar .search-icon{
		display: none;
	}
	.zeco-search .zeco-search-bar .search-form{
		margin-left: 10px;
		padding-right: 80px;
	}
	.zeco-search .zeco-search-bar .search-form-input input{
		height: 100%;
	}
	.zeco-search .zeco-search-bar .search-btn{
		right: 10px;
	}
	.zeco-search .zeco-search-bar .search-btn-content{
		padding: 5px 10px;
		background-color: #fcc800;
		border-radius: 3px;
	}

	// 搜索项目
	.zeco-search .zeco-search-pro .mint-tab-item-label{
	    font-size: 14px;
	}
	.zeco-search .zeco-search-pro .mint-navbar .mint-tab-item.is-selected{
	    border-bottom: 3px solid #fcc800;
	    color: #fcc800;
	}

	// 历史搜索
	.zeco-search .zeco-search-history{
		background-color: #fff;
		padding-top: 20px; 
	}
	.zeco-search .zeco-search-history .history-title{
		text-align: left;
		padding-left: 10px;
		color: #9d9d9d;
	}
	.zeco-search .zeco-search-history .history-tag-list{
		padding: 13px 10px;
		text-align: left;
		font-size: 0.9rem;
	}
	.zeco-search .zeco-search-history li{
		float: left;
		width: 25%;
		line-height: 2;
	}
	.zeco-search .zeco-search-history .history-tag{
		margin: 2px 2px;
	}
	.zeco-search .history-tag .icon-tag{
		background-color: #ebebeb;
		color: #666;
	}

	// 分类列表
	.category-full{
		margin-top: 20px;
	}
</style>