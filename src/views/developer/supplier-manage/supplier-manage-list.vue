<template>
	<div class="zeco-supplier-manage-list">
		<section class="manage-bars">
			<mt-navbar class="page-part" :selected.sync="selected">
				<mt-tab-item id="supplier-list">供应商列表</mt-tab-item>
				<mt-tab-item id="supplier-apply">入库申请</mt-tab-item>
			</mt-navbar>
		</section>
		<section class="manage-lists">
			<mt-tab-container :active.sync="selected" swipeable>
				<mt-tab-container-item id="supplier-list">
					<supplier-list-info :lock="selected"></supplier-list-info>
				</mt-tab-container-item>
				<mt-tab-container-item id="supplier-apply">
					<supplier-apply-info :lock="selected"></supplier-apply-info>
				</mt-tab-container-item>
			</mt-tab-container>
		</section>
	</div>
</template>
<script>
	import SupplierList from './supplier-list.vue';
	import SupplierApply from './supplier-apply.vue';
	import { getScreenHeight } from '../../../utils/fixtools.js';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';

	export default {
		name: 'zeco-supplier-manage-list',
		data () {
			return {
				selected: 'supplier-list'
			};
		},
		route: {
			data (transition) {
				Indicator.open('加载中...');
				Indicator.close();
				transition.next();
			}
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 修正高度
			let height = getScreenHeight();
			document.querySelector('.mint-tab-container').style.minHeight = `${(height - 56)}px`;
		},
		beforeDestroy () {
			Indicator.close();
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[SupplierList.name]: SupplierList,
			[SupplierApply.name]: SupplierApply,
			[TabContainerItem.name]: TabContainerItem
		}
	};
</script>
<style lang="scss">
	@import '../../../assets/sass/partials/_var.scss';
	@import '../../../assets/sass/partials/_border.scss';

	.zeco-supplier-manage-list .manage-bars{
		@include border-bottom($color-grey);
	}
	.zeco-supplier-manage-list .manage-lists{
		margin-top: 15px;
		background-color: #fff;
		@include border-top($color-grey);
	}
</style>