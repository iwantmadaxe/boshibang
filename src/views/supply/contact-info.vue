<template>
	<div class="zeco-supply-contact-info">
		<x-complex-cell title="企业联系信息">
			<div class="company-phone">
				<span class="phone-title">电话:</span>
				<span class="phone-content">{{contactInfo.companyPhone}}</span>
			</div>
			<div class="company-fax">
				<span class="fax-title">传真:</span>
				<span class="fax-content">{{contactInfo.companyFax}}</span>
			</div>
			<div class="company-address">
				<span class="address-title">地址:</span>
				<span class="address-content">{{contactInfo.companyAddress}}</span>
			</div>
			<div class="company-hotline">
				<span class="hotline-title">服务热线:</span>
				<span class="hotline-content">{{contactInfo.companyHotline}}</span>
			</div>
		</x-complex-cell>
		<div class="gap-p"></div>
		<x-complex-cell title="联系人信息">
			<div class="contact-person">
				<span class="person-name">{{contactInfo.companyConnect}}</span>
				<span class="person-job">{{contactInfo.title}}</span>
			</div>
			<div class="person-mobile">
				<span class="mobile-title">手机:</span>
				<span class="mobile-content">{{contactInfo.phone}}</span>
			</div>
			<div class="person-phone">
				<span class="phone-title">电话:</span>
				<span class="phone-content">{{contactInfo.companyPhone}}</span>
			</div>
			<div class="person-email">
				<span class="email-title">邮箱:</span>
				<span class="email-content">{{contactInfo.email}}</span>
			</div>
			<div class="person-qq">
				<span class="qq-title">QQ:</span>
				<span class="qq-content">{{contactInfo.QQ}}</span>
			</div>
		</x-complex-cell>
	</div>
</template>
<script>
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';

	export default {
		name: 'zeco-supply-contact-info',
		props: {
			contactInfo: {
				default: function () {
					return {
						companyPhone: '',
						companyFax: '',
						companyAddress: '',
						companyHotline: '',
						companyConnect: '',
						title: '',
						phone: '',
						email: '',
						QQ: ''
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
	.zeco-supply-contact-info .complex-cell-content>div{
		margin-bottom: 5px;
	}
	.zeco-supply-contact-info .gap-p{
		background-color: #e9ecf5;
	}
	.zeco-supply-contact-info .contact-person{
		color: #666;
	}
</style>