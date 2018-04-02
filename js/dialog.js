(function($){

	$.extend({dialog:{}});

	// dialog信息缓存
	var dialogCache = {};

	/*
		生成模态窗口的遮挡层
	*/
	function createMask(){
		var $mask = $("<div class=\"dialog-mask\"></div>");
		return $mask;
	}

	/*
		初始化一个dialog的页面DOM结构
	*/
	function initDialog(id){
		var $dialog = $("<div id=\""+id+"\" class=\"dialog\"></div>");
		$dialog.append("<div class=\"dialog-title\"><span></span><div class=\"dialog-close\"><a href=\"javascript:void(0)\"></a></div></div>");
		$dialog.append("<div class=\"dialog-content\"></div>");
		return $dialog;
	}

	/*
		为dialog结构设置css样式
	*/
	function initDialogStyle(dialogEle,settings){
		var screenWidth = $(document.body).width();
		var screenHeight = $(window).height();
		dialogEle.css({"width":settings.width,"height":settings.height,"left":(screenWidth-settings.width)/2,"top":(screenHeight-settings.height)/2});
		dialogEle.css("z-index",101);
		dialogEle.find("div.dialog-title span").html(settings.title);
		dialogEle.find("div.dialog-title").css({"width":settings.width-20});
		dialogEle.find("div.dialog-content").css({"width":settings.width-20,"height":settings.height-35});
	}

	/*
		添加关闭事件
	*/
	function bindEvent(dialogElement){
		dialogElement.find("div.dialog-title .dialog-close").click(function(){
			$(this).parent().parent().hide().remove();

			var id = $(this).parent().parent().attr("id");
			dialogCache[id] = null;

			// 如果是模态窗口，还需要把mask层关掉
			if ($(".dialog-mask")[0]) {
				$(".dialog-mask").remove();
			}
		});
	}

	/*
		添加拖拽事件
	*/
	function bindDragEvent(dialogElement){
		var mX=0,mY=0; // 定义鼠标X轴Y轴
		var dX=0,dY=0; // 定义div左、上位置
		var isDown = false; // mousedown标记

		if(document.attachEvent) {
			dialogElement[0].attachEvent('onselectstart', function() {
				return false;
			});
		}
		dialogElement.find("div.dialog-title").mousedown(function(event) {
			var event = event || window.event;
			mX = event.screenX;
			mY = event.screenY;
			dX = parseFloat(dialogElement.css("left"));
			dY = parseFloat(dialogElement.css("top"));
			isDown = true;
		});
		$(document).mousemove(function(event) {
			var event = event || window.event;
			var x = event.screenX;
			var y = event.screenY;
			if(isDown) {
				dialogElement.css({"left": x - mX + dX, "top": y - mY + dY});//div动态位置赋值
			}
		});

		$(document).mouseup(function() {
			isDown = false;//鼠标拖拽结束
		});
	}

	/*
		加载dialog内容。
		判断dialog的加载方式，
		如果是remote，调用loadFromRemoteUrl方法
		如果是jquery元素，直接向窗口内容中追加即可
	*/
	function load(settings,dialogEle){
		var type = settings.loadType;
		switch (type) {
			case 'remote':
				loadFromRemoteUrl(settings.loadData,dialogEle);
				break;
			case 'jquery':
				dialogEle.find("div.dialog-content").html(settings.loadData);
				break;
			default:
				dialogEle.find("div.dialog-content").html("");
				break;
		}
	}

	/*
		从远程url加载html内容，被load函数调用
	*/
	function loadFromRemoteUrl(url,dialogEle){
		$.ajax({
			dataType:"html",
			url:url+"?d="+new Date().getTime(),
			cache:false,
			success:function(data){
				dialogEle.find("div.dialog-content").html(data);
			}
		});
	}

	/*
		刷新dialog
	*/
	function reload(dialogId){
		// 如果dialog不存在，直接返回false
		if (!dialogCache[dialogId]) return false;
		var ele = $("#"+dialogId);
		load(dialogCache[dialogId],ele);
	}

	/*
		关闭dialog
	*/
	function close(dialogId){
		// 如果dialog不存在，直接返回false
		if (!dialogCache[dialogId]) return false;
		var ele = $("#"+dialogId);
		ele.hide().remove();
	}

	$.extend($.dialog,{
		open : function(settings){

			// 默认参数项
			var defaultSettings = {
				title       :  "对话框", // 标题
				id          :  undefined,// 生成dialog的id
				loadType    :  "remote", // 加载方式，remote|jquery
				loadData    :  undefined,// 数据，会根据加载方式参数的不同进行不同的操作
				width       :  500,      // 宽
				height      :  300,      // 高
				modal       :  false,    // 模态
				dragable    :  true      // 拖拽
			};

			// 合并默认配置和用户配置参数
			settings = $.extend(defaultSettings, settings);

			var dialogId = settings.id;
			
			if(dialogId===undefined||
				dialogId==null||
				dialogId.replace(/(^\s*)|(\s*$)/g,"")==""){
				dialogId = "dialog-"+new Date().getTime();
			}

			// 如果dialog存在，直接返回false
			if (dialogCache[dialogId]) return false;

			// 将dialog配置信息缓存在dialogCache对象中
			dialogCache[dialogId] = settings;

			var dialogEle = initDialog(dialogId);

			initDialogStyle(dialogEle,settings);
			bindEvent(dialogEle);
			bindDragEvent(dialogEle);

			load(settings,dialogEle);

			// 如果是模态窗口，需要创建遮挡层
			if (settings.modal) {
				var mask = createMask();
				mask.appendTo($("body"));
			}

			dialogEle.css("display","block").appendTo($("body"));
			
		},
		reload : function(id){
			reload(id);
		},
		close : function(id){
			close(id);
		}
	});

})(jQuery);
