<template>
	<div class="register-tab-con cl-fx">
		<div class="register-tab-text cl-fx">
			<div class="reg-title one-line">
				<p class="one-line">定制注册——股东分红个税＜3.9%</p>
				<p class="parma-row one-line">注册价格：<i class="huge-red-text">￥900元</i></p>
				<p class="parma-row one-line">适合全行业；小规模纳税人，一般纳税人均可办理</p>
			</div>
		</div>
		<div class="reg-progess-con cl-fx">
			<p class="title">注册流程</p>
			<div class="reg-progess-row cl-fx">
				<div class="choose-square fl cl-fx">
					<img class="icon" src="../../assets/images/reg/choose.png" />
					<span>名称查询</span>
				</div>
				<div class="choose-square fl cl-fx">
					<img class="icon" src="../../assets/images/reg/choose.png" />
					<span>核准</span>
				</div>
				<div class="choose-square fl cl-fx">
					<img class="icon" src="../../assets/images/reg/choose.png" />
					<span>材料提交</span>
				</div>
				<div class="choose-square fl cl-fx">
					<img class="icon" src="../../assets/images/reg/choose.png" />
					<span>审核通过</span>
				</div>
				<div class="choose-square fl cl-fx">
					<img class="icon" src="../../assets/images/reg/choose.png" />
					<span>领取执照</span>
				</div>
			</div>
		</div>
		<div class="other-service cl-fx">
			<p class="title">你可能还需要以下服务</p>
			<div class="other-service-btn-con cl-fx">
				<div class="other-service-btn">
					商标查询
				</div>
				<div class="other-service-btn">
					内资注册
				</div>
				<div class="other-service-btn">
					商标变更
				</div>
				<div class="other-service-btn">
					人事社保
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'boss-custom-registration',
		data () {
			return {
			};
		},
		methods: {
		}
	};
</script>
<style lang="scss">
	.register-tab-con .reg-title .parma-row {
		font-size: 0.12rem;
		color: #969696;
	}
	.register-tab-con .reg-title .huge-red-text {
		font-size: 0.18rem;
		color: #c91425;
	    font-style: normal;
	}
	.other-service {
		padding: 0 5%;
	}
	.other-service .title {
		font-size: 0.12rem;
		color: #000;
	    height: 0.4rem;
	    line-height: 0.4rem;
	    text-align: left;
	}
	.other-service .other-service-btn-con {
		display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	}
	.other-service .other-service-btn-con .other-service-btn {
		text-align: center;
		width: 20%;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
        height: 0.25rem;
	    line-height: 0.25rem;
	    padding: 0 0.05rem;
	    border: 0.01rem solid #eee;
        margin-right: 3%;
	}
	.other-service .other-service-btn-con .other-service-btn:last-child {
		margin-right: 0;
	}
</style>
