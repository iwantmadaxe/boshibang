<template>
	<section class="search-full">
		<div class="menu vux-1px-r">
			<x-scroller lock-x :height="height" v-el:scroller-l>
				<div class="search-bar-l">
					<ul>
						<li :class="['vux-1px-b', 'block-center-h', searchItem.active?'cur':'']" @click="chooseItem(searchItem)" v-for="searchItem in searchBarList">
							<span>{{ searchItem.name }}</span>
						</li>
					</ul>
				</div>
			</x-scroller>
		</div>
		<div class="module-list">
			<x-scroller lock-x scrollbar-y :height="height" v-el:scroller>
				<section>
					<div class="module module-cat" v-for="item in searchList">
						<p class="module-title one-line">
							<span>{{item.name}}</span>
						</p>
						<ul class="module-content cat-list cl-fx">
							<li class="one-line" v-for="contentItem in item.third">
								<a @click="goPath(contentItem.name)">
									<span class="m-title">
										{{contentItem.name}}
									</span>
								</a>
							</li>
						</ul>
					</div>
				</section>
			</x-scroller>
		</div>
	</section>
</template>

<script>
	import Scroller from '../../components/scroller/scroller.vue';
	import apis from '../../api';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';

	export default {
		name: 'zeco-search-full',
		data () {
			return {
				industryList: [],
				searchBarList: [],
				searchList: []
			};
		},
		props: {
			selected: {
				default: '1'
			},
			height: {
				default: '-199'
			}
		},
		beforeCompile () {
			// 获取地址 商品分类用
			let _this = this;
			let industryListCache = readLocal('IndustryList');
			if (industryListCache === false) {
				this.$http.get(apis.urls.industry, {params: {id: 0}}).then((response) => {
					this.industryList = response.body.industry_categories;
					saveLocal('IndustryList', response.body.industry_categories);
					// 给左边栏赋值
					this.searchBarList = this.industryList.map(function (itemName, index) {
						let tplItem = {
							id: null,
							name: '',
							active: false
						};
						if (index === 0) {
							tplItem.active = true;
							_this.searchList = itemName.second;
						}
						tplItem.id = itemName.id;
						tplItem.name = itemName.name;
						return tplItem;
					});
					// 重置高度
					this.$broadcast('scroller:reset', this.$els.scrollerL.id.split('-')[2]);
					return true;
				}, (response) => {
					apis.errors.errorIndustryList(response, this);
					return false;
				});
			} else {
				this.industryList = industryListCache;
			}
			this.searchBarList = this.industryList.map(function (itemName, index) {
				let tplItem = {
					id: null,
					name: '',
					active: false
				};
				if (index === 0) {
					tplItem.active = true;
					_this.searchList = itemName.second;
				}
				tplItem.id = itemName.id;
				tplItem.name = itemName.name;
				return tplItem;
			});
		},
		ready () {
			// 重置scroller
			this.$broadcast('scroller:reset', this.$els.scroller.id.split('-')[2]);
			this.$broadcast('scroller:reset', this.$els.scrollerL.id.split('-')[2]);
		},
		components: {
			[Scroller.name]: Scroller
		},
		methods: {
			chooseItem (bar) {
				let _this = this;
				if (bar.active === true) {
					return false;
				}
				for (let barItem of this.searchBarList) {
					if (barItem.active === true) {
						barItem.active = false;
					}
				}
				bar.active = true;
				for (let tpl of this.industryList) {
					if (tpl.id === bar.id) {
						_this.searchList = tpl.second;
						break;
					}
				}
				// 重置scroller
				this.$broadcast('scroller:reset', this.$els.scroller.id.split('-')[2]);
				return true;
			},
			goPath (path) {
				if (this.selected === '1') {
					this.$route.router.go({name: 'RecruitList', query: {industry: path}});
					return false;
				}
				if (this.selected === '2') {
					this.$route.router.go({name: 'BidList', query: {industry: path}});
					return false;
				}
				if (this.selected === '3') {
					this.$route.router.go({name: 'DemondList', query: {industry: path}});
					return false;
				}
				if (this.selected === '4') {
					this.$route.router.go({name: 'SupplyList', query: {industry: path}});
					return false;
				}
				this.$route.router.go({name: 'RecruitList', query: {industry: path}});
			}
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';

	.search-full .menu{
		width: 81px;
		float: left;
		background-color: #fff;
	}
	.search-full .search-bar-l ul{
		width: 80px;
	}
	.search-full .search-bar-l li{
		text-align: left;
		padding: 10px 5px;
		font-size: 14px;
		line-height: 1.2;
		min-height: 68px;
	}
	.search-full .vux-1px-b{
		@include border-bottom ($border-color);
	}
	.search-full .vux-1px-r{
		@include border-right ($border-color);
	}
	.search-full .search-bar-l ul>li span{
		word-break: break-all;
	}
	.search-full .search-bar-l ul>li.cur span{
		color: #0a6db9;
	}

	.search-full .module-list{
		padding-left: 20px;
		background-color: $color-white;
	}
	.search-full .module{
		padding: 10px;
	}
	.search-full .module-content{
		overflow: hidden;
		color: lighten($color-black, 35%);
		font-size: 1rem;
	    width: 100%;
	}
	.search-full .module-cat .module-title{
		text-align: left;
		margin-bottom: 10px;
		color: darken($color-grey, 30%);
		font-size: 0.9rem;
	}
	.search-full .module-cat .module-title span{
		border-left: 3px solid #0068b7;
		padding-left: 8px;
	}
	.search-full .module-content > li{
        width: 50%;
	    float: left;
	    text-align: left;
	    line-height: 2;
	}
</style>