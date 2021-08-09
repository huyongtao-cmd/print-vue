import KvStorage from './KvStorage.js'
import GDATA from './GDATA.js'
import Api from './Api.js'

export default class User {
	static get() {
		return Api.auth().then(() => {
			return GDATA.get('user');
		});
	}
	static set(user) {
		GDATA.set('user', user);
		try {
			KvStorage.set('user', JSON.stringify(user));
		} catch (e) {
			//ignore
		}
	}
	static getOpenId() {
		let appid = KvStorage.get('openid')
		return (JSON.parse(appid)).openid
	}
	
	static getAppIdAndOpenId() {
		return KvStorage.get('openid');
	}

}
