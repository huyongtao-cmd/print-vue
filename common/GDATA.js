let map = {}
export default class GDATA {
	static set(key, value) {
		map[key] = value
	}
	static get(key) {
		return map[key]
	}
}
