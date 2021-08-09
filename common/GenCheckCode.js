import md5 from "js-md5";
const str = (function() {
 	let isNumeric = (obj) => {
 		let reg = /^[0-9]*$/;
 		return reg.test(obj);
 	};

 	let isChinaMobile = (mobile) => mobile && mobile.length == 11;

 	let trimChinaMobile = (mobile, defaultStr) => {
 		if (mobile) {
 			if (mobile.indexOf("-") > -1 && mobile.indexOf("86-") > -1) {
 				return mobile.split("-")[1];
 			}
 			return mobile;
 		}
 		return defaultStr || "";
 	};

 	let isIdCard = (id) => {
 		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 		let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
 		return reg.test(id);
 	};

 	var isNull = function(s) {
 		return s === null || typeof s === "undefined";
 	};
 	var isNotNull = function(s) {
 		return !isNull(s);
 	};

 	var isEmpty = function(s) {
 		if (isNull(s)) {
 			return true;
 		}
 		if (typeof s !== "string") {
 			return false;
 		}
 		return s.length == 0;
 	};
 	var isNotEmpty = function(s) {
 		return !isEmpty(s);
 	};
 	var emptyToNull = function(s) {
 		return isEmpty(s) ? null : s;
 	};
 	var nullToEmpty = function(s) {
 		return isNull(s) ? "" : s;
 	};
 	var startsWith = function(s, prefix) {
 		return s.indexOf(prefix) == 0;
 	};

 	var endsWith = function(str, suffix) {
 		return str.indexOf(suffix, str.length - suffix.length) !== -1;
 	};

 	var replaceAll = function(s, s1, s2) {
 		if (isEmpty(s)) {
 			return "";
 		}
 		return s.replace(new RegExp(s1, "gm"), s2);
 	};

 	let trim = (x) => x.replace(/^\s+|\s+$/gm, "");

 	let num2str = function(num) {
 		if (isNull(num) || isNaN(num)) {
 			return "0";
 		}
 		let v = parseInt(num);
 		if (v < 1e3) {
 			return `${v}`;
 		}
 		if (v < 1e4) {
 			return `${(v / 1e3).toFixed(1)}K`;
 		}
 		if (v > 1e7) {
 			return "1千万+";
 		}
 		return `${(v / 1e4).toFixed(1)}万`;
 	};

 	let randomString = (len) => {
 		let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 		let maxIndex = chars.length;
 		let s = "";
 		for (let i = 0; i < len; i++) {
 			s += chars.charAt(Math.floor(Math.random() * maxIndex));
 		}
 		return s;
 	};

 	let formatBankNo = (no) => no.replace(/[\s]/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

 	let bankNoTail = (no) => {
 		if (isEmpty(no)) {
 			return "";
 		}
 		return no.substring(no.length - 4);
 	};

 	let rn2br = (str) => str.replace(/(\r\n)|(\n)/g, "<br>");

 	let num2Chinese = (num) => {
 		let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
 		let chnUnitChar = ["", "十", "百", "千"];

 		let strIns = "";
 		let chnStr = "";
 		let unitPos = 0;
 		let zero = true;
 		while (num > 0) {
 			let v = num % 10;
 			if (v === 0) {
 				if (!zero) {
 					zero = true;
 					chnStr = chnNumChar[v] + chnStr;
 				}
 			} else {
 				zero = false;
 				strIns = chnNumChar[v];
 				strIns += chnUnitChar[unitPos];
 				chnStr = strIns + chnStr;
 			}
 			unitPos++;
 			num = Math.floor(num / 10);
 		}

 		chnStr = replaceAll(chnStr, "一十", "十");

 		return chnStr;
 	};

 	return {
 		isEmpty,
 		isNotEmpty,
 		emptyToNull,
 		nullToEmpty,
 		rn2br,
 		startsWith,
 		endsWith,
 		replaceAll,
 		trim,
 		isNull,
 		isNotNull,
 		isIdCard,
 		num2str,
 		isChinaMobile,
 		trimChinaMobile,
 		randomString,
 		formatBankNo,
 		bankNoTail,
 		isNumeric,
 		num2Chinese,
 	};
 })();

 let genUUID = () => {
 	var s = [];
 	var hexDigits = "0123456789abcdef";
 	for (var i = 0; i < 36; i++) {
 		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
 	}
 	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
 	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
 	s[8] = s[13] = s[18] = s[23] = "-";

 	let ret = s.join("");
 	ret = str.replaceAll(ret, "-", "");

 	return ret;
 };

 let genCheckCode = (mobile) => {
 	let t = new Date().getTime().toString();
 	let p = "web";
 	let d = genUUID();
	console.log(genUUID(),'dsadsadsadsadsadsadsa')
 	let v = md5(t.length + t + p.length + p + d.length + d + mobile);

 	return {
 		t,
 		p,
 		d,
 		v,
 	};
 };
 export default class getCode {
 	static genCheckCode = genCheckCode
 }
