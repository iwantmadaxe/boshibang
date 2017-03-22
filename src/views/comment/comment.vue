<template>
	<div class="comment">
		<div class="comment-context cl-fx">
			<div class="comment-topic">
				<div class="comment-radio-square-con cl-fx">
					<div class="comment-radio-square">
						<div class="comment-btn">
							<input type="radio" class="comment-radio" v-model="comment.rank" value="1">
							<div class="comment-img" :class="{'choose': comment.rank === '1'}">
							</div>
						</div>
						<span class="comment-exp">好评</span>
					</div>
					<div class="comment-radio-square">
						<div class="comment-btn">
							<input type="radio" class="comment-radio" v-model="comment.rank" value="2">
							<div class="comment-img" :class="{'choose': comment.rank === '2'}">
							</div>
						</div>
						<span class="comment-exp">中评</span>
					</div>
					<div class="comment-radio-square">
						<span class="comment-exp" style="float:right;">差评</span>
						<div class="comment-btn" style="float:right;">
							<input type="radio" class="comment-radio" v-model="comment.rank" value="3">
							<div class="comment-img"  :class="{'choose': comment.rank === '3'}">
							</div>
						</div>
					</div>
				</div>
				<div class="rainbow">
					<img class="rainbow-img" src="../../assets/images/comment/rainbow.png">
				</div>
			</div>
			<div class="upload-con cl-fx">
				<div class="upload-square" v-show="photos.length < 6">
					<input type="file" class="upload-file" @change="upload">
				</div>
				<div class="place-photo">
					<ul class="img-list">
						<li
						class="img-item"
						v-for="(photo, index) in photos">
							<img v-bind:src="photo">
							<div class="delete-icon" @click="deletePhoto(index)">
								<i class="mintui mintui-field-error"></i>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="comment-textarea">
				<mt-field v-model:value="comment.content" placeholder="输入您对本次服务的评价..." type="textarea" rows="6"></mt-field>
			</div>
		</div>
		<div class="btn-comment">
			<mt-button size="large" type="primary" @click="commentPost">提交</mt-button>
		</div>
	</div>
</template>
<script>
	import apis from '../../apis';
	import axios from 'axios';
	import { Button, Indicator, Field, MessageBox } from 'mint-ui';
	import { readLocal } from '../../utils/localstorage.js';
	import ComplexCell from '../../components/complex-cell/complex-cell.vue';
	import ImgBtn from '../../components/image-upload/image-upload.vue';

	export default {
		name: 'comment',
		data () {
			return {
				token: '',
				comment: {
					order_id: '',
					content: '',
					rank: '1',
					images: []
				},
				photos: []
			};
		},
		created () {
			this.comment.order_id = this.$route.params.order_no;
		},
		methods: {
			commentPost () {
				this.token = 'bearer ' + readLocal('user').token;
				axios.defaults.headers.common['Authorization'] = this.token;
				if (this.comment.content === '') {
					MessageBox.alert('评价内容不能为空！', '提示');
					return false;
				}
				let commetTpl = {
					order_id: parseInt(this.comment.order_id),
					content: this.comment.content,
					rank: parseInt(this.comment.rank),
					images: this.comment.images
				};
				axios.post(apis.urls.comment, commetTpl)
				.then((response) => {
					if (response.data) {
						MessageBox.alert(response.data.data.message, '提示');
						this.$router.push({name: 'OrderMine'});
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			},
			upload () {
				let _this = this;
				if (_this.photos.length >= 6) { // 图片达到上限
					return false;
				}
				let file = event.target.files[0];
				let fr = new window.FileReader();
				fr.onloadend = function () {
					_this.photos.push(fr.result);
					_this.comment.images.push(fr.result);
				};
				if (file) {
					fr.readAsDataURL(file);
				} else {
				}
				return true;
			},
			deletePhoto (index) {
				this.photos.splice(index, 1);
				this.comment.images.splice(index, 1);
				return false;
			}
		},
		components: {
			[Button.name]: Button,
			[Indicator.name]: Indicator,
			[Field.name]: Field,
			[ComplexCell.name]: ComplexCell,
			[ImgBtn.name]: ImgBtn,
			[MessageBox.name]: MessageBox
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.comment {
		.comment-context {
			background: $color-white;
			border-radius: 0.05rem;
			-webkit-border-radius: 0.05rem;
			width: 90%;
			margin: 0.15rem auto 0;
			padding: 0.15rem 0.2rem;
			.comment-radio-square {
				width: 30%;
				float: left;
				height: 0.2rem;
				line-height: 0.2rem;
				.comment-btn {
					width: 0.2rem;
					height: 0.2rem;
					position: relative;
					float: left;
					.comment-radio {
						width: 100%;
						height: 100%;
						display:block;
						position: absolute;
						z-index: 10;
						opacity: 0;
					}
					.comment-img {
						background-image: url("../../assets/images/main/not-choose.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;
						display:block;
						width: 100%;
						height: 100%;
						position: absolute;
						border: none;
						border-color: transparent;
						z-index: 9;
					}
					.choose {
						background-image: url("../../assets/images/main/choose.png");
					}
				}
				.comment-exp {
					font-size: $normal-text;
					color: $color-text;
					text-align: left;
					display: block;
					float: left;
					margin-left: 0.1rem;
				}
				&:first-child {
					width: 40%;
				}
			}
		}
	}
	.comment {
		.comment-topic {
			.comment-radio-square-con {

			}
			.rainbow {
				width: 100%;
				margin: 0.15rem 0;
				.rainbow-img {
					width: 100%;
					display: block;
				}
			}
		}
		.upload-con {
			padding: 0.15rem 0;
			@include border-top($border-gray);
			.upload-square {
				width: 0.6rem;
				height: 0.6rem;
				position: relative;
				background-image: url('../../assets/images/main/upload.png');
				background-size: 0.6rem 0.6rem;
				background-repeat: no-repeat;
				.upload-file {
					z-index: 10;
					position: absolute;
					width: 100%;
					height: 100%;
					display: block;
					opacity: 0;
				}
			}
			.place-photo {
				border: 0;
				@include border-top(transparent);
				@include border-bottom(transparent);
				.img-list {
					width: 100%;
					.img-item {
					    width: 30%;
					    margin-left: 3.3%;
					    height: 0.4rem;
						img {
							width: 100%;
    						display: block;
    						max-height: 0.4rem;
						}
					}
				}
			}
		}
		.comment-textarea {
			.mint-field-core {
				font-size: $text-area-size;
			}
			.mint-field {
				border: 0.01rem solid $border-gray;
				background-image: none;
				.mint-cell-wrapper {
					background-image: none;
				}
			}
		}
		.btn-comment {
			width: 90%;
			margin:  0.3rem auto 0;
			.mint-button {
				background: $color-red;
			}
		}
	}
</style>
