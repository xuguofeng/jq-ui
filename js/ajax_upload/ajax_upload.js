/**
 * 使用纯js异步上传
 * 
 * form_id - 需要提交的form的id
 * callback - 回调函数
 */
function ajax_upload(form_id, callback) {

	// 首先创建一个iframe类似下面的形式
	// <iframe name="AjaxFrame_5257748104_1522576813565" id="AjaxFrame_5257748104_1522576813565" width="1" height="1" style="display: none;"></iframe>
	var iframeName = "AjaxFrame_";
	for(var i = 0; i < 10; i++)
		iframeName += Math.floor(Math.random() * 10);

	iframeName += "_" + (new Date()).getTime();
	var iframe = document.createElement("iframe");

	iframe.setAttribute("name", iframeName);
	iframe.setAttribute("id", iframeName);
	iframe.setAttribute("width", 1);
	iframe.setAttribute("height", 1);

	iframe.style.display = "none";

	// 获取body
	var body = document.getElementsByTagName("body")[0];

	// 把iframe插入到body中
	body.appendChild(iframe);


	// 获取form
	var form = document.getElementById(form_id);
	// 设置target属性
	form.setAttribute("target", iframeName);
	// 提交表单
	form.submit();

	// 执行回调函数
	iframe.onload = function() {
		var resp = window.frames[ iframeName ].document.body.innerHTML;
		callback(resp);
		// 删除iframe
		body.removeChild(this);
		// 移除form的target属性
		form.removeAttribute("target");
	}
}
