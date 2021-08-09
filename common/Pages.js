import KvStorage from './KvStorage.js'
import Obj from './Obj.js'

const action2url = (key, payload) => {
	switch (key) {
		case 'page':
			if (!payload) {
				return '/pages/index/index'
			} else {
				return `/pages/index/index?id=${payload.id}`
			}
			break;
		case 'personal':
			return '/pagesUser/user/user-info'
			break;

	}
}
const actionToUrl = (action) => {
	return action2url(action.key, action.payload);
};
const toPage = (url) => {
	let optIndex = url.indexOf('?');
	let route = url;
	let options = {};
	if (optIndex > 0 && optIndex < url.length - 1) {
		route = url.substring(0, optIndex);
		let search = url.substring(optIndex + 1);
		let pairs = search.split('&');
		pairs.forEach(function (q) {
			let kv = q.split('=');
			let val = kv.length > 1 ? kv[1] : '';
			options[kv[0]] = val.length > 0 ? decodeURIComponent(val) : val;
		});
	}
	return {
		route: route,
		options: options
	};
};
const go = (key, payload, success) => {
	let url = action2url(key, payload);
	if (!url) {
		return;
	}
	let pages = getCurrentPages();
	console.log('===========pages===========', pages);
	let len = pages.length;
	let delta = -1;
	if (len > 0) {
		let target = toPage(url);
		target.route = target.route.substr(1);
		for (let i = 0; i < len; i++) {
			let page = pages[i];
			if (page.route == target.route && Obj.equals(page.options, target.options)) { //
				delta = i + 1; //目标页在栈中的位置
				break;
			}
		}
	}
	//console.log('delta', delta);
	if (delta < 0) {
		//页面不在栈中
		if (len < 10) {
			//console.log('navigateTo', url);
			uni.navigateTo({
				url: url,
				success: success
			});
		} else {
			//console.log('redirectTo', url);
			uni.redirectTo({
				url: url,
				success: success
			});
		}
	} else {
		//console.log('navigateBack', len - delta);
		// uni.navigateBack({
		// 	delta: len - delta
		// });
		uni.redirectTo({
			url: url
		})
	}
};
const tabGo = (key, payload) => {
	go(key, payload);
}
const tabTo = (action, success) => {
	go(action.key, action.payload, success)
}
const action = (action) => {
	return go(action.key, action.payload);
};
const page2url = (page) => {
	let url = '/' + page.route;
	if (page.options) {
		let first = true;
		for (let key in page.options) {
			if (first) {
				url += '?';
				first = false;
			}
			url += key + '=' + page.options[key];
		}
	}
	return url;
};
export default class Pages {
	static back = (redirect) => {
		let pages = getCurrentPages();
		if (pages.length > 1) {
			if (redirect) {
				let url = page2url(pages[0]);
				console.log('will redirect to ' + url);
				uni.redirectTo({
					url: url
				});
			} else {
				uni.navigateBack();
			}
		} else {
			uni.redirectTo({
				url: '/pages/index/index',
			});
		}
	}
	static current = () => {
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		return '/' + page.route;
	}

	static actionToUrl = actionToUrl
	static action2url = action2url
	static go = go
	static action = action
	static tabTo = tabTo
	static gotoLogin = () => {
		go('/pages/login/login');
	}
	static goHome = () => {
		uni.redirectTo({
			url: '/pages/index/index',
		});
	}
}