<template>
	<div class="order-contact">
		<mt-header title="联系人选择">
			<mt-button @click="backStep" icon="back" slot="left">返回</mt-button>
			<mt-button @click="saveContact" slot="right">保存</mt-button>
		</mt-header>
		<section class="check-info">
			<ul>
				<li v-for="contact in contactList" v-if="contactList.length">
					<k-radio
					@click.native="close"
					class="check-part"
					title="联系人列表"
					v-model="currentValue"
					:option="{value: contact}">
						<div class="contact-info">
							<div class="address-heading cl-fx">
								<div class="address-name"><span>{{contact.name}}</span></div>
								<div class="address-phone"><span>{{contact.phone}}</span></div>
							</div>
							<div class="address-body">
								<i class="icon iconfont icon-location"></i>
								<span class="address-where">
									{{(contact.province_name+contact.city_name+contact.district_name+contact.address) || '暂无'}}
								</span>
							</div>
						</div>
					</k-radio>
				</li>
			</ul>
		</section>

		<!-- 新建联系人 -->
		<section class="create-contact-people">
			<mt-button
			size="large"
			type="primary"
			:plain="true"
			@click="goPath">
				创建联系人
			</mt-button>
		</section>
	</div>
</template>
<script>
	import { Header, Button } from 'mint-ui';
	import apis from '../../apis';
	import axios from 'axios';
	import KRadio from '../../components/radio/radio.vue';

	export default {
		name: 'choose-contact',
		data () {
			return {
				currentValue: '',
				contactList: []
			};
		},
		props: {
			value: {
				default: null
			}
		},
		watch: {
			currentValue (newValue, old) {
				this.$emit('on-change', this.currentValue);
				this.$emit('input', this.currentValue);
			},
			value (newValue) {
				this.currentValue = newValue;
			}
		},
		created () {
			this.getContact();
		},
		methods: {
			close () {
				// 关闭弹出层，并清理数据
				this.$emit('close-contact');
			},
			backStep () {
				this.close();
				return false;
			},
			saveContact () {
				this.close();
				this.$emit('save-contact', this.value);
			},
			getContact () {
				axios.get(apis.urls.contacts)
				.then((response) => {
					this.contactList = response.data.data;
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			},
			goPath () {
				let url = window.location.href;
				this.$router.push({name: 'UserContactCreate', query: {redirect: url}});
			}
		},
		components: {
			[Button.name]: Button,
			[Header.name]: Header,
			[KRadio.name]: KRadio
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.order-contact{
		text-align: left;
		padding-bottom: 20px;
	}
	.check-info ul>li {
		padding-left: 10px;
		@include border-bottom($border-color);
	}
	.order-contact .k-radio .k-radio-label{
		display: flex;
		flex: 1;
		justify-content: flex-start
	}
	.order-contact .k-radio-control{
		padding-top: 14px;
	}
	.contact-info{
		padding: 14px 10px 9px 10px;
		.address-heading{
			margin-left: 23px;
			font-weight: 700;
			padding-bottom: 10px;
			color: #252525;
			.address-name{
				float: left;
			}
			.address-phone{
				float: left;
				margin-left: 1em;
			}
		}
		.address-body{
			position: relative;
			padding: 0px 14px 0px 23px;
			font-size: 14px;
			color: #232326;
			line-height: 1.5;
			.icon{
				position: absolute;
				left: 0;
				line-height: 1.3;
			}
			.address-where{
				word-break: break-word;
			}
		}
	}
	.create-contact-people{
		width: 90%;
		margin: 20px auto 0;
	}
</style>
