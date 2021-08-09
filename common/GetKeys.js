//用于列表获取绝对安全key
let uid = 0
const Item2UIDMap = new WeakMap()
export default class getKey {
	static get(item) {
		const persistedUID = Item2UIDMap.get(item)
		if (!persistedUID) {
			Item2UIDMap.set(item, ++uid)
			return uid
		}
		return persistedUID
	}
}
