(function($) {

	// dialog的z-index样式，随着dialog的增加而增加
	window[ 'zIndex' ] = 1100;

	/**
	 * 初始化dialog的html结构
	 * 
	 * @param {Object} id
	 */
	function initDialog(id, title) {
		// 对话框DIV
		var $dialog = $("<div></div>")
				.attr("id", id)
				.addClass("dialog-container");
		// header
		var $header = $("<div></div>")
				.addClass("dialog-header")
				.append($("<div>" + title + "</div>").addClass("dialog-title"))
				.append($("<div></div>").addClass("dialog-close"));
		// content
		var $content = $("<div></div>")
				.addClass("dialog-content");
		return $dialog.append($header).append($content);
	}

	/**
	 * 初始化dialog各个组成部分的大小
	 * 
	 * @param {Object} dialog
	 * @param {Object} options
	 */
	function initSize(dialog, options) {
		// 获取屏幕的宽高
		var screenWidth = $(document.body).width();
		var screenHeight = $(window).height();
		// 设置对话框div大小、位置
		dialog.css({
			"width": options["width"],
			"height": options["height"],
			"top": (screenHeight - options["height"])/options['top'],
			"left": (screenWidth - options["width"])/2
		});
		// 设置内容div大小
		dialog.find("div.dialog-content")
			.css({
				"width": options["width"] - 32,
				"height": options["height"] - 57
			});
	}

	/**
	 * 初始化关闭事件
	 * 
	 * @param {Object} dialog
	 */
	function bindEvent(dialog) {
		dialog.find("div.dialog-close").click(function(){
			$.dialog.close(dialog[0].id);
			// 如果是模态窗口，还需要把mask层关掉
			if ($(".dialog-mask")[0])
				$(".dialog-mask").remove();
		});
	}

	/**
	 * 初始化拖动事件
	 * 
	 * @param {Object} dialog
	 */
	function bindDrag(dialog) {
		var mX=0,mY=0; // 定义鼠标X轴Y轴
		var dX=0,dY=0; // 定义div左、上位置
		var isDown = false; // mousedown标记

		if(document.attachEvent) {
			dialog[0].attachEvent('onselectstart', function() {
				return false;
			});
		}
		dialog.find("div.dialog-header").mousedown(function(event) {
			this.style.cursor = "move";
			var event = event || window.event;
			mX = event.screenX;
			mY = event.screenY;
			dX = parseFloat(dialog.css("left"));
			dY = parseFloat(dialog.css("top"));
			isDown = true;
		});
		$(document).mousemove(function(event) {
			var event = event || window.event;
			var x = event.screenX;
			var y = event.screenY;
			if(isDown) {
				dialog.css({"left": x - mX + dX, "top": y - mY + dY}); // div动态位置赋值
			}
		});

		$(document).mouseup(function() {
			dialog.find("div.dialog-header").css("cursor", "default");
			isDown = false; // 鼠标拖拽结束
		});
	}

	/**
	 * 加载内容
	 * 
	 * @param {Object} dialog
	 * @param {Object} options
	 */
	function load(dialog, options) {
		// 优先使用content配置填充内容
		var content = options["content"];
		if(content) {
			dialog.find("div.dialog-content").html(content);
			return;
		}
		// 使用jquery对象填充内容
		var html = options["html"];
		if(html) {
			for(var i = 0; i < html.length; i++) {
				dialog.find("div.dialog-content").append(html[i]);
			}
			return;
		}
		// 使用url进行远程获取
		var url = options["url"];
		if(url)
			ajaxLoad(dialog, url);
	}
	
	/**
	 * 使用ajax从远程url获取dialog内容
	 * 
	 * @param {Object} dialog
	 * @param {Object} url 
	 */
	function ajaxLoad(dialog, url) {
		$.ajax({
			type: "post",
			dataType: "html",
			url: url,
			cache: false,
			success: function(data) {
				// 填充数据到面板
				dialog.find("div.dialog-content").html(data);
			}
		});
	}

	/**
	 * 创建body遮罩层
	 */
	function createMask() {
		return $("<div class='dialog-mask'></div>").css("z-index", ++window[ 'zIndex' ]).appendTo($("body"));
	}

	// 对话框显示和隐藏的动画效果
	var show = {
		slide: function(dialog) {
			dialog.slideDown("100");
		},
		fade: function(dialog) {
			dialog.fadeIn("100");
		}
	};
	var hide = {
		slide: function(dialog, fn) {
			dialog.slideUp("100", function() {
				dialog.remove();
				// 调用关闭函数
				if(fn) fn();
			});
		},
		fade: function(dialog, fn) {
			dialog.fadeOut("100", function() {
				dialog.remove();
				// 调用关闭函数
				if(fn) fn();
			});
		}
	};

	$.dialog = {
		// 打开一个dialog
		open: function(options) {
			// 创建dialog
			var dialog = this.create(options);

			// 把对话框追加到body末尾
			dialog.css({"z-index": ++window[ 'zIndex' ], "display": "none"}).appendTo($("body"));
			// 显示dialog
			if(options['showType'])
				show[options['showType']](dialog);
			else
				dialog.css("display", "block");

			return dialog;
		},
		create: function(options) {
			// 默认配置
			var defaultSettings = {
				id: undefined,
				title: undefined,
				width: 500,
				height: 300,
				top: 3,
				modal: false,
				url: '',
				content: '',
				html: undefined,// [ jquery1, jquery2, ...... ],
				showType: '', // slide|fade
				onClose: null // 关闭时调用的函数
			};
			// 合并默认配置和用户配置参数
			var options = $.extend(defaultSettings, options);

			// 获取对话框div的id
			var dialogId = options[ "id" ];

			if(dialogId === undefined || dialogId == null || dialogId.replace(/(^\s*)|(\s*$)/g,"") == "") {
				dialogId = "jquery_dialog_"+new Date().getTime();
			}

			// 查看是否已经存在这个id的dialog
			if($("#" + dialogId)[0])
				return $("#" + dialogId);

			// 对话框title
			var title = options[ "title" ];
			if(title == undefined || title == null)
				title = dialogId;

			// 创建对话框
			var dialog = initDialog(dialogId, title);
			initSize(dialog, options);
			bindEvent(dialog);
			bindDrag(dialog);
			load(dialog, options);

			// 如果是模态窗口，需要创建遮挡层
			if (options[ 'modal' ])
				createMask();

			// 缓存
			$.data(dialog[0], "dialog", options);

			// 返回这个dialog
			return dialog;
		},
		// 根据id关闭指定dialog
		close: function(id, c) {
			var dialog = $("#" + id);
			if(dialog[0]) {
				var options = $.data(dialog[0], "dialog");

				// 关闭dialog
				if(options['showType'])
					hide[options['showType']](dialog, c||options['onClose']);
				else {
					dialog.remove();
					var f = c||options['onClose'];
					if(f) f();
				}

				// 如果是模态窗口，还需要把mask层关掉
				if ($(".dialog-mask")[0])
					$(".dialog-mask").remove();
			}
		},
		// 根据id刷新指定dialog
		reload: function(id) {
			var dialog = $("#" + id);
			if(dialog[0]) {
				var options = $.data(dialog[0], "dialog");
				if(options["url"])
					ajaxLoad(dialog, options["url"]);
			}
		}
	};

})(jQuery);
