/**
 * multipart/form-data表单异步上传
 * form_id - 需要提交的form的id
 * callback - 回调函数
 * dataType - 返回数据类型：json|html|text
 */
function ajax_upload(form_id, callback, dataType) {
	var iframeName = "AjaxFrame_";
	for (var i = 0; i < 10; i++) {
		iframeName += Math.floor(Math.random() * 10);
	}
	iframeName += "_" + (new Date()).getTime();
	var iframe = document.createElement("iframe");
	iframe.setAttribute("name", iframeName);
	iframe.setAttribute("id", iframeName);
	iframe.setAttribute("width", 1);
	iframe.setAttribute("height", 1);
	iframe.style.display = "none";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(iframe);
	var form = document.getElementById(form_id);
	form.setAttribute("target", iframeName);
	form.submit();
	iframe.onload = function() {
		var resp = window.frames[iframeName].document.body.innerHTML;
		if(dataType) {
			resp = __parseData(resp, dataType);
		}
		callback(resp);
		body.removeChild(this);
		form.removeAttribute("target");
	}
}
function __parseData(data, dataType) {
	if(!dataType) {
		return data;
	}
	if(dataType == 'json') {
		if(typeof data == 'string') {
			try {
				var obj = JSON.parse(data);
				if(obj && typeof obj == 'object') {
					return obj;
				}
			} catch(e) {
			}
		}
	}
	return data;
}