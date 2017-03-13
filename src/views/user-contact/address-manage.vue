<template>
	<div class="odin-address-manage">
		<ul>
			<li v-for="(contact, index) in contactList" v-if="contactList.length">
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
				<div class="contact-controls">
					<div class="controls-default">
					<k-radio @input="setDeafult" :option="{label: '设为默认', value: contact.id}" v-model="defaultContact"></k-radio>
					</div>
					<div class="controls-edit">
						<!-- <div class="contact-edit">
							<router-link :to="{name: 'UserContactEdit', params: {contact_no: contact.id}}">
								<i class="iconfont icon-fankui"></i>编辑
							</router-link>
						</div> -->
						<div class="contact-delete" @click="deleteItem(contact.id, index)">
							<i class="iconfont icon-shanchu"></i>删除
						</div>
					</div>
				</div>
			</li>
		</ul>

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
	import apis from '../../apis';
	import axios from 'axios';
	import KRadio from '../../components/radio/radio.vue';
	import { Toast, Button, MessageBox } from 'mint-ui';

	export default {
		name: 'odin-address-manage',
		data () {
			return {
				contactList: [],
				defaultContact: ''
			};
		},
		created () {
			// 获取联系人列表
			axios.get(apis.urls.contacts)
			.then((response) => {
				let self = this;
				this.contactList = response.data.data;
				response.data.data.map(function (item) {
					if (item.is_default) {
						self.defaultContact = item.id;
						return false;
					}
				});
			})
			.catch((error) => {
				apis.errors.errorPublic(error.response, this);
			});
		},
		methods: {
			setDeafult () {
				axios.post(apis.urls.contact + '/' + this.defaultContact + '/default', {_method: 'PUT'})
				.then((response) => {
					Toast({
						message: '修改成功！',
						iconClass: 'mintui mintui-success'
					});
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			},
			goPath () {
				let url = window.location.href;
				this.$router.push({name: 'UserContactCreate', query: {redirect: url}});
			},
			deleteItem (id, index) {
				MessageBox.confirm('确定删除吗?', '提示')
				.then(() => {
					axios.post(apis.urls.contact + '/' + id, {_method: 'DELETE'})
					.then((response) => {
						Toast({
							message: '删除成功！',
							iconClass: 'mintui mintui-success'
						});
						this.contactList.splice(index, 1);
					})
					.catch((error) => {
						apis.errors.errorPublic(error.response, this);
					});
				})
				.catch(() => {});
			}
		},
		components: {
			[KRadio.name]: KRadio,
			[Button.name]: Button
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.odin-address-manage{
		text-align: left;
		padding-bottom: 20px;
	}
	.odin-address-manage ul>li {
		background-color: #fff;
		padding-left: 10px;
		margin-bottom: 10px;
		@include border-bottom($border-color);
		@include border-top($border-color);
	}
	.odin-address-manage .contact-info{
		padding: 14px 10px 20px 10px;
		.address-heading{
			margin-left: 23px;
			font-weight: 700;
			padding-bottom: 5px;
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
	.contact-controls{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		padding: 10px 10px 10px 0;
		@include border-top($border-color);
		.controls-edit{
			display: flex;
			.iconfont{
				margin-right: 2px;
			}
			.contact-delete{
				margin-left: 10px;
			}
		}
	}
</style>
