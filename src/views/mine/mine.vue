<template>
	<div class="mine">
		<div class="banner-con">
			<div class="user-con">
				<img class="banner-img" src="../../assets/images/mine/mine-banner.png">
				<div class="rank-con">
					<span class="topic">排名</span><span class="rank">{{mine.rank}}</span>
				</div>
				<div class="user-head-con">
					<div class="avatar-con">
						<img class="avatar" v-bind:src="mine.avatar?mine.avatar: defaultAvatar">
						<div class="user-level">v{{mine.level}}</div>
					</div>
					<div class="name one-line" @click="goMineInfoEdit">
						{{mine.name}}
					</div>
					<div class="star-con cl-fx">
						<div class="star-square" v-for="n in mine.star">
							<img src="../../assets/images/index/star.png">
						</div>
					</div>
					<div class="logout">
						<mt-button size="small" type="primary" @click="logout">退出登录</mt-button>
					</div>
				</div>
			</div>
		</div>
		<div class="company-achievement">
			<div class="topic-row">
				<img class="topic-icon" src="../../assets/images/mine/achievement-topic.png">
				<span class="topic-text">企业成就</span>
			</div>
			<div class="context">
				<div class="achievement-square">
					<img src="../../assets/images/mine/achievement1.png">
					<span>企业实力</span>
				</div>
				<div class="achievement-square">
					<img src="../../assets/images/mine/achievement2.png">
					<span>平台贡献</span>
				</div>
				<div class="achievement-square">
					<img src="../../assets/images/mine/achievement3.png">
					<span>平台传播</span>
				</div>
			</div>
		</div>
		<div class="list-con">
			<div class="mine-list-row" @click="goOrderList">
				<img class="left-icon" src="../../assets/images/mine/order-icon.png">
				<div class="list-row-context">
					<span class="title">我的订单</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goNoticeList">
				<img class="left-icon" src="../../assets/images/mine/msg-icon.png">
				<div class="list-row-context">
					<span class="title">我的信息</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
			<div class="mine-list-row" @click="goCouponList">
				<img class="left-icon" src="../../assets/images/mine/coupon-icon.png">
				<div class="list-row-context">
					<span class="title">优惠券</span>
					<img class="right-icon" src="../../assets/images/main/right-arrow.png">
				</div>
			</div>
		</div>
		<!-- 底部栏 -->
		<boss-bottom-pannel tab-selected="mine"></odin-bottom-pannel>
	</div>
</template>
<script>
	import { Indicator, Button, MessageBox } from 'mint-ui';
	import BottomPannel from '../share-template/bottom-pannel.vue';
	import { saveLocal, readLocal } from '../../utils/localstorage.js';
	import apis from '../../apis';
	import axios from 'axios';
	import localLogout from '../../services/logout.js';

	const DefaultAvatar = require('../../assets/images/my/my-default-head.png');

	export default {
		name: 'mine',
		data () {
			return {
				token: '',
				isLogin: false,
				mine: {},
				user: {
					avatar: ''
				},
				defaultAvatar: DefaultAvatar
			};
		},
		created () {
			Indicator.open('加载中...');
			this.token = 'bearer ' + readLocal('user').token;
			axios.defaults.headers.common['Authorization'] = this.token;
			let mineCache = readLocal('mine');
			if (mineCache) {
				this.mine = mineCache;
				this.getUser();
			} else {
				axios.get(apis.urls.mine)
				.then((response) => {
					this.mine = response.data.data;
					saveLocal('mine', this.mine);
					this.getUser();
				})
				.catch((error) => {
					Indicator.close();
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		methods: {
			getUser () {
				let userCache = readLocal('mine-user');
				if (userCache) {
					this.$nextTick(() => {
						Indicator.close();
					});
					this.user = userCache;
				} else {
					axios.get(apis.urls.userProfile)
					.then((response) => {
						Indicator.close();
						this.user = response.data.data;
						saveLocal('mine-user', this.user);
					})
					.catch((error) => {
						Indicator.close();
						apis.errors.errorPublic(error.response, this);
					});
				}
				// axios.get(apis.urls.userProfile)
				// .then((response) => {
				// 	Indicator.close();
				// 	this.user = response.data.data;
				// })
				// .catch((error) => {
				// 	Indicator.close();
				// 	apis.errors.errorPublic(error.response, this);
				// });
			},
			goOrderList () {
				this.$router.push({name: 'OrderMine'});
			},
			goNoticeList () {
				this.$router.push({name: 'NoticeList'});
			},
			goCouponList () {
				this.$router.push({name: 'CouponList'});
			},
			goMineInfoEdit () {
				this.$router.push({name: 'MineInfoEdit'});
			},
			logout () {
				axios.get(apis.urls.logout)
				.then((response) => {
					if (response.data.data) {
						localLogout();
						MessageBox.alert(response.data.data.message, '提示');
						this.$router.push({name: 'Index'});
					}
				})
				.catch((error) => {
					apis.errors.errorPublic(error.response, this);
				});
			}
		},
		components: {
			[BottomPannel.name]: BottomPannel,
			[Button.name]: Button,
			[MessageBox.name]: MessageBox,
			[Indicator.name]: Indicator
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.mine {
		.banner-con {
			.user-con {
				position: relative;
				.banner-img {
					display: block;
					width: 100%;
					min-height: 1.6rem;
				}
				.rank-con {
					color: $color-white;
					width: 0.75rem;
					height: 0.25rem;
					line-height: 0.25rem;
					position: absolute;
					right: 0;
					top: 0.5rem;
					text-align: left;
					background: rgba(0, 0, 0, 0.54);
				    padding-left: 0.1rem;
				    border-radius: 0.1rem 0 0 0.1rem;
					.topic {
						font-size: $normal-text;
					}
					.rank {
						margin-left: 0.1rem;
						font-size: $page-title;
					}
				}
				.user-head-con {
				    width: 1.2rem;
				    left: 0;
				    right: 0;
				    height: 100%;
				    position: absolute;
				    top: 0;
				    margin: 0 auto;
				    .avatar-con {
				    	position: relative;
				    	width: 0.55rem;
					    height: 0.55rem;
					    margin: 0.16rem auto 0.08rem;
				    	.avatar {
						    width: 100%;
						    height: 100%;
						    border: 0.01rem solid #eee;
						    border-radius: 50%;
						    overflow: hidden;
						}
						.user-level {
							position: absolute;
							bottom: 0;
							right: 0;
							padding: 0.01rem 0.04rem;
							line-height: 1;
							border-radius: 2px;
							text-align: center;
							color: $color-white;
							font-size: $normal-text;
							background-color: $color-red;
						}
				    }
					.name {
						color: $color-white;
						font-size: $page-title;
						padding: 0 0.12rem;
						background-image: url('../../assets/images/mine/edit-icon.png');
					    background-repeat: no-repeat;
						background-size: 0.12rem 0.12rem;
						background-position: 100% center;
						min-height: 0.18rem;
					}
					.star-con {
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
					    width: 0.6rem;
    					margin: 0.05rem auto;
    					min-height: 0.1rem;
						.star-square {
							-webkit-box-flex: 1;
							-ms-flex: 1;
							flex: 1;
							img {
								width: 0.1rem;
								display: block;
								margin: 0 auto;
							}
						}
					}
					.logout {
						margin-top: 0.05rem;
						.mint-button {
							background: $color-red;
						}
					}
				}
			}
		}
		.company-achievement {
			background: $color-white;
			.topic-row {
				width: 90%;
				margin: 0 auto;
				height: 0.4rem;
				line-height: 0.4rem;
				@include border-bottom($border-gray);
				.topic-icon {
					width: 0.15rem;
					display: block;
					float: left;
					margin-top: 0.1rem;
				}
				.topic-text {
					font-size: $normal-text;
					text-align: left;
					margin-left: 0.15rem;
					display: block;
					float: left;
				}
			}
			.context {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				.achievement-square {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					img {
						width: 0.35rem;
						display: block;
						margin: 0.2rem auto 0;
					}
					span {
						display: block;
						margin: 0.1rem auto;
						width: 100%;
						text-align: center;
						color: $color-text;
					}
				}
			}
		}
		.list-con {
			margin-top: 0.12rem;
			background: $color-white;
			.mine-list-row {
				height: 0.45rem;
				line-height: 0.45rem;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				&:not(:last-child) .list-row-context {
					@include border-bottom($color-grey);
				}
				.left-icon {
					width: 0.2rem;
					display: block;
					margin: 0.13rem 0.1rem 0 0.1rem;
					height: 0.2rem;
				}
				.list-row-context {
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					text-align: left;
					position: relative;
					.title{
						font-size: $page-title;
						color: $color-text;
					}
					.right-icon {
						position: absolute;
						width: 0.07rem;
						height: 0.14rem;
						right: 0.15rem;
						top: 0;
						bottom: 0;
						margin-top: auto;
						margin-bottom: auto;
					}
				}
			}
		}
	}
</style>
