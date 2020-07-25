class Url {

	/**
	 * 从url里面获取数据
	 * @param url
	 * @returns {{}}
	 */
	getUrlParams(url) {
		var search = url.substring(url.lastIndexOf("?") + 1);
		var obj = {};
		var reg = /([^?&=]+)=([^?&=]*)/g;
		search.replace(reg, function(rs, $1, $2) {
			var name = decodeURIComponent($1);
			var val = decodeURIComponent($2);
			val = String(val);
			obj[name] = val;
		});
		return obj
	}

	/**
	 * 从已经编码的字符串里面获取数据
	 * @param url
	 * @returns {{}}
	 */
	getDecodeUrlParams(url) {
		let str = decodeURIComponent(url)
		return this.getUrlParams(str)
	}
}

// var a = 't%3Diagsro%26q%3D17';
// var b = new Url()
// console.log(b.getDecodeUrlParams(a))
export default new Url
