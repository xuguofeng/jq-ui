(function($) {

	/**
	 * 初始化tree的DOM结构
	 * @param {Object} $tree
	 */
	function initTree($tree) {
		$tree.addClass("st_tree")
			.find("li").addClass("node").end()
			.find("li:has('ul')").removeClass("node").addClass("folder");
		$tree.find("li").children("a").prepend("<span><span>");
		$tree.find("li.folder").children("ul").css("display", "none");
		$tree.find("li.folder[open]").addClass("open").children("ul").css("display", "block");
	}

	/**
	 * 给folder绑定事件
	 * @param {Object} $tree
	 */
	function bindEvent($tree) {
		$tree.find("li.folder > a").click(function(e) {
			var f = $(this).parent();
			if(f.hasClass("open")) {
				f.removeClass("open").children("ul").css("display", "none");
			} else {
				f.addClass("open").children("ul").css("display", "block");
			}
		}).attr("href", "javascript:void(0);");
	}

	$.fn.tree = function(options, param) {

		// 函数
		if (typeof options == 'string') {
			switch(options){
				case 'selectNode':
					return this.each(function() {
						// TODO
						// selectNode($(this), param);
					});
				case 'selectedNode':
					return this.each(function() {
						// TODO
						// selectedNode($(this), param);
					});
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
			// 初始化tree结构
			initTree(tree);
			// 给folder绑定事件
			bindEvent(tree);
		});
	};
})(jQuery);