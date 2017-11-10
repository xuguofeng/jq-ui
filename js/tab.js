(function($) {
	
	/**
	 * 初始化tab选项卡、面板样式
	 * @param {Object} $tab
	 */
	function initTab($tab) {
		$tab
			.children("ul").addClass("tab-header")//.addClass("clearfix")
			.children("li").addClass("tab-header-item").append($("<span class=\"close\"></span>"))
			.eq(0).addClass("tab-header-selected");
		$tab
			.children("div").addClass("tab-content")
			.children("div").addClass("tab-content-item").addClass("hide")
			.eq(0).removeClass("hide");
	}

	/**
	 * 初始化tab总高度、内容面板高度
	 * @param {Object} $tab
	 */
	function initContentHeight($tab) {
		$tab.css("height", ($tab.parent().height() - 2) + "px")
			.find(".tab-content").css("height", ($tab.parent().height() - 58) + "px");
			//.children().css("height", ($tab.parent().height() - 56) + "px");
	}
	
	/**
	 * 初始化选项卡点击事件、关闭按钮点击事件
	 * @param {Object} $tab
	 */
	function initEvents($tab) {
		$tab
		// 选项卡点击事件
		.delegate(".tab-header-item", "click", function(){
			var selected = $(this).hasClass("tab-header-selected");
			if (!selected) {
				// 如果这个选项卡没有选中，就调用selectTab函数进行选中
				selectTab($tab, $(this).attr("target"));
			}
		})
//		.delegate(".tab-header-item", "contextmenu", function() {
//			
//		})
		// 关闭按钮点击事件
		.delegate(".close", "click", function() {
			// 获取需要关闭的tab标签的tabId
			var tabId = $(this).parent().attr("target");
			// 调用removeTab函数关闭指定标签
			removeTab($tab, tabId);
		});
	}
	
	/**
	 * 初始化标签右键菜单
	 */
	function initContextMenu() {
		var contextMenu = $("body .tab-contextmenu");
		if (!contextMenu[0]) {
			$("<div class='tab-contextmenu'></div>")
				.append(createContextMenuItem("关闭当前标签", "current"))
				.append(createContextMenuItem("关闭左侧标签", "prevAll"))
				.append(createContextMenuItem("关闭右侧标签", "nextAll"))
				.append(createContextMenuItem("关闭其他", "other"))
				.append(createContextMenuItem("关闭全部", "all"))
				.appendTo("body");
		}
		// 创建一个右键菜单项
		function createContextMenuItem(text, target) {
			return $("<div class='tab-contextmenu-item'></div>").html(text).attr("target", target);
		}
	}
	
	/**
	 * 初始化tab标签的右键菜单功能
	 * http://www.cnblogs.com/splitgroup/p/6921069.html
	 * JS简单实现自定义右键菜单
	 */
	function initWindowContextMenu() {
		// 给body绑定两个事件
		$("body")
		// 右键菜单显示
		.bind("contextmenu", contextMenuHandler)
		// 关闭右键菜单
		.on("click", function() {
			$(".tab-contextmenu").css("display", "none");
		});
		
		// 旧版备份
//		if (navigator.userAgent.toUpperCase().indexOf("FIREFOX") == -1)
//			window.oncontextmenu = contextMenuHandler;
//		else
//			$("body").bind("contextmenu", contextMenuHandler);
//		// 关闭右键菜单
//		$(window).on("click", function() {
//			$(".tab-contextmenu").css("display", "none");
//		});
	}
	
	/**
	 * body元素的contextmenu事件执行函数
	 * @param {Object} ev
	 */
	function contextMenuHandler(ev) {
		
		// 获取事件对象，需要兼容IE
		var e = ev || window.event;
		
		// 获取自定义的右键菜单
		var menu = $(".tab-contextmenu");
		
		// 获取事件源
		// e.srcElement，兼容IE、360、chrome
		// e.target，兼容Firefox
		src = $(e.srcElement || e.target);
		
		// 如果事件源对象是tab标签才显示右键菜单、绑定事件
		if (src.hasClass("tab-header-item")) {
			// 获取tab组件
			var tab = src.parent().parent();
			// 选中点击的标签
			tab.tab("selectTab", src.attr("target"));
			// 取消默认的浏览器右键菜单
			e.preventDefault();
			// 根据事件对象中鼠标点击的位置，进行定位
			// 之后根据点击的标签进行事件绑定
			menu
				.css({"left": e.clientX + 'px', "top": e.clientY + 'px', "display": "block"})
				.children().unbind("click").bind("click", function() {
					// 判断关闭类型：关闭当前标签、关闭左侧标签、关闭右侧标签、关闭其他、关闭全部
					switch($(this).attr("target")){
						case 'current':
							return removeTabs(tab, src);
						case 'prevAll':
							return removeTabs(tab, src.prevAll());
						case 'nextAll':
							return removeTabs(tab, src.nextAll());
						case 'other':
							return removeTabs(tab, src.siblings());
						case 'all':
							return removeTabs(tab, src.parent().children());
					}
				});
		} else {
			menu.css("display", "none");
		}
	}
	
	/**
	 * 添加tab选项卡
	 * @param {Object} $tab
	 * @param {Object} param {"title": "", "id": "", "content": ""}
	 */
	function addTab($tab, param) {
		
		if (isExists($tab, param["id"])) {
			// 如果选项卡已经存在，则调用selectTab函数将其选中
			selectTab($tab, param["id"]);
		} else{
			// 如果选项卡不存在，则先创建再将其选中

			// 去掉选项卡标签的选中样式
			$tab.children("ul").children().removeClass("tab-header-selected");
			// 创建选项卡标签
			$newHeaderItem = $("<li></li>");
			$newHeaderItem
				.text(param["title"])
				.attr("target", param["id"])
				.addClass("tab-header-item").addClass("tab-header-selected")
				.append($("<span class=\"close\"></span>")).appendTo($tab.children("ul"));

			// 隐藏所有选项卡面板
			$tab.children("div").children().addClass("hide");
			// 创建新的选项卡面板
			$newContentItem = $("<div></div>");
			$newContentItem
				.html(param["content"])
				.attr("id", param["id"])
				.addClass("tab-content-item")//.addClass("hide")
				.appendTo($tab.children("div"));
		}
	}
	
	/**
	 * 添加tab选项卡和面板，再从远程url获取数据填充到面板中
	 * @param {Object} $tab
	 * @param {Object} param {"title": "", "id": "", "url": "", "method": ""}
	 */
	function addRemoteTab($tab, param) {
		// 添加选项卡
		addTab($tab, {"title": param["title"], "id": param["id"], "content": ""});
		// 获取数据，然后填充到新添加的面板
		$.ajax({
			type: param["method"] || "post",
			dataType: "html",
			url: param["url"],
			cache: false,
			success: function(data) {
				// 填充数据到面板
				$tab.find("#" + param["id"]).html(data);
			}
		});
	}
	
	/**
	 * 删除tab选项卡
	 * @param {Object} $tab
	 * @param {Object} tabId
	 */
	function removeTab($tab, tabId) {
		// 获取待删除选项卡标签
		var headerItem = $tab.children("ul").children("li[target="+ tabId +"]");
		// 获取该选项卡是否被选中
		var selected = headerItem.hasClass("tab-header-selected");
		// 获取前一个选项卡
		var prevItem = headerItem.prev();
		
		// 如果没有前一个，则获取后一个
		if (!prevItem[0]) {
			prevItem = headerItem.next();
		}
		
		// 删除选项卡标签
		headerItem.remove();
		// 删除选项卡面板
		$tab.children("div").children("#" + tabId).remove();
		
		// 如果待删除选项卡已经被选中且有相邻标签，则将相邻选项卡选中
		if (selected && prevItem) {
			// 标签样式
			prevItem.addClass("tab-header-selected");
			// 面板样式
			$tab.children("div")
				.children("#" + prevItem.attr("target")).removeClass("hide");
		}
	}
	
	/**
	 * 批量删除tab选项卡
	 * @param {Object} $tab
	 * @param {Object} items
	 */
	function removeTabs($tab, items) {
		// 遍历需要关闭的标签对象，逐一进行关闭
		items.each(function() {
			// 调用removeTab函数关闭一个需要关闭的标签
			removeTab($tab, $(this).attr("target"));
		});
	}
	
	/**
	 * 选中指定tab标签
	 * @param {Object} $tab
	 * @param {Object} tabId
	 */
	function selectTab($tab, tabId) {
		// 调整选项卡标签样式
		$tab
			.find("li[target=" + tabId + "]").addClass("tab-header-selected")
			.siblings().removeClass("tab-header-selected");
		// 调整选项卡面板样式
		$tab
			.children("div")
			.children("#" + tabId).removeClass("hide")
			.siblings().addClass("hide");
	}
	
	/**
	 * 判断是否选中指定tab标签
	 * @param {Object} $tab
	 * @param {Object} tabId
	 */
	function isSelected($tab, tabId) {
		return $tab.find("li[target=" + tabId + "]").hasClass("tab-header-selected");
	}
	
	/**
	 * 判断指定tab标签是否存在
	 * @param {Object} $tab
	 * @param {Object} tabId
	 */
	function isExists($tab, tabId) {
		return $tab.find("li[target=" + tabId + "]")[0] != undefined;
	}

	$.fn.tab = function(options, param) {
		
		if (typeof options == 'string') {
			switch(options){
				case 'addTab':
					return this.each(function() {
						addTab($(this), param);
					});
				case 'addRemoteTab':
					return this.each(function() {
						addRemoteTab($(this), param);
					});
				case 'removeTab':
					return this.each(function() {
						removeTab($(this), param);
					});
				case 'selectTab':
					return this.each(function() {
						selectTab($(this), param);
					});
				case 'isSelected':
					return this.each(function() {
						isSelected($(this), param);
					});
				case 'isExists':
					return this.each(function() {
						isExists($(this), param);
					});
			}
		}
		
		options = options || {};

		return this.each(function() {
			// 保存对象
			var tab = $(this);
			// 初始化tab选项卡、面板样式
			initTab(tab);
			// 初始化标签的右键菜单和菜单项
			initContextMenu();
			// 初始化tab总高度、内容面板高度
			initContentHeight(tab);
			// 初始化选项卡点击事件、关闭按钮点击事件
			initEvents(tab);
			// 给body绑定事件，用于显示、关闭tab标签右键菜单
			initWindowContextMenu();
		});
	};
})(jQuery);