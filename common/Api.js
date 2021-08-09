import Env from './Env.js'
import KvStorage from './KvStorage.js'
import Request from '@/components/luch-request/request.js'
import Preloader from '@/components/Preloader.js'
import Toast from '@/components/Toast.js'
const defaultError = {
	'errcode': -1,
	'errmsg': '网络错误',
};
const wrapParameters = (params) => {
	let wrapped = {};
	for (let key in params) {
		let val = params[key];
		if (val === undefined || val === null || val === '') {
			continue;
		}
		if (typeof val == 'object') {
			val = JSON.stringify(val);
		}
		wrapped[key] = val;
	}
	return wrapped;
};
const post = (path, data, options = {}) => {
	let {
		showPreloader = false, showError = true, maxRequestsNum = 2
	} = options;
	let requestsNum = 0;
	console.log('requesting...' + path);
	let apiPromise = (resolve, reject) => {
		Preloader.show();
		requestsNum++;
		let rejectWrap = (ret) => {
			console.log(ret.errmsg)
			showError && Toast.show(ret.errmsg);
			reject(ret);
		};
		let url = Env.api + path;
		data = data || {};
		data = wrapParameters({
			'user-token': KvStorage.get('user-token'),
			...data
		});
		new Request().request({
			url,
			data,
			method: 'POST',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then((response) => {
			Preloader.hide();
			if (response.statusCode != 200) {
				return rejectWrap(defaultError);
			}
			let ret = response.data;
			var errcode = ret.errcode;
			if (errcode) {
				if (errcode === 5) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				return rejectWrap(ret);
			}
			resolve(ret.result);
		}).catch((err) => {
			Preloader.hide();
			if (requestsNum < maxRequestsNum) {
				resolve(new Promise(apiPromise));
			} else {
				rejectWrap(defaultError);
			}
		});
	};
	return new Promise(apiPromise);
};
const setAuthInfo = (result) => {
	// token信息
	let {
		userSession = {}, user = {}
	} = result;
	let token = userSession.token;
	wx.setStorageSync('user-token', userSession.token)
	wx.setStorageSync('user-id', user.id)
	wx.setStorageSync('openid', user.openId)

	KvStorage.set('user-token', token);
	// 用户信息
	KvStorage.set('user', JSON.stringify(user));
	// 微信信息
	KvStorage.set('openid', user.openId);
};
export default class Api {
	static post = post
	static setAuthInfo = setAuthInfo
}