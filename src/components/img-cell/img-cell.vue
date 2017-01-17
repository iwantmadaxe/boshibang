<template>
	<div class="img-upload-cell-bar">
		<div class="upload-cell">
			<div class="pre-show abs-lt" :style="styles"></div>
		</div>
		<input class="file-input full-layer abs-lt" type="file" accept="image/png,image/jpeg,image/jpg" @change="editPic">
	</div>
</template>
<script>
	import { getFileUrl } from '../../utils/fixtools.js';
	export default {
		name: 'k-img-cell',
		data () {
			return {
				blobImg: null
			};
		},
		props: {
			imgFile: {
				default: null
			}
		},
		computed: {
			styles () {
				if (this.blobImg) {
					return {
						backgroundImage: `url(${this.blobImg})`,
						backgroundColor: 'rgb(255, 255, 255)'
					};
				}
			}
		},
		methods: {
			editPic (e) {
				this.blobImg = getFileUrl(e.target);
				this.imgFile = e.target.files.item(0) ? e.target.files.item(0) : null;
			}
		}
	};
</script>
<style lang="scss">
	.img-upload-cell-bar{
		display: inline-block;
	    position: relative;
	    background-color: #fff;
	    width: 81px;
	}
	.img-upload-cell-bar .upload-cell{
		width: 81px;
	    height: 81px;
	    background: url('../../assets/images/img-add-bars/add-bar.png') no-repeat;
	    background-size: contain;
	    position: relative;
	    overflow: hidden;
	}
	.img-upload-cell-bar .pre-show{
		width: 100%;
	    height: 100%;
	    background-size: contain;
	    background-position: center center;
	    background-repeat: no-repeat
	}
	.img-upload-cell-bar .file-input{
		opacity: 0;
	}
	.img-upload-cell-bar .full-layer{
		width: 100%;
		height: 100%;
	}
	.img-upload-cell-bar .abs-lt{
		position: absolute;
	    left: 0;
	    top: 0;
	}
</style>
