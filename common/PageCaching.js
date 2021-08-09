import KvStorage from "./KvStorage.js"
export default class PageCaching {
	static set(path,data) {
		KvStorage.set(path,JSON.stringify(data))
	}
	static get(key) {
		return JSON.parse(KvStorage.get(key))
	}
}