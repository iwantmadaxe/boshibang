<template>
	<div class="iden-user-info">
		<section class="iden-user-common">
			<mt-cell title="公司名称" is-link @click="openPrompt('公司名称', 'company')" :value="company"></mt-cell>
			<mt-cell title="姓名" is-link @click="openPrompt('姓名', 'ownName')" :value="ownName"></mt-cell>
			<mt-cell title="职务" is-link @click="openPrompt('职务', 'job')" :value="job"></mt-cell>
			<mt-cell title="邮箱" is-link @click="openPrompt('邮箱', 'email')" :value="email" type="email"></mt-cell>
		</section>
		<section class="iden-user-pic">
			<mt-cell title="工作名片"></mt-cell>
			<div class="img-upload-cell">
				<k-img-cell :img-file.sync="pic"></k-img-cell>
			</div>
		</section>
	</div>
</template>
<script>
	import { Cell, MessageBox } from 'mint-ui';
	import ImgCell from '../../components/img-cell/img-cell.vue';

	export default {
		name: 'zeco-iden-user-info',
		props: {
			pic: null,
			company: '',
			job: '',
			ownName: '',
			email: ''
		},
		components: {
			[Cell.name]: Cell,
			[ImgCell.name]: ImgCell
		},
		methods: {
			openPrompt (name, type) {
				MessageBox.prompt(' ', `请输入${name}`).then(({ value }) => {
					if (value) {
						this[type] = value;
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import '../../assets/sass/partials/_border.scss';
	@import '../../assets/sass/partials/_var.scss';

	.iden-user-info{
		text-align: left;
	}
	.iden-user-info .iden-user-common{
		background-color: #fff;
	}
	.iden-user-info .iden-user-pic{
		margin-top: 10px;
		background-color: #fff;
		@include border-bottom($border-color);
	}
	.iden-user-pic .img-upload-cell{
		padding: 16px 10px;
	}
</style>