<template>
	<div class="search">
		<!-- 头部搜索 -->
		<div class="fixedtop">
			<search-page-top search-place="" :disabled="true">
			</search-page-top>
		</div>
		<div class="search-con">
			<p class="search-history">历史搜索</p>
			<div class="search-history-list-con cl-fx">
				<div class="search-history-row">
					<img class="icon" src="../../assets/images/index/mag-gray.png">
					<span class="one-line history-text">商标变更</span>
				</div>
			</div>
			<div class="clear-search">
				清除搜索记录
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { Field, Button, MessageBox, Toast } from 'mint-ui';
	import { requiredMe, phone } from '../../utils/valids.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';
	import { saveLocal } from '../../utils/localstorage.js';
	import SearchPageTop from '../../components/searchbar/searchPageTop.vue';

	export default {
		name: 'boss-search',
		data () {
			return {
				phone: '',
				pass: '',
				code: '',
				valid: {
					msg: '',
					ok: true
				},
				downTime: {
					time: 0
				}
			};
		},
		methods: {
			sendSms () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				// 发送验证码
				axios.get(apis.urls.sms, {params: {phone: _this.phone, type: 'login'}}).then((response) => {
					Toast({
						message: '发送成功！',
						iconClass: 'mintui mintui-success'
					});
					_this.valid = {msg: '', ok: true};
					return false;
				}, (response) => {
					apis.errors(response, _this);
					return false;
				});
			},
			login () {
				let _this = this;
				// 数据验证
				_this.valid = {msg: '', ok: true};
				// 验证各个所填参数必填
				if (!requiredMe(_this.phone)) {
					_this.valid.msg = '手机号必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写手机号！', '提示');
					return false;
				}
				// 手机号检测
				if (!phone(_this.phone)) {
					_this.valid.msg = '手机号格式错误！';
					_this.valid.ok = false;
					MessageBox.alert('手机号格式错误！', '提示');
					return false;
				}
				if (!requiredMe(_this.pass)) {
					_this.valid.msg = '密码必填！';
					_this.valid.ok = false;
					MessageBox.alert('请填写密码！', '提示');
					return false;
				}
				// if (!requiredMe(_this.code)) {
				// 	_this.valid.msg = '验证码必填！';
				// 	_this.valid.ok = false;
				// 	MessageBox.alert('请填写验证码！', '提示');
				// 	return false;
				// }
				// 发送请求
				// 组织发送请求参数
				let postTpl = {
					phone: _this.phone,
					password: _this.pass,
					// code: _this.code,
					auth_name: 'local'
				};
				axios.post(apis.urls.login, postTpl)
				.then((response) => {
					Toast({
						message: '登录成功！',
						iconClass: 'mintui mintui-success'
					});
					// 储存信息
					let loginTpl = apis.pures.pureLogin(response.data.data);
					saveLocal('user', loginTpl);
					// _this.goLogin(loginData);
					// _this.$router.push({name: 'Index'});
				})
				.catch((error) => {
					apis.errors.errorLogin(error.response, _this);
				});
			},
			getCookie (name) {
				let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
				let arr = document.cookie.match(reg);
				if (arr) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			},
			goLogin () {
				this.$router.push({name: 'Register'});
			},
			goForget () {
				this.$router.push({name: 'Forget'});
			}
		},
		components: {
			[Field.name]: Field,
			[Button.name]: Button,
			SearchPageTop
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	
	.search .fixedtop{
		display: block;
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 640px;
		transform: translateY(0);
		color: $color-white;
		z-index: 999;
	}
	.search .search-con {
		padding-top: 0.46rem;
	}
	.search .search-con .search-history {
	    width: 100%;
	    padding: 0 5%;
	    text-align: left;
	    margin: 0.2rem 0 0.1rem;
	    color: $color-text;
	    font-size: $normal-text;
	}
	.search .search-history-list-con {
	    width: 100%;
	    background: #fff;
	}
	.search .search-history-list-con .search-history-row {
	    width: 94%;
	    margin-left: 6%;
	    border-bottom: 0.01rem solid $border-gray;
	    height: 0.4rem;
	    line-height: 0.4rem;
	    font-size: $page-title;
	}
	.search .search-history-row .history-text {
		color: $color-black;
		text-align: left;
	}
	.search .search-history-row .icon {
	    float: left;
	    width: 0.12rem;
	    margin: 0.14rem 0.1rem 0 0;
	}
	.search .clear-search {
		width: 100%;
	    text-align: center;
	    height: 0.45rem;
	    line-height: 0.45rem;
	    background: #fff;
	    font-size: $big-text;
	    color: $cell-value-color;
	}
</style>
