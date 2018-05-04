(function($) {

	/**
	 * 初始化tree的DOM结构
	 * @param {jQuery} $tree
	 */
	function _initTree($tree) {
		$tree
			.find("li[class!='node'][class!='folder']").addClass("node").end()
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
	function _bindEvent($tree, options) {
		$tree.find("li.folder > a").unbind().on("click", function(e) {
			var f = $(this).parent();
			if(f.hasClass("open")) {
				f.removeClass("open").children("ul").css("display", "none");
			} else {
				if(f.children("ul").length == 0) {
					_loadNodes(f, options);
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
	function _createNodes($target, data, options) {
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
				var $nodes = _createNodes($target, d["children"], options);
				$node.append($nodes).removeClass("node").addClass("folder");
				if(d["open"]) {
					$node.attr("open", "");
					_loadNodes($node, options);
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
	function _loadNodes($target, options) {
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
			async: false,
			success: function(data) {
				$target.append(_createNodes($target, data, options));
				_initTree($target);
				_bindEvent($target, options);
			}
		});
	}

	/**
	 * 打开指定节点，前提是该节点已经存在且是一个folder
	 * @param {jQuery} $tree
	 * @param {int} folderNodeId
	 */
	function open($tree, folderNodeId) {
		var f = $tree.find("li[node-id='tree-node-" + folderNodeId + "']");
		if(!f[0] || !f.hasClass("folder")) {
			return;
		}
		var options = $.data($tree[0], "tree");
		if(f.children("ul").length == 0) {
			_loadNodes(f, options);
		}
		f.addClass("open").children("ul").css("display", "block");
	}

	/**
	 * 关闭指定节点，前提是该节点已经存在且是一个folder
	 * @param {jQuery} $tree
	 * @param {int} folderNodeId
	 */
	function close($tree, folderNodeId) {
		var f = $tree.find("li[node-id='tree-node-" + folderNodeId + "']");
		if(!f[0] || !f.hasClass("folder")) {
			return;
		}
		f.removeClass("open").children("ul").css("display", "none");
	}

	/**
	 * 打开全部folder节点
	 * @param {jQuery} $tree
	 */
	function openAll($tree) {
		var fs = $tree.find("li[class='folder']");
		while(fs.length > 0) {
			for(var i = 0; i < fs.length; i++) {
				open($tree, fs.eq(i).attr("node-id").replace("tree-node-", ""));
			}
			fs = $tree.find("li[class='folder']");
		}
	}

	/**
	 * 关闭全部folder节点
	 * @param {jQuery} $tree
	 */
	function closeAll($tree) {
		var fs = $tree.find("li.folder.open");
		while(fs.length > 0) {
			for(var i = 0; i < fs.length; i++) {
				close($tree, fs.eq(i).attr("node-id").replace("tree-node-", ""));
			}
			fs = $tree.find("li.folder.open");
		}
	}

	/**
	 * 重新加载指定folder节点
	 * @param {jQuery} $tree
	 * @param {int} folderNodeId
	 */
	function reload($tree, folderNodeId) {
		var f = $tree.find("li[node-id='tree-node-" + folderNodeId + "']");
		if(!f[0] || !f.hasClass("folder")) { return; }
		var options = $.data($tree[0], "tree");
		f.children("ul").remove();
		_loadNodes(f, options);
		if(f.children("ul").length == 0) {
			f.removeClass("open").removeClass("folder").addClass("node");
			f.children("a").off().attr("href", "javascript:void(0);");
			if(options["onClick"]) {
				var d = {
					id: "tree-node-" + folderNodeId, 
					text: f.children("a").text(), 
					children: [], 
					open: false, 
					type: "", 
					url: ""
				}
				f.children("a").click((function(d) {
					return function() {
						options["onClick"](d);
					}
				})(d));
			}
		}
		if(f.hasClass("open")) {
			f.children("ul").css("display", "block");
		} else {
			f.children("ul").css("display", "none");
		}
	}

	$.fn.tree = function(options, param) {

		// 函数
		if (typeof options == 'string') {
			switch(options){
				case 'open':
					return this.each(function() {
						open($(this), param);
					});
				case 'close':
					return this.each(function() {
						close($(this), param);
					});
				case 'openAll':
					return this.each(function() {
						openAll($(this));
					});
				case 'closeAll':
					return this.each(function() {
						closeAll($(this));
					});
				case 'reload':
					return this.each(function() {
						reload($(this), param);
					});
			}
		}

		options = options || {};

		return this.each(function() {

			// 缓存配置选项
			$.data(this, "tree", options);

			// 保存对象
			var tree = $(this).addClass("st_tree");

			// 从json数组创建tree节点
			var nodes = _createNodes(tree, options["data"], options);
			tree.append(nodes);

			// 从url加载数据
			_loadNodes(tree, options);

			// 初始化tree结构
			_initTree(tree);

			// 给folder绑定事件
			_bindEvent(tree, options);
		});
	};
})(jQuery);