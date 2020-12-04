/**
 * 统一处理 API 错误
 * @param error Error
 * @param errorFrom 错误来源
 * @param errorFrom.target 错误来源函数父对象
 * @param errorFrom.key 错误来源函数键名
 * @param errorFrom.arguments 错误来源函数参数列表
 * @constructor
 */
let APIErrorCatch = function(error, errorFrom) {
    // console.log('❌',error,errorFrom.arguments);
	// 生成错误来源信息
	let fromName = "";
	let fromNameFull = "";
	let argumentsString = "";
	if (errorFrom && errorFrom.target) {
		if (errorFrom.target.constructor) {
			fromName = errorFrom.target.constructor.name;
		}
		if (errorFrom.target.name) {
			fromName = errorFrom.target.name;
		}

		if (errorFrom.arguments) {
			let args = Array.from(errorFrom.arguments);
			argumentsString = args.map(x => JSON.stringify(x)).join(", ");
		}
	}
	fromNameFull = fromName + "." + errorFrom.key;

	// // 判断错误性质
	let diagnose = "";
	if (error.response && error.request) {
		diagnose = `🔌[请求已完成但服务端报错]`;
	}
	if (!error.response && error.request) {
		diagnose = `😰[请求未发出就出错]`;
	}

	const CSS_1 = "pbackground:rgba(239, 0, 0,.5); color:#fff;";
	const CSS_2 = "background: rgba(239, 212, 212,.5);";
	console.log( `%c[APIError]%c - %c ${fromNameFull}(${argumentsString}) %c\n`, CSS_1, "", CSS_2, ";", diagnose + "\n", error );
};
export default APIErrorCatch;
