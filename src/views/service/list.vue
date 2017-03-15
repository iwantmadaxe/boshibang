<template>
	<div class="service-list">
		<ul class="list-row-con">
			<router-link
			class="list-row"
			tag="li"
			v-for="item in list"
			:to="{name: 'ServiceDetail', params: {service_no: item.id}}">
				{{item.name}}
			</router-link>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import apis from '../../apis/index.js';
	import axios from 'axios';

	export default {
		name: 'boss-service-detail',
		data () {
			return {
				list: []
			};
		},
		watch: {
			$route () {
				this.fetchData();
			}
		},
		created () {
			// 获取服务列表
			this.fetchData();
		},
		methods: {
			fetchData () {
				// 获取服务列表id
				this.categoryId = this.$route.params.category_no;

				if (this.categoryId) {
					// 获取服务列表
					axios.get(apis.urls.services + '/' + this.categoryId)
					.then((response) => {
						this.list = response.data.data;
					})
					.catch((error) => {
						apis.errors.errorPublic(error.response, this);
					});
				}
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.service-list {
		.list-row-con {
			background: $color-white;
			.list-row {
				line-height: 0.32rem;
				font-size: $normal-text;
				text-align: left;
				width: 100%;
				padding: 0.1rem 5%;
				&:not(:last-child){
					@include border-bottom($border-gray);
				}
			}
		}
	}
</style>
