<template>
	<div class="zeco-supply-base-info">
		<x-complex-cell title="基本信息">
			<div class="company-category">
				<span class="category-title">公司类型:</span>
				<span class="category-content">有限责任公司</span>
			</div>
			<div class="establishment-date">
				<span class="establishment-date-title">成立时间:</span>
				<span class="establishment-date-content">{{ baseDetail.companyYear }}</span>
			</div>
			<div class="registered-capital">
				<span class="capital-title">注册资本:</span>
				<span class="capital-content">{{baseDetail.companyMoney}}</span>
			</div>
			<div class="artificial-person">
				<span class="artificial-title">法人姓名:</span>
				<span class="artificial-content">{{baseDetail.companyLegalPerson}}</span>
			</div>
			<div class="business-license">
				<span class="license-title">营业执照号:</span>
				<span class="license-content">{{baseDetail.companyLicense}}</span>
			</div>
			<div class="supply-category">
				<span class="supply-category-title">供应商类型:</span>
				<span class="supply-category-content">{{baseDetail.companyIndustry}}</span>
			</div>
			<div class="service-range">
				<span class="range-title">服务范围:</span>
				<span class="range-content">{{baseDetail.companyServices}}</span>
			</div>
			<div class="business-line">
				<span class="line-title">业务范围:</span>
				<span class="line-content">{{baseDetail.companyServices}}</span>
			</div>
			<div class="company-production">
				<span class="production-title">服务/产品:</span>
				<span class="production-content">{{baseDetail.companyIndustry}}</span>
			</div>
		</x-complex-cell>
	</div>
</template>
<script>
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';

	export default {
		name: 'zeco-supply-base-info',
		props: {
			baseDetail: {
				default: function () {
					return {
						companyIndustry: '',
						companyYear: '',
						companyServices: '',
						companyMoney: '',
						companyLicense: '',
						companyLegalPerson: ''
					};
				}
			}
		},
		components: {
			[ComplexCell.name]: ComplexCell
		}
	};
</script>
<style lang="scss">
	.zeco-supply-base-info .complex-cell-content>div{
		margin-bottom: 5px;
	}
</style>