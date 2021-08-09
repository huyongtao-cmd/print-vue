let map = {}
export default class KvStorage {
	static set(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			// error
			map[key] = value;
		}
	}
	static delete(key) {
		try {
			delete map[key];
			uni.removeStorageSync(key);
		} catch (e) {
			// error
		}
	}
	static get(key) {
		try {
			return uni.getStorageSync(key);
		} catch (e) {
			// error
			return map[key]
		}
	}
	static getAsObject(key) {
		try {
			let val = get(key);
			if (!val) {
				return null;
			}
			return JSON.parse(val);
		} catch (e) {
			// error
			return map[key]
		}
	}
}
