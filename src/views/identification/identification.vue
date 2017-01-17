<template>
	<div class="identification">
		<div class="progresss-bar">
			<k-step :current.sync="finishedStep" background-color='#fff' gutter="10px">
				<k-step-item title="个人信息" @click="nextStep(0)"></k-step-item>
				<k-step-item title="企业信息" @click="nextStep(1)"></k-step-item>
				<k-step-item title="完成" @click="nextStep(2)"></k-step-item>
			</k-step>
		</div>
		<div class="progresss-content">
			<mt-tab-container :active.sync="activeStep">
				<mt-tab-container-item :id='1'>
					<zeco-iden-user-info :company.sync="idenInfo.company" :email.sync="idenInfo.email" :job.sync="idenInfo.job" :own-name.sync="idenInfo.ownName" :pic.sync="idenInfo.pic"></zeco-iden-user-info>
				</mt-tab-container-item>
				<mt-tab-container-item :id='2'>
					<zeco-iden-company-info :registered-capital.sync="idenInfo.registeredCapital" :service.sync="idenInfo.service" :year.sync="idenInfo.year" :telephone.sync="idenInfo.telephone" :address.sync="idenInfo.address" :licence.sync="idenInfo.licence" :province.sync="idenInfo.province" :city.sync="idenInfo.city"></zeco-iden-company-info>
				</mt-tab-container-item>
				<mt-tab-container-item :id='3'>
					<zeco-iden-complete></zeco-iden-complete>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<div class="btn_wrap">
			<mt-button v-if="activeStep < 2" type="primary" size="large" @click="nextStep(null)">下一步</mt-button>
			<mt-button v-if="activeStep === 2" type="primary" size="large" @click="submitIdentification">下一步</mt-button>
			<mt-button v-if="activeStep > 2" type="primary" size="large" @click="goHome">返回首页</mt-button>
		</div>
	</div>
