<template>
	<div class="k-area-picker">
		<mt-popup :visible.sync="visible" position="bottom" class="mint-area" :lock-scroll="true">
			<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" v-ref:picker show-toolbar>
				<span class="mint-area-action mint-area-cancel" @click="visible = false">{{ cancelText }}</span>
				<span class="mint-area-action mint-area-confirm" @click="confirm">{{ confirmText }}</span>
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
	import { Picker, Popup, MessageBox } from 'mint-ui';
	import { readLocal, saveLocal } from '../../utils/localstorage.js';
	import apis from '../../api';

	export default {
		name: 'k-area-picker',
		data () {
			return {
				addressSlots: [
					{
						flex: 1,
						values: ['请选择'],
						className: 'slot1',
						textAlign: 'center'
					}, {
						divider: true,
						content: '-',
						className: 'slot2'
					}, {
						flex: 1,
						values: ['请选择'],
						className: 'slot3',
						textAlign: 'center'
					}
				],
				currentValue: {
					addressProvince: '',
					addressCity: ''
				},
				area1: [{
					id: 0,
					name: '请选择'
				}],
				area2: [{
					id: 0,
					name: '请选择'
				}]
			};
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			}
		},
		computed: {
			areaTop () {
				if (typeof this.area1 === 'object' && this.area1 instanceof Array) {
					let tpl = this.area1.map(function (item) {
						return item.name;
					});

					return tpl;
				} else {
					return [];
				}
			},
			areaButtom () {
				if (typeof this.area2 === 'object' && this.area2 instanceof Array) {
					let tpl = this.area2.map(function (item) {
						return item.name;
					});

					return tpl;
				} else {
					return [];
				}
			}
		},
		methods: {
			onAddressChange (picker, values) {
				// 获取1级地址对应的数值
				let tplProvince = this.getAddressRelation(this.area1, values[0]);
				if (tplProvince) {
					// 判断是否有缓存，有限读取缓存
					if (readLocal(`addressList:${tplProvince.id}`) !== false) {
						this.area2 = readLocal(`addressList:${tplProvince.id}`);
						picker.setSlotValues(1, this.areaButtom);
					} else {
						this.$http.get(apis.urls.address, {params: {id: tplProvince.id}}).then((response) => {
							this.area2 = apis.pures.pureAddressList(response.body).items;
							// 将每层地址写入缓存
							saveLocal(`addressList:${tplProvince.id}`, this.area2);
							picker.setSlotValues(1, this.areaButtom);
						}, (response) => {
							MessageBox.alert('暂无该项数据！', '提示');
						});
					}
				}
				this.currentValue.addressProvince = this.getAddressRelation(this.area1, values[0]);
				this.currentValue.addressCity = this.getAddressRelation(this.area2, values[1]);
			},
			confirm () {
				this.visible = false;
				this.$emit('confirm', this.currentValue);
			},
			getAddressRelation (range, val) {
				for (let rItem of range) {
					if (rItem.name === val) {
						return rItem;
					}
				}
				return false;
			}
		},
		compiled () {
			// 判断是否有缓存，有限读取缓存
			if (readLocal('addressList') !== false) {
				this.area1 = readLocal('addressList');
				this.$refs.picker.setSlotValues(0, this.areaTop);
			} else {
				this.$http.get(apis.urls.address, {params: {id: 0}}).then((response) => {
					this.area1 = apis.pures.pureAddressList(response.body).items;
					// 将每层地址写入缓存
					saveLocal('addressList', this.area1);
					this.$refs.picker.setSlotValues(0, this.areaTop);
				}, (response) => {});
			}
		},
		components: {
			[Picker.name]: Picker,
			[Popup.name]: Popup
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	.k-area-picker{
		.mint-area{
			width: 100%;
			.picker-slot-wrapper,
			.picker-item {
				backface-visibility: hidden;
			}
			.picker-toolbar {
				border-bottom: solid 1px #eaeaea;
			}
			.mint-area-action{
				display: inline-block;
				width: 50%;
				text-align: center;
				line-height: 40px;
				font-size: 16px;
				color: $color-blue;
			}
			.mint-area-cancel{
				float: left;
			}
			.mint-area-confirm{
				float: right;
			}
		}
	}
</style>