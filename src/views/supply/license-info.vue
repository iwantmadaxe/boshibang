<template>
	<div class="zeco-supply-license-info">
		<x-complex-cell title="公司证照">
			<div class="license-pic">
				<ul class="cl-fx" v-if="licenseInfo.license.length">
					<li v-for="licenseItem in licenseInfo.license"><img :src="licenseItem"></li>
				</ul>
				<div v-else>暂无</div>
			</div>
		</x-complex-cell>
		<x-complex-cell title="企业荣誉">
			<div class="honor-pic">
				<ul class="cl-fx" v-if="licenseInfo.honor.length">
					<li v-for="honorItem in licenseInfo.honor"><img :src="honorItem"></li>
				</ul>
				<div v-else>暂无</div>
			</div>
		</x-complex-cell>
		<x-complex-cell title="成功案例">
			<div class="case-pic">
				<ul class="cl-fx" v-if="licenseInfo.case.length">
					<li v-for="caseItem in licenseInfo.case">
						<img :src="caseItem.img1">
						<div class="one-line">{{caseItem.title}}</div>
					</li>
				</ul>
				<div v-else>暂无</div>
			</div>
		</x-complex-cell>
	</div>
</template>
<script>
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';

	export default {
		name: 'zeco-supply-license-info',
		props: {
			licenseInfo: {
				default: function () {
					return {
						license: [],
						honor: [],
						case: []
					};
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

	.zeco-supply-license-info ul>li{
		float: left;
		width: 48%;
		margin: 3px;
		padding: 3px;
		@include border-all($border-color);
	}
	.zeco-supply-license-info ul>li img{
		width: 100%;
	}
</style>