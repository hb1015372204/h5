/**
 * 错误捕获装饰器，让一个发送请求的函数发送错误时交给 APIErrorCatch 统一处理
 * @returns {*}
 * @param target
 * @param key
 * @param descriptor
 */

import APIErrorCatch from "./errorCatch";


function errorCatch(target, key, descriptor) {
	// console.log("Decorators errorCatch:", { target, key, descriptor });
	let rawFunc = descriptor.value;
	descriptor.value = async function () {
        let res;
		try {
            res = await rawFunc.apply(this, arguments);
			console.log('🐲',res);
		} catch (error) {
			APIErrorCatch(error, { target, key, arguments });
		}
		return res;
	};

	return descriptor;
}



export { errorCatch };
