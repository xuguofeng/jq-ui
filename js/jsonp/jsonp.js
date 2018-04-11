/**
 * 跨域的 jsonp 请求函数
 * 
 * url - 地址
 * funcNameArg - 目标服务器用于获取回调函数名的请求参数名
 * callBack - 回调函数
 */
function jsonp(url, funcNameArg, callBack) {
	
	// 生成一个随机的函数名
	var rnd = "";
	for(var i = 0; i < 10; i++)
		rnd += Math.floor(Math.random() * 10);

	rnd += "_" + (new Date()).getTime();

	var funcName = "jsonp_" + rnd;

	// 把回调函数注册到window上面
	window[ funcName ] = callBack;

	// 创建script节点
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");

	if(url.indexOf("?") == -1)
		script.setAttribute("src", url + "?" + funcNameArg + "=" + funcName);
	else
		script.setAttribute("src", url + "&" + funcNameArg + "=" + funcName);

	// 把script节点添加到head上面
	var head = document.getElementsByTagName("head")[0];

	head.appendChild(script);

	// 把script节点移除
	head.removeChild(script);
}
