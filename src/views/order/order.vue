<template>
	<div class="odin-order-detail">
		<div class="order-info">
			<div class="order-code">
				<span>订单号：</span>
				<span>{{ detail.code }}</span>
			</div>
			<div class="order-one-list">
				<div class="order-hope-date">
					<span>期望到货时间：</span>
					<span>{{ detail.hopeDate }}</span>
				</div>
				<div class="order-status">
					<span>订单状态：</span>
					<span>{{ detail.status }}</span>
				</div>
			</div>
			<div class="order-location">
				<span>安装位置：</span>
				<span>{{ detail.location }}</span>
			</div>
			<div class="order-status">
				<span>备注信息：</span>
				<span>{{ detail.note }}</span>
			</div>
		</div>
		<transition name="fade">
			<div class="order-production" v-if="detail.list.length">
				<k-complex-cell title="订货清单">
					<ul class="production-info-list">
						<li class="production-info" v-for="infoItem in detail.list">
							<div class="production-name">{{infoItem.name}}</div>
							<div class="production-num">x{{infoItem.num}}</div>
						</li>
					</ul>
				</k-complex-cell>
			</div>
		</transition>
		<transition name="fade">
			<div class="order-location-image" v-if="detail.photos.length">
				<k-complex-cell title="实景照片">
					<ul class="image-info-list">
						<li class="image-info" v-for="(imageItem, index) in detail.photos">
							<img :src="imageItem" :alt="`实景照片${index+1}`" width="100%">
						</li>
					</ul>
				</k-complex-cell>
			</div>
		</transition>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';

	export default {
		name: 'odin-order-detail',
		data () {
			return {
				orderNo: null,
				detail: {
					list: [],
					photos: []
				}
			};
		},
		watch: {
			$route () {
				this.fetchData();
			}
		},
		created () {
			// 背景色
			document.body.style.backgroundColor = '#f0f2f5';
			// 获取订单详情
			this.fetchData();
		},
		methods: {
			fetchData () {
				// 获取订单号
				this.orderNo = this.$route.params.order_no;

				if (this.orderNo) {
					// 获取订单详情
					axios.get(apis.urls.order + '/' + this.orderNo)
					.then((response) => {
						this.detail = response.data.data;
					})
					.catch((error) => {
						apis.errors.errorPublic(error.response, this);
					});
				}
			}
		},
		components: {
			[ComplexCell.name]: ComplexCell
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.odin-order-detail .order-info{
		@include border-top($border-color);
		@include border-bottom($border-color);
		background-color: #fff;
		text-align: left;
		padding: 15px 10px;
		font-size: 15px;
		line-height: 1.5;
		.order-one-list{
			display: flex;
			justify-content: space-between;
		}
	}
	.odin-order-detail .order-production{
		@include border-top($border-color);
		@include border-bottom($border-color);
		margin-top: 10px;
		.production-info-list{
			color: #000;
			margin-right: 10px;
			.production-info{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	.odin-order-detail .order-location-image{
		@include border-top($border-color);
		@include border-bottom($border-color);
		margin-top: 10px;
		.image-info-list{
			margin-right: 10px;
			.image-info:not(:last-child){
				margin-bottom: 10px;
			}
		}
	}
	.odin-order-detail .fade-enter-active, .fade-leave-active {
		transition: opacity 1s
	}
	.odin-order-detail .fade-enter, .fade-leave-active {
		opacity: 0
	}
</style>
