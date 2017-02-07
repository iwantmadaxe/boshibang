<template>
	<div class="register-oversea bg-gray register-pb">
		<div class="register-oversea-banner register-banner">
			<img class="banner-img" src="../../assets/images/reg/register-oversea-banner.png" />
			<span class="banner-text">Overseas registered</span>
		</div>
		<div class="register-common-square">
			<div class="title cl-fx">
				<div class="icon-con">
					<img class="icon rad" src="../../assets/images/reg/oversea-title1.png" />
				</div>
				<span class="text">香港公司</span>
			</div>
			<div class="context">
				无须验资，注册资本可以任意提高；<br>
				经营范围不受限制，后续服务简单；<br>
				无外汇管制，资金进出自由；<br>
				各种外币可以随时兑换调动，信用证业务方便快捷；<br>
				货物可自由进出口、存仓，无需申领许可证<br>
				允许无业务，允许空壳公司存在；<br>
				香港税制简单、且税率低，一般税种为利得税,税率仅16.5%；<br>
				无需缴纳营业税、增值税等；<br>
			</div>
		</div>
		<div class="register-common-square">
			<div class="title cl-fx">
				<div class="icon-con">
					<img class="icon rad" src="../../assets/images/reg/oversea-title2.png" />
				</div>
				<span class="text">美国公司</span>
			</div>
			<div class="context">
				美国公司名称选择自由；<br>
				美国公司营商基础设施良好；<br>
				美国公司没有外汇管制，资金进出自由；<br>
				以美国公司发邀请函，有助中方人士办理护照和签证；<br>
				有助于获得各类商务和L1工作签证；<br>
				一年以后，可以申请居 留卡，达至移民的目的;<br>
				可以做亚马逊；<br>
			</div>
		</div>
		<div class="register-common-square">
			<div class="title cl-fx">
				<div class="icon-con">
					<img class="icon rad" src="../../assets/images/reg/oversea-title3.png" />
				</div>
				<span class="text">BVI注册</span>
			</div>
			<div class="context">
				无需递交年报或财务报表。<br>
				董事及股东决议可透过电话会议或文书传递来进行签署确认<br>
				无需委任BVI当地居民作为董事。<br>
				可以世界任何地方开设银行户口。<br>
				新式的资产保护法例包括容许公司返往别个国家。<br>
				公司在BVI境外的投资所得全部免税，且资金进出没有管制<br>
			</div>
		</div>
		<div class="register-common-square">
			<div class="title cl-fx">
				<div class="icon-con">
					<img class="icon rad" src="../../assets/images/reg/oversea-title4.png" />
				</div>
				<span class="text">新加坡公司</span>
			</div>
			<div class="context">
				离岸业务所得的利润如不汇入新加坡境内，就不需缴纳任何<br>
				税项每年只需递交周年报表、和经当地会计师审计的账目。<br>
				私人公司年度内收入如不超过五百万新加坡元，该年度账目
				则无需审计。<br>
				与多国签订投资和双重课税保护条约。<br>
				无外汇管制，容易募集资金。<br>
				政治、经济和贸易环境稳定。<br>
			</div>
		</div>
		<div class="register-common-square">
			<div class="title cl-fx">
				<div class="icon-con">
					<img class="icon rad" src="../../assets/images/reg/oversea-title5.png" />
				</div>
				<span class="text">新加坡公司</span>
			</div>
			<div class="context">
				韩国化妆品、韩国服装、等是主流消费品。<br>
				注册韩国公司，造就强势品牌能使企业享有较高的利润空间。<br>
				韩国商品赶超日本商品， 成为中国进口市场份额第一名。<br>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bs-register-oversea',
		data () {
			return {
			};
		},
		components: {
		}
	};
</script>

<style lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	.register  .page-part {
	    margin-bottom: 0.12rem;
	}
	.register .mint-navbar .mint-tab-item:nth-child(2n+1){
		@include border-right(#d9d9d9);
	}
	.register .mint-navbar .mint-tab-item .mint-tab-item-label{
		font-size: 0.14rem;
	}
	.rad {
		border-radius: 50%;
	}
	.register-pb {
	    padding-bottom: 0.1rem;
	}
	.bg-gray {
		background: #e9ecf5;
	}
	.register-oversea-banner {
		background-image: url("../../assets/images/reg/register-oversea-banner.png");
		background-size: 100% 100%;
		background-color: #38546f;
	}
	.register-banner {
		height: auto;
		width: 100%;
	    color: #fff;
		font-size: 0.16rem;
		text-align: center;
		position: relative;
	}
	.register-banner .banner-img {
		width: 100%;
	    display: block;
	}
	.register-banner .banner-text {
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	    display: block;
	    width: 100%;
	    height: 0.16rem;
	    text-align: center;
	    line-height: 0.16rem;
	}
	.register-common-square {
	    width: 100%;
	    margin: 0 auto 0.1rem;
	    height: auto;
	    background: #fff;
	    padding: 0 4%;
	}
	.register-common-square .icon-con {
        margin: 0.1rem 4% 0.1rem 0;
		width: 0.5rem;
		height: 0.5rem;
		overflow: hidden;
		border-radius: 50%;
		float: left;
	}
	.register-common-square .title {
		border-bottom: 0.01rem solid #e6e6e6;
	    width: 100%;
	}
	.register-common-square .icon-con .icon {
		width: 100%;
	    background: #dd1f2b;
	}
	.register-common-square .title .text {
		font-size: 0.15rem;
	    color: #000;
	    display: block;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    margin: 0.1rem 0;
	    float: left;
	    width: auto;
	}
	.register-common-square .context {
		font-size: 0.12rem;
	    color: #969696;
	    padding: 0.1rem 0;
	    text-align: left;
	    line-height: 0.24rem;
	}
</style>
