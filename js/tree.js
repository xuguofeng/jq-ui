(function($) {

	/**
	 * 初始化tree的DOM结构
	 * @param {Object} $tree
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
	 * @param {Object} $tree
	 * @param {Object} url
	 */
	function bindEvent($tree, url) {
		$tree.find("li.folder > a").on("click", function(e) {
			var f = $(this).parent();
			if(f.hasClass("open")) {
				f.removeClass("open").children("ul").css("display", "none");
			} else {
				if(f.children("ul").length == 0) {
					loadNodes(f, url);
				}
				f.addClass("open").children("ul").css("display", "block");
			}
		}).attr("href", "javascript:void(0);");
	}
	
	/**
	 * 从json数组创建tree节点
	 * @param {Object} data
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
	 *		}, 
	 *		......
	 *	]
	 */
	function createNodes(data, url) {
		if(!data || data.length == 0) {
			return "";
		}
		var $ul = $("<ul></ul>");
		for(var i = 0; i < data.length; i++) {
			var d = data[i];
			var $node = $("<li></li>")
					.addClass("node")
					.attr("node-id", "tree-node-" + d["id"])
					.append($("<a></a>").attr("href", d["url"] ? d["url"] : "#").html(d["text"]).prepend("<span><span>"));

			// 判断d.url是不是undefined|null|""|#
			// 判断d.onClick是否存在
			// 以上两点都正确，才在这里给a标签设置点击方法

			if(d["type"] || (d["children"] && d["children"].length > 0)) {
				var $nodes = createNodes(d["children"], url);
				$node.append($nodes).removeClass("node").addClass("folder");
				if(d["open"]) {
					$node.attr("open", "");
					loadNodes($node, url);
				}
			}
			$ul.append($node);
		}
		return $ul;
	}

	/**
	 * 从url加载数据
	 * @param {Object} $target
	 * @param {Object} url
	 */
	function loadNodes($target, url) {
		if(!url) {
			return;
		}
		var id = 0;
		if($target && $target.attr("node-id")) {
			id = $target.attr("node-id").replace("tree-node-", "");
		}
		$.ajax({
			type: "get",
			dataType: "json",
			url: url + "?id=" + id,
			cache: false,
			success: function(data) {
				$target.append(createNodes(data, url));
				initTree($target);
				bindEvent($target, url);
			}
		});
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
						// TODO
						// open($(this), param);
					});
				case 'close':
					return this.each(function() {
						// TODO
						// close($(this), param);
					});
			}
		}

		options = options || {};

		return this.each(function() {
			// 保存对象
			var tree = $(this);

			// 从json数组创建tree节点
			var nodes = createNodes(options["data"], options["url"]);
			tree.append(nodes);

			// 从url加载数据
			loadNodes(tree, options["url"]);

			// 初始化tree结构
			initTree(tree);

			// 给folder绑定事件
			bindEvent(tree, options["url"]);
		});
	};
})(jQuery);