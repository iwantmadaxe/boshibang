<template>
	<div class="notice-list">
		<div class="notice-square">
			<img class="icon" src="../../assets/images/notice/reply.png">
			<div class="context">
				<p class="title">新评论</p>
				<p class="exp">您有新的回复哦</p>
			</div>
			<div class="time">
				3-14
			</div>
		</div>
		<div class="notice-square">
			<img class="icon" src="../../assets/images/notice/notice.png">
			<div class="context">
				<p class="title">系统通知</p>
				<p class="exp">新的系统通知</p>
			</div>
			<div class="time">
				3-14
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	// import apis from '../../apis/index.js';
	// import axios from 'axios';

	export default {
		name: 'notice-list',
		data () {
			return {
			};
		},
		created () {
		},
		methods: {
		}
	};
</script>
<style lang="scss">
	@import '../../assets/sass/partials/_var.scss';
	@import '../../assets/sass/partials/_border.scss';

	.notice-list {
		background: $color-white;
		.notice-square {
			width: 90%;
			margin: 0 auto;
			padding: 0.15rem 0;
		    display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			&:not(:last-child) {
				@include border-bottom($border-gray);
			}
			.icon {
				width: 0.4rem;
				height: 0.4rem;
				display: block;
			}
			.context {
			    -webkit-box-flex: 1;
			    -ms-flex: 1;
			    flex: 1;
			    text-align: left;
			    padding: 0 0.15rem;
				.title {
					color: $color-text;
					font-size: $page-title;
					height: 0.2rem;
					line-height: 0.2rem;
				}
				.exp {
					color: $color-grey;
					font-size: $normal-text;
					height: 0.2rem;
					line-height: 0.2rem;
				}
			}
			.time {
				color: $color-grey;
				font-size: $normal-text;
			}
		}
	}
</style>
