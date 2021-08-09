<template>
	<div class="container" v-show="loaded">
		<HeaderTitle title="个人中心" />
		<div class="info">
			<div class="bg" />
			<div class="user">
				<div class="avatar">
					<div class="inner">
						<img :src="profile.avatar" class='img' />
					</div>
					<img src="/static/image/profile/icon_profile_edit.png" class='edit' />
				</div>
				<div class="nick">
					{{profile.name||profile.nick}}
					<span>跑跑达人</span>
				</div>
				<div class="mobile">{{profile.mobile}}</div>
			</div>
		</div>

		<ul class="stat">
			<li>
				<p>12</p>
				<span>待派送</span>
			</li>
			<li>
				<p>9</p>
				<span>进行中</span>
			</li>
			<li>
				<p>1233</p>
				<span>已完成</span>
			</li>
		</ul>

		<ul class="entry">
			<li><i class="trade" />
				<p>我的订单</p>
			</li>
			<li><i class="price" />
				<p>价格明细</p>
			</li>
			<li><i class="about" />
				<p>关于我们</p>
			</li>
		</ul>

	</div>
</template>

<script>
	import HeaderTitle from '../../components/HeaderTitle'

	export default {
		data() {
			return {
				loaded: false,
				profile: {}
			}
		},
		components: {
			HeaderTitle
		},
		methods: {
			getUser() {
				this.$Api.post('usr/user/profile', {})
					.then(profile => {
						this.loaded = true
						this.profile = profile
					})
					.catch(err => {
						console.log('err:', err)
					})
			}
		},
		mounted() {
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		onShow() {
			this.getUser()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: auto;

		.info {
			position: relative;
			height: 70vw;

			.bg {
				width: 100vw;
				height: 45vw;
				background: url("https://fs.maidaotech.cn/fine-printer/mp/bg_profile_top.png") no-repeat;
				background-repeat: no-repeat;
				background-size: contain;
			}

			.user {
				position: absolute;
				width: 100%;
				top: 29.4vw;

				.avatar {
					position: relative;
					margin-left: 38vw;
					width: 24vw;
					height: 24vw;

					.inner {
						position: relative;
						width: 24vw;
						height: 24vw;
						border-radius: 50%;
						overflow: hidden;

						.img {
							position: relative;
							width: calc(24vw + 10px);
							height: calc(24vw + 10px);
							left: -5px;
							top: -5px;
						}
					}

					.edit {
						width: 22px;
						height: 22px;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}

				.nick {
					margin-top: 7px;
					line-height: 25px;
					font-size: 16px;
					color: #3a3a3a;
					letter-spacing: 1.5px;
					text-align: center;
					font-weight: 500;

					span {
						padding: 0 7px;
						background: $primary-color;
						border-radius: 15px;
						font-size: 10px;
						color: #FFFFFF;
					}
				}

				.mobile {
					text-align: center;
					line-height: 20px;
					font-size: 13px;
					color: #9a9a9a;
					letter-spacing: 1.25px;
				}
			}
		}

		.stat {
			width: 92vw;
			height: 90px;
			margin: 0px 4vw;
			background: #F6F6F6;
			border-radius: 7px;
			display: flex;

			li {
				position: relative;
				flex: 1;
				color: #333333;
				padding: 17px 0;
				text-align: center;

				p {
					font-size: 17px;
					letter-spacing: 1.6px;
					list-style: 20px;
					font-weight: 500;
				}

				span {
					margin-top: 10px;
					display: block;
					line-height: 15px;
					font-size: 13px;
					letter-spacing: 1.25px;
				}

				&::after {
					position: absolute;
					content: '';
					width: 1px;
					height: 50%;
					right: 0;
					top: 25%;
					border-right: 1px solid #D8D8D8;
					transform: scale(.5);
				}

				&:last-child {
					&::after {
						display: none;
					}
				}
			}
		}

		.entry {
			width: 100%;
			margin-top: 20px;

			li {
				display: flex;
				position: relative;
				width: 100%;
				height: 48px;
				padding: 17px 15px;
				line-height: 14px;
				font-size: 15px;
				@include border-btm();
				background: url("https://fs.maidaotech.cn/fine-printer/mp/icon_arrow_right.png") center right 15px no-repeat;
				background-size: 6px;

				i {
					flex: 0 0 15px;
					display: block;
					width: 15px;
					height: 15px;
				}

				.trade {
					background: url("https://fs.maidaotech.cn/fine-printer/mp/icon_trade.png") center no-repeat;
					background-size: contain;
				}

				.price {
					background: url("https://fs.maidaotech.cn/fine-printer/mp/icon_price.png") center no-repeat;
					background-size: contain;
				}

				.about {
					background: url("https://fs.maidaotech.cn/fine-printer/mp/icon_about.png") center no-repeat;
					background-size: contain;
				}

				p {
					flex: 1;
					padding: 0 7px;
					font-size: 14px;
					height: 15px;
					line-height: 15px;
					@include multi-line(1);
				}

				.badge {
					flex: 0 0 40px;
					margin-right: 10px;

					span {
						padding: 0 7px;
						background: #FF4444;
						border-radius: 7px;
						color: #fff;
						height: 14px;
						line-height: 14px;
						font-size: 11px;
					}
				}

				&:last-child {
					&:after {
						display: none;
					}
				}

			}

			.without-arrow {
				background: none;
			}

		}
	}
</style>
