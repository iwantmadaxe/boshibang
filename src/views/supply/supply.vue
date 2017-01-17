<template>
	<div class="zeco-supply">
		<section class="company-base">
			<div class="list-box-content">
				<box-section :head-title="details.companyName">
					<img slot="img" :src="details.companyLogo" width="100%">
					<section slot="more" class="addition-company-info">
						<div class="main-business">
							<span class="main-business-title">主营业务:</span>
							<span class="main-business-content">{{details.base.companyServices}}</span>
						</div>
						<div class="more-demonds">
							<span>已加入{{details.companies.length}}家需求方品牌库>><span>
						</div>
					</section>
				</box-section>
			</div>
			<mt-navbar class="page-part" :selected.sync="selected">
				<mt-tab-item id="base">基本信息</mt-tab-item>
				<mt-tab-item id="material">公司资料</mt-tab-item>
				<mt-tab-item id="contact">联系信息</mt-tab-item>
			</mt-navbar>
		</section>
		<section class="company-detail">
			<mt-tab-container :active.sync="selected" swipeable>
				<mt-tab-container-item id="base">
					<zeco-supply-base-info :base-detail="details.base"></zeco-supply-base-info>
				</mt-tab-container-item>
				<mt-tab-container-item id="material">
					<zeco-supply-license-info :license-info="details.licenseInfo"></zeco-supply-license-info>
				</mt-tab-container-item>
				<mt-tab-container-item id="contact">
					<zeco-supply-contact-info :contact-info="details.contactInfo"></zeco-supply-contact-info>
				</mt-tab-container-item>
			</mt-tab-container>
		</section>
	</div>
</template>
<script>
	import BaseInfo from './base-info.vue';
	import LicenseInfo from './license-info.vue';
	import ContactInfo from './contact-info.vue';
	import { getScreenHeight } from '../../utils/fixtools.js';
	import BoxSection from '../../components/box-section/box-section.vue';
	import { Navbar, TabItem, TabContainer, TabContainerItem, Indicator } from 'mint-ui';
	import apis from '../../api/index.js';

	export default {
		name: 'zeco-supply',
		data () {
			return {
				selected: 'base',
				details: {
					companies: [],
					base: {
						companyServices: ''
					}
				}
			};
		},
		route: {
			data (transition) {
				Indicator.open('加载中...');
				this.companyId = this.$route.params.supply_no;
				this.$http.get(apis.urls.companyRecord, {params: {id: this.companyId}}).then((response) => {
					Indicator.close();
					this.details = apis.pures.pureCompanyRecord(response.body);
				}, (response) => {
					Indicator.close();
					apis.errors.errorCompanyLatestStatus(response, this);
				});
			}
		},
		components: {
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[BaseInfo.name]: BaseInfo,
			[BoxSection.name]: BoxSection,
			[LicenseInfo.name]: LicenseInfo,
			[ContactInfo.name]: ContactInfo,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem
		},
		ready () {
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
			// 修正高度
			let height = getScreenHeight();
			document.querySelector('.mint-tab-container').style.minHeight = `${(height - 169)}px`;
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';
	.zeco-supply .company-base{
		background-color: $color-white;
		@include border-bottom($border-color);
	}
	.zeco-supply .company-base .list-box-content{
		@include border-bottom($border-color);
	}
	.zeco-supply .company-detail{
		margin-top: 15px;
		background-color: $color-white;
		@include border-top($border-color);
	}

	// 企业基础头信息
	.zeco-supply .addition-company-info .main-business,
	.zeco-supply .addition-company-info .more-demonds{
		padding-top: 10px;
	}
	.zeco-supply .addition-company-info .main-business{
		font-size: 0.9rem;
	}
	.zeco-supply .addition-company-info .more-demonds{
		font-size: 0.8rem;
		color: $connect-color;
	}
</style>