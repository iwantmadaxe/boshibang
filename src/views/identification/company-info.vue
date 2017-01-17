<template>
	<div class="iden-company-info">
		<div class="iden-content">
			<section class="iden-company-common">
				<mt-cell title="注册资本" is-link @click="openPrompt('注册资本', 'registeredCapital')" :value="tplRegisteredCapital"></mt-cell>
				<mt-cell title="产品服务" is-link @click="openService" :value="serviceName"></mt-cell>
				<mt-cell title="成立年份" is-link @click="openPrompt('成立年份', 'year')" :value="year"></mt-cell>
				<mt-cell title="公司电话" is-link @click="openPrompt('公司电话', 'telephone')" :value="telephone" type="tel"></mt-cell>
				<mt-cell title="公司区域" is-link @click="openArea" :value="area"></mt-cell>
				<mt-cell title="公司地址" is-link @click="openPrompt('公司详细地址', 'address')" :value="address"></mt-cell>
			</section>
			<section class="iden-company-pic">
				<mt-cell title="营业执照"></mt-cell>
				<div class="img-upload-cell">
					<k-img-cell :img-file.sync="licence"></k-img-cell>
				</div>
			</section>
		</div>
		<div class="area-modal">
			<k-area-picker :visible.sync="areaVisible" @confirm="handleChange"></k-area-picker>
		</div>
		<div class="service-modal">
			<mt-popup :visible.sync="serviceVisible" position="right" class="mint-popup-3" :modal="false">
				<zeco-industry-multi-list :visible.sync="serviceVisible" @save-industry="handleIndustry"></zeco-industry-multi-list>
			</mt-popup>
		</div>
	</div>
</template>
<script>
	import { Cell, MessageBox, Picker, Popup } from 'mint-ui';
	import ImgCell from '../../components/img-cell/img-cell.vue';
	import KAreaPicker from '../../components/area-picker/area-picker.vue';
	import IndustryMultiList from '../share-template/industry-multi-list/index.vue';

	export default {
		name: 'zeco-iden-company-info',
		data () {
			return {
				areaVisible: false,
				serviceVisible: false
			};
		},
		props: {
			licence: null,
			registeredCapital: '',
			service: '',
			year: '',
			telephone: '',
			address: '',
			city: '',
			province: ''
		},
		computed: {
			tplRegisteredCapital () {
				if (this.registeredCapital > 0) {
					return this.registeredCapital + '万';
				} else {
					return '';
				}
			},
			area () {
				if ((this.province === undefined || this.province === null) && (this.city === null || this.province === undefined) || (this.province.name === undefined || this.city.name === undefined)) {
					return '';
				}
				return this.province.name + ' ' + this.city.name;
			},
			serviceName () {
				if (this.service) {
					let tpl = [];
					for (let item of this.service) {
						if (tpl.length >= 2) {
							tpl.push('...');
							break;
						} else {
							tpl.push(item.name);
						}
					}
					return tpl.join(',');
				}
				return '';
			}
		},
		components: {
			[Cell.name]: Cell,
			[Popup.name]: Popup,
			[Picker.name]: Picker,
			[ImgCell.name]: ImgCell,
			[KAreaPicker.name]: KAreaPicker,
			[IndustryMultiList.name]: IndustryMultiList
		},
		methods: {
			openPrompt (name, type) {
				MessageBox.prompt(' ', `请输入${name}`).then(({ value }) => {
					if (value) {
						this[type] = value;
					}
				});
			},
			openArea () {
				this.areaVisible = true;
			},
			openService () {
				this.serviceVisible = true;
			},
			handleChange (val) {
				if (val) {
					this.province = val.addressProvince;
					this.city = val.addressCity;
				}
			},
			handleIndustry (val) {
				if (val.length !== 0) {
					this.service = val;
				} else {
					this.service = [];
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';

	.iden-company-info{
		text-align: left;
	}
	.iden-company-info .iden-company-common{
		background-color: #fff;
	}
	.iden-company-info .iden-company-pic{
		margin-top: 10px;
		background-color: #fff;
		@include border-bottom($border-color);
	}
	.iden-company-info .iden-company-pic .img-upload-cell{
		padding: 16px 10px;
	}

	.iden-company-info .service-modal .mint-popup-3{
		width: 100%;
	    height: 100%;
	    background-color: #fff;
	    z-index: 1001;
	}
</style>