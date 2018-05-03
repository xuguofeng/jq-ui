(function($) {

	/**
	 * 初始化tree的DOM结构
	 * @param {jQuery} $tree
	 */
	function initTree($tree) {
		$tree.addClass("st_tree")
			.find("li[class!='node']").addClass("node").end()
			.find("li:has('ul')").removeClass("node").addClass("folder");
		$tree.find("li").children("a").find("span").remove().end().prepend("<span><span>");
		$tree.find("li.folder").children("ul").css("display", "none");
		$tree.find("li.folder[open]").addClass("open").children("ul").css("display", "block");
	}

	/**
	 * 给folder绑定事件
	 * @param {jQuery} $tree
	 * @param {Object} options
	 */
	function bindEvent($tree, options) {
		$tree.find("li.folder > a").on("click", function(e) {
			var f = $(this).parent();
			if(f.hasClass("open")) {
				f.removeClass("open").children("ul").css("display", "none");
			} else {
				if(f.children("ul").length == 0) {
					loadNodes(f, options);
				}
				f.addClass("open").children("ul").css("display", "block");
			}
		}).attr("href", "javascript:void(0);");
	}
	
	/**
	 * 从json数组创建tree节点
	 * @param {jQuery} $target
	 * @param {Object} data
	 * @param {Object} options
	 *	[
	 *		{
	 *			id: 1, 
	 *			text: "", 
	 *			open: true|false, 
	 *			type: "folder", 
	 *			children: [], 
	 *			url: ""
	 *		}, 
	 *		{
	 *			id: 2, 
	 *			text: "", 
	 *			url: ""
	 *		}
	 *	]
	 */
	function createNodes($target, data, options) {
		if(!data || data.length == 0) { return ""; }
		var $ul = $("<ul></ul>");
		for(var i = 0; i < data.length; i++) {
			var d = data[i];
			var $node = $("<li></li>").addClass("node")
										.attr("node-id", "tree-node-" + d["id"]);

			var $a = $("<a></a>").html(d["text"]).prepend("<span><span>");
			if(d["url"]) {
				$a.attr("href", d["url"]);
			} else if(options["onClick"] && !d["type"]) {
				// 注意这个闭包
				$a.attr("href", "javascript:void(0);").click((function(d) {
					return function() {
						options["onClick"](d);
					}
				})(d));
			} else {
				$a.attr("href", "javascript:void(0);");
			}
			$node.append($a);

			if(d["type"] || (d["children"] && d["children"].length > 0)) {
				var $nodes = createNodes($target, d["children"], options);
				$node.append($nodes).removeClass("node").addClass("folder");
				if(d["open"]) {
					$node.attr("open", "");
					loadNodes($node, options);
				}
			}
			$ul.append($node);
		}
		return $ul;
	}

	/**
	 * 从url加载数据
	 * @param {jQuery} $target
	 * @param {Object} options
	 */
	function loadNodes($target, options) {
		if(!options["url"]) { return; }
		var id = 0;
		if($target && $target.attr("node-id")) {
			id = $target.attr("node-id").replace("tree-node-", "");
		}
		$.ajax({
			type: "get",
			dataType: "json",
			url: options["url"] + "?id=" + id,
			cache: false,
			success: function(data) {
				$target.append(createNodes($target, data, options));
				initTree($target);
				bindEvent($target, options);
			}
		});
	}

	/**
	 * 打开指定节点，前提是该节点已经存在且是一个folder
	 * @param {jQuery} $tree
	 * @param {int} folderNodeId
	 */
	function open($tree, folderNodeId) {
		// TODO
	}

	/**
	 * 关闭指定节点，前提是该节点已经存在且是一个folder
	 * @param {jQuery} $tree
	 * @param {int} folderNodeId
	 */
	function close($tree, folderNodeId) {
		// TODO
	}

	$.fn.tree = function(options, param) {

		// 函数
		if (typeof options == 'string') {
			switch(options){
				case 'addNode':
					return this.each(function() {
						// TODO
						// addNode($(this), param);
					});
				case 'removeNode':
					return this.each(function() {
						// TODO
						// removeNode($(this), param);
					});
				case 'open':
					return this.each(function() {
						open($(this), param);
					});
				case 'close':
					return this.each(function() {
						close($(this), param);
					});
			}
		}

		options = options || {};

		return this.each(function() {

			// 缓存配置选项
			$.data(this, "tree", options);

			// 保存对象
			var tree = $(this);

			// 从json数组创建tree节点
			var nodes = createNodes(tree, options["data"], options);
			tree.append(nodes);

			// 从url加载数据
			loadNodes(tree, options);

			// 初始化tree结构
			initTree(tree);

			// 给folder绑定事件
			bindEvent(tree, options);
		});
	};
})(jQuery);