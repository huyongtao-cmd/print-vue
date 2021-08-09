export default class Toast {
	static show(title, duration) {
		uni.showToast({
			icon: 'none',
			title: title,
			duration: duration || 2000
		})
	}
	static hide() {
		uni.hideToast()
	}
}
