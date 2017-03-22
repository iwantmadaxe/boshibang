<template>
	<div class="k-area-picker">
		<mt-popup
		v-model="currentVisible"
		position="bottom"
		class="k-area"
		:lock-scroll="true">
			<div class="k-area-heading">
				<div class="area-heading-detail">
					<span class="k-area-title">所在地区</span>
					<span class="k-area-title-icon" @click="close"><i class="iconfont icon-close"></i></span>
				</div>
				
				<mt-navbar class="page-part" v-model="selected">
					<mt-tab-item id="1">
						<span class="area-select-content">{{ province ? province.name : '待选择' }}</span>
					</mt-tab-item>
					<mt-tab-item id="2">
						<span class="area-select-content" v-show="province">{{ city ? city.name : '待选择' }}</span>
					</mt-tab-item>
					<mt-tab-item id="3">
						<span class="area-select-content" v-show="province && city">{{ district ? district.name : '待选择' }}</span>
					</mt-tab-item>
				</mt-navbar>
			</div>
			<div class="k-area-content">
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1">
						<div
						class="province-info"
						v-for="area1Item in area1"
						@click="setRegion(province.code, 2)">
							<input type="radio" class="area-radio" v-model="province" :value="area1Item">
							<span class="area-name">{{area1Item.name}}</span>
							<span class="area-choose"><i class="icon-choose mintui mintui-success"></i></span>
						</div>
					</mt-tab-container-item>

					<mt-tab-container-item id="2">
						<div
						class="province-info"
						v-for="area2Item in area2"
						@click="setRegion(city.code, 3)">
							<input type="radio" class="area-radio" v-model="city" :value="area2Item">
							<span class="area-name">{{area2Item.name}}</span>
							<span class="area-choose"><i class="icon-choose mintui mintui-success"></i></span>
						</div>
					</mt-tab-container-item>

					<mt-tab-container-item id="3">
						<div
						class="province-info"
						v-for="area3Item in area3"
						@click="confirmChoose">
							<input type="radio" class="area-radio" v-model="district" :value="area3Item">
							<span class="area-name">{{area3Item.name}}</span>
							<span class="area-choose"><i class="icon-choose mintui mintui-success"></i></span>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import { Popup, Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import apis from '../../apis/index.js';
	import axios from 'axios';

	export default {
		name: 'k-area-picker',
		data () {
			return {
				selected: '1',
				province: this.areaChoose.province,
				city: this.areaChoose.city,
				district: this.areaChoose.district,
				area1: [],
				area2: [],
				area3: []
			};
		},
		props: {
			value: {
				default: false
			},
			areaChoose: {
				default () {
					return {
						province: null,
						city: null,
						district: null
					};
				}
			}
		},
		computed: {
			currentVisible: {
				get () {
					return this.value;
				},
				set (val) {
					this.$emit('input', val);
					this.$emit('on-change', val);
				}
			}
		},
		watch: {
			'areaChoose.province': function (val) {
				this.getRegion(val.code, 2);
				this.province = val;
			},
			'areaChoose.city': function (val) {
				this.getRegion(val.code, 3);
				this.city = val;
			},
			'areaChoose.district': function (val) {
				this.district = val;
			}
		},
		created () {
			// 判断是否有缓存，有限读取缓存
			if (readLocal('addressList') !== false) {
				this.area1 = readLocal('addressList');
			} else {
				axios.get(apis.urls.address + '/' + 1)
				.then((response) => {
					this.area1 = apis.pures.pureAddressList(response.data.data).items;
					// 将每层地址写入缓存
					saveLocal('addressList', this.area1);
				});
			}
			if (this.district.id) {
				this.getRegion(this.province.code, 2);
				this.getRegion(this.city.code, 3);
				this.selected = '3';
			} else if (this.city.id) {
				this.getRegion(this.province.code, 2);
				this.getRegion(this.city.code, 3);
				this.selected = '3';
			} else if (this.province.id) {
				this.getRegion(this.province.code, 2);
				this.selected = '2';
			}
		},
		methods: {
			setRegion (code, level) {
				// 清空选项
				this.district = {id: null, code: null, name: ''};
				this[`area${level}`] = [];
				if (level === 2) {
					this.city = {id: null, code: null, name: ''};
				}
				// 读取地区
				this.getRegion(code, level);
				// 切换tab
				this.selected = level.toString();
			},
			getRegion (code, level) {
				// 判断是否有缓存，有限读取缓存
				if (readLocal('addressList:' + code) !== false) {
					this[`area${level}`] = readLocal('addressList:' + code);
				} else {
					axios.get(apis.urls.address + '/' + code)
					.then((response) => {
						this[`area${level}`] = apis.pures.pureAddressList(response.data.data).items;
						// 将每层地址写入缓存
						saveLocal('addressList:' + code, this[`area${level}`]);
					});
				}
			},
			confirmChoose () {
				let params = {
					province: this.province,
					city: this.city,
					district: this.district
				};
				this.$emit('choose-area', params);
				this.currentVisible = false;
			},
			close () {
				this.currentVisible = false;
			}
		},
		components: {
			[Popup.name]: Popup,
			[Navbar.name]: Navbar,
			[TabItem.name]: TabItem,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.k-area-picker .k-area{
		width: 100%;
		height: 420px;
	}
	.k-area-picker .area-heading-detail{
		position: relative;
		padding: 15px 10px 0;
		color: #666;
		font-size: 15px;
	}
	.k-area-picker .k-area-title-icon{
		position: absolute;
		top: 15px;
		right: 10px;
	}
	/* 选择条 */
	.k-area-heading {
		@include border-bottom($border-color);
	}
	.k-area-heading .mint-navbar .mint-tab-item.is-selected{
		border-bottom: 0;
		margin-bottom: 0;
	}
	.k-area-heading .mint-navbar .mint-tab-item.is-selected:after {
       	margin: auto;
	    height: 3px;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: $color-red;
	    width: 70%;
	    content: "";
	}
	.k-area-heading .mint-tab-item {
		position: relative;
		.mint-tab-item-label {
			color: $color-red;
		}
	}
	.k-area-heading .mint-navbar .mint-tab-item{
		padding: 17px 0 3px;
	}
	.k-area-heading .area-select-content{
		font-size: 13px;
	}
	.k-area-heading .is-selected .area-select-content{
		border-bottom: 2px solid $color-red;
		margin-bottom: -2px;
		font-size: 13px;
	}
	.k-area-picker .k-area-content{
		max-height: 342px;
		overflow-y: scroll;
		text-align: left;
	}
	.k-area-content .province-info{
		padding: 15px 10px;
		font-size: 13px;
		position: relative;
		.area-radio{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 1;
			opacity: 0;
			&~.area-choose{
				opacity: 0;
				transition: all 0.3s ease-in;
				.icon-choose{
					font-size: 13px;
				}
			}
			&:checked~.area-choose{
				color: red;
				opacity: 1;
			}
			&:checked+.area-name{
				color: red;
			}
		}
	}
</style>
