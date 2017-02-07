<template>
	<div class="register-fta bg-gray register-pb">
		<div class="register-fta-banner register-banner">
			<img class="banner-img" src="../../assets/images/reg/register-fta-banner.png" />
		</div>
		<div class="register-common-square">
			<square-title :topic="'自贸区优势'"></square-title>
			<div class="context">
				1、注册资金认缴制<br>
				2、对负面清单外的外资实行备案制（不审批）<br>
				3、放开某些行业对外资的要求<br>
				4、注册时间短，内资一周，外资2周<br>
				5、自贸区内转口贸易0关税<br>
			</div>
		</div>
		<div class="register-common-square">
			<square-title :topic="'自贸区办理流程'"></square-title>
			<div class="context">
				1、查名<br>
				2、核准<br>
				3、办执照<br>
				4、开基本户<br>
				5、申请发票<br>
			</div>
		</div>
		<div class="register-common-square">
			<square-title :topic="'自贸区内资材料清单'"></square-title>
			<div class="context">
				1、《企业名称预先核准申请书》<br>
				2、《企公司设立登记申请书》<br>
				3、《制定代表或者共同委托人的证明》<br>
				4、《公司章程》<br>
				5、《企董事、监事和经历的任职文件》<br>
				6、《股东会议决定》<br>
				7、《告知承诺书》<br>
				8、《企其他法律法规要求提供的文件资料》<br>
			</div>
		</div>
		<div class="register-common-square">
			<square-title :topic="'自贸区外资材料清单'"></square-title>
			<div class="context">
				1、投资方经过公正认证的开业证明原件<br>
				2、投资方的上一年度审计报告<br>
				3、投资方董事长的护照复印件<br>
				4、备用的新公司名称<br>
				5、认缴一年的注册资本<br>
				6、拟从事的经营范围<br>
				7、新公司执行懂事、总经理、监事人选及其护照复印件<br>
				8、提供注册公司注册地址的租凭合同和产权证复印件<br>
			</div>
		</div>
	</div>
</template>

<script>
	import SquareTitle from '../../components/square/square-title.vue';

	export default {
		name: 'bs-register-fta',
		data () {
			return {
			};
		},
		components: {
			SquareTitle
		}
	};
</script>
