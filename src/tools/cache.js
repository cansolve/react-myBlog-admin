/*
	* 存放本地临时数据，页面刷新之后清空
*/

let cache = {}

function setCache(key, value) {
	cache[key] = value;
}

function getCache(key) {
	return cache[key]
}

function removeCache(key) {
	delete cache[key];
}


export default {
	set: setCache,
	get: getCache,
	remove: removeCache
};