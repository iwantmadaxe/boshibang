<template>
	<div class="img-upload-card-bar">
		<div class="upload-card">
			<div class="pre-show abs-lt" :style="styles"></div>
		</div>
		<input class="file-input full-layer abs-lt" type="file" accept="image/png,image/jpeg,image/jpg" @change="editPic">
	</div>
</template>
<script>
	import { getFileUrl } from '../../utils/fixtools.js';
	export default {
		name: 'k-img-card',
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
	.img-upload-card-bar{
		border: 2px solid #359df5;
	    border-radius: 3px;
	    position: relative;
	    background-color: #fff;
	    width: 65%;
	    padding: 20px 0 10px 0;
	    margin-left: auto;
	    margin-right: auto;
	}
	.img-upload-card-bar .upload-card{
		width: 135px;
	    height: 81px;
	    background: url(https://static.360buyimg.com/finance/mobile/serviceCenter/realname/1.1.0/css/img/card-a.png);
	    background-size: contain;
	    margin: auto;
	    position: relative;
	    overflow: hidden;
	}
	.img-upload-card-bar .pre-show{
		width: 100%;
	    height: 100%;
	    background-size: contain;
	    background-position: center center;
	    background-repeat: no-repeat
	}
	.img-upload-card-bar .file-input{
		opacity: 0;
	}
	.img-upload-card-bar .full-layer{
		width: 100%;
		height: 100%;
	}
	.img-upload-card-bar .abs-lt{
		position: absolute;
	    left: 0;
	    top: 0;
	}
</style>
