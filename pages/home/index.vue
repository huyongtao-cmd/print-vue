<template>
	<div class="container" v-show="loaded">

		<HeaderTitle />
		<div class='top-block' />

		<div class='main'>

			<u-notice-bar mode="horizontal" speed="100" :list="alert"></u-notice-bar>

			<ul class="entry">
				<li v-for="(item, index) in printTypes" :key="index" @click="goCart(item)">{{item.name}}</li>
			</ul>

			<div class="clearfix" />

			<CommonSwiper :swiperData="banners" :size="{
                width: '90vw',
                height: '29vw'
            }" />
		</div>
	</div>
</template>

<script>
	import CommonSwiper from '../../components/CommonSwiper'
	import HeaderTitle from '../../components/HeaderTitle'

	export default {
		data() {
			return {
				loaded: true,
				banners: [],
				printTypes: [],
				alert: ['十一放假，店内无人，请学生们自行安排打印时间，不要将紧急任务发布于平台，最晚接单截止到30号晚上9点。'],
				textWidth: wx.getSystemInfoSync().windowWidth * 0.9 - 20,
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		},
		components: {
			CommonSwiper,
			HeaderTitle
		},
		methods: {
			getInfo() {
				this.$Api.post('/usr/home/home', {
						platform: 'mobile'
					})
					.then(res => {
						let {
							banners = [], printTypes = []
						} = JSON.parse(res || '{}');
						this.banners = banners;
						this.printTypes = printTypes;
					});
			},
			goCart(item) {}
		},
		mounted() {
			this.getInfo()
			wx.setNavigationBarTitle({
				title: '首页'
			})
			wx.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000',
				animation: {
					duration: 200,
					timingFunc: 'easeIn'
				}
			})
		},
		onShow() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.top-block {
			width: 100vw;
			height: 55vw;
			background: #19252F url("https://fs.maidaotech.cn/fine-printer/mp/logo_home.png") center bottom 10vw no-repeat;
			background-size: 38vw;
		}

		.main {
			margin-top: -16px;
			width: 100%;
			background: #FFFFFF;
			border-radius: 14px 14px 0 0;
			padding: 3vw 5vw;


			.entry {
				width: 100%;
				margin-top: 20px;

				li {
					float: left;
					width: calc((90vw - 10px)/2);
					height: 85px;
					background: #F6F6F6;
					border-radius: 6px;
					line-height: 85px;
					text-align: center;
					margin: 0 10px 10px 0;

					&:nth-child(even) {
						margin-right: 0;
					}
				}
			}

			.clearfix {
				clear: both;
			}
		}

	}
</style>