</template>
<script>
	import UserInfo from './user-info.vue';
	import CompanyInfo from './company-info.vue';
	import CompletedInfo from './completed-info.vue';
	import { Step, StepItem } from '../../components/step';
	import { Button, Toast, TabContainer, TabContainerItem, MessageBox } from 'mint-ui';
	import { requiredMe, email } from '../../utils/valids.js';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import { userToken } from '../../vuex/getters.js';    // 全局参数
	import { changeAuth } from '../../vuex/actions.js';
	import apis from '../../api';

	export default {
		name: 'zeco-identification',
		data () {
			return {
				token: '',
				finishedStep: 0,
				beforeStep: 0,
				mostStep: 0,
				idenInfo: {
					company: '',
					email: '',
					job: '',
					ownName: '',
					pic: null,
					registeredCapital: '',
					service: '',
					year: '',
					telephone: '',
					address: '',
					licence: null,
					province: '',
					city: ''
				}
			};
		},
		computed: {
			activeStep: {
				get: function () {
					return Number(this.finishedStep) + 1;
				},
				set: function (v) {
					this.finishedStep = v - 1;
				}
			}
		},
		vuex: {
			getters: {
				userToken
			},
			actions: {
				changeAuth
			}
		},
		ready () {
			// 读取localStorage信息
			let userInfo = readLocal('user');
			// 获取token
			if (this.userToken) {
				this.token = this.userToken;
			} else if (userInfo !== false && userInfo.token) {
				this.token = userInfo.token;
			}
			// 修改body背景色
			document.body.style.backgroundColor = '#e9ecf5';
		},
		components: {
			[Step.name]: Step,
			[Button.name]: Button,
			[StepItem.name]: StepItem,
			[UserInfo.name]: UserInfo,
			[CompanyInfo.name]: CompanyInfo,
			[TabContainer.name]: TabContainer,
			[CompletedInfo.name]: CompletedInfo,
			[TabContainerItem.name]: TabContainerItem
		},
		methods: {
			nextStep (place) {
				if (place || place === 0) {
					if (place > this.mostStep) {
						return false;
					}
					// 验证失败
					if (this.validInput() === false) {
						return false;
					}
					this.beforeStep = this.finishedStep;
					this.finishedStep = place;
				} else {
					// 验证失败
					if (this.validInput() === false) {
						return false;
					}
					this.beforeStep = this.finishedStep;
					this.finishedStep ++;
					if (this.mostStep <= this.finishedStep && this.mostStep < 2) {
						this.mostStep ++;
					}
				}
				return true;
			},
			submitIdentification () {
				if (this.validInput() === false) {
					return false;
				}
				// 对service进行处理
				let tplService = this.idenInfo.service.map(function (item) {
					return item.id;
				});
				// 提交信息
				let formData = new window.FormData();
				formData.append('company_name', this.idenInfo.company);
				formData.append('username', this.idenInfo.ownName);
				formData.append('title', this.idenInfo.job);
				formData.append('email', this.idenInfo.email);
				formData.append('work_idcard', this.idenInfo.pic);
				formData.append('company_money', this.idenInfo.registeredCapital);
				formData.append('company_products', tplService.join(','));
				formData.append('company_year', this.idenInfo.year);
				formData.append('company_phone', this.idenInfo.telephone);
				formData.append('province', this.idenInfo.province.id);
				formData.append('city', this.idenInfo.city.id);
				formData.append('company_address', this.idenInfo.telephone);
				formData.append('company_license', this.idenInfo.licence);
				this.$http.post(apis.urls.certificate, formData, {headers: {Authorization: 'Bearer ' + this.token}}).then((response) => {
					console.log(response.body);
					// 处理下一步逻辑
					this.beforeStep = this.finishedStep;
					this.finishedStep ++;
					if (this.mostStep <= this.finishedStep && this.mostStep < 2) {
						this.mostStep ++;
					}
					// 修改认证状态
					let user = readLocal('user');
					user.authStatus = 1;
					saveLocal('user', user);
					saveLocal('authInfo', 1);
					this.changeAuth(1);
					return true;
				}, (response) => {
					// 提示提交错误
					Toast(response.body);
					return false;
				});
			},
			goHome () {
				// 跳转首页
				this.$router.go({ name: 'Home' });
				return true;
			},
			validInput () {
				// 验证页面的数据是否填写完毕
				// 个人信息部分
				if (this.finishedStep === 0) {
					if (!requiredMe(this.idenInfo.company)) {
						MessageBox.alert('请填写公司名称！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.email)) {
						MessageBox.alert('请填写邮件！', '提示');
						return false;
					}
					if (!email(this.idenInfo.email)) {
						MessageBox.alert('邮件格式错误！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.job)) {
						MessageBox.alert('请填写职务！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.ownName)) {
						MessageBox.alert('请填写姓名！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.pic)) {
						MessageBox.alert('请上传工作名片！', '提示');
						return false;
					}
				}
				// 企业信息部分
				if (this.finishedStep === 1) {
					if (!requiredMe(this.idenInfo.registeredCapital)) {
						MessageBox.alert('请填写注册资本！', '提示');
						return false;
					}
					if (this.idenInfo.service.length === 0) {
						MessageBox.alert('请选择产品服务！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.year)) {
						MessageBox.alert('请填写成立年限！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.telephone)) {
						MessageBox.alert('请填写公司电话！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.address)) {
						MessageBox.alert('请填写公司地址！', '提示');
						return false;
					}
					if (!requiredMe(this.idenInfo.licence)) {
						MessageBox.alert('请上传营业执照！', '提示');
						return false;
					}
				}
			}
		}
	};
</script>
<style scoped lang="scss">
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';
	// 认证按钮
	.identification .progresss-bar{
		padding: 16px 10px;
		background-color: #fff;
		@include border-bottom($border-color);
	}
	.btn_wrap {
		padding: 0 1rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	// 认证内容
	.identification .progresss-content{
		margin-top: 10px;
	}
</style>
