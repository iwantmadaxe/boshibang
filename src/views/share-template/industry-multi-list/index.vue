<template>
	<div class="zeco-industry-multi-list">
		<mt-header :title="headTitle">
			<mt-button @click="backStep" icon="back" slot="left">返回</mt-button>
			<mt-button @click="saveIndustry" slot="right">保存</mt-button>
		</mt-header>
		<section class="info-list" v-if="level<=2">
			<mt-cell v-for="listItem in list" :title="listItem.name" @click="goFurther(listItem)" is-link></mt-cell>
		</section>
		<section class="check-info" v-else>
			<mt-checklist
			align="right"
			class="check-part"
			title="行业列表"
			:value.sync="value"
			:options="checkOption">
			</mt-checklist>
		</section>
	</div>
</template>
<script>
	import { Cell, Indicator, Checklist, Header, Button } from 'mint-ui';
	import apis from '../../../api';
	import { readLocal, saveLocal } from '../../../utils/localstorage.js';

	export default {
		name: 'zeco-industry-multi-list',
		data () {
			return {
				list: [],
				industryList: [],
				level: null,
				beforeList: [],
				checkOption: [],
				value: []
			};
		},
		props: {
			visible: {
				default: function () {
					return false;
				}
			}
		},
		computed: {
			headTitle () {
				if (this.level > 0) {
					return `${this.level}级行业`;
				} else {
					return '行业选择';
				}
			}
		},
		methods: {
			getIndustry () {
				// 获取全行业数据，并缓存
				let industryListCache = readLocal('IndustryList');
				if (industryListCache === false) {
					this.$http.get(apis.urls.industry, {params: {id: 0}}).then((response) => {
						this.industryList = response.body.industry_categories;
						this.list = this.industryList;
						saveLocal('IndustryList', response.body.industry_categories);
						Indicator.close();
					}, (response) => {
						Indicator.close();
					});
				} else {
					this.industryList = industryListCache;
					this.list = this.industryList;
					Indicator.close();
				}
			},
			close () {
				// 关闭弹出层，并清理数据
				this.visible = false;
				this.clearData();
			},
			clearData () {
				this.list = this.industryList;
				this.level = 1;
				this.beforeList = [];
			},
			goFurther (item) {
				if (item.level === 1 || item.level === '1') {
					this.beforeList = this.list;
					this.list = item.second;
					this.level = 2;
				}
				if (item.level === 2 || item.level === '2') {
					this.beforeList = this.list;
					this.list = item.third;
					this.level = 3;
					this.checkOption = item.third.map(function (val) {
						return {
							label: val.name,
							value: val
						};
					});
				}
			},
			backStep () {
				if (this.level === 1) {
					this.close();
					return false;
				} else {
					this.level--;
					this.list = this.beforeList;
					this.beforeList = this.industryList;
				}
			},
			saveIndustry () {
				this.close();
				this.$emit('save-industry', this.value);
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		compiled () {
			// 初始化数据
			this.level = 1;
			this.beforeList = [];
			Indicator.open('加载中...');
			this.getIndustry();
		},
		beforeDestroy () {
			Indicator.close();
		},
		components: {
			[Cell.name]: Cell,
			[Button.name]: Button,
			[Header.name]: Header,
			[Checklist.name]: Checklist
		}
	};
</script>
<style>
	.zeco-industry-multi-list{
		text-align: left;
	}
</style>