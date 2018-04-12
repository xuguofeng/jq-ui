(function($) {

	/**
	 * 设置title
	 * 
	 * @param {Object} $panel
	 * @param {Object} options
	 * @param {Object} content
	 */
	function initPanel($panel, options, content) {

		if(!options["title"]) return;

		var $header = $("<div></div>")
				.addClass("panel-header")
				.append($("<div></div>").addClass("panel-title").html(options["title"]));

		var $content = $("<div></div>")
				.addClass("panel-content").html(content);
		
		$panel.append($header).append($content);
	}
	
	/**
	 * 设置宽高
	 * 
	 * @param {Object} $panel
	 * @param {Object} options
	 */
	function initSize($panel, options) {
		// 设置面板的宽和高
		if(options["width"])
			$panel.css("width", options["width"]);
		
		if(options["height"])
			$panel.css("height", options["height"]);
		// 为面板内容设置宽高
		setTimeout(function() {
			$panel.find(".panel-content").css({
				"width": ($panel.width() - 20),
				"height": ($panel.height() - 46)
			});
		}, 10);
	}

	/**
	 * 加载数据
	 * 
	 * @param {Object} $panel
	 * @param {Object} options
	 */
	function load($panel, options) {
		if(options["url"]) {
			_load($panel, options["url"]);
		}
	}
	
	/**
	 * 使用url加载数据
	 * 
	 * @param {Object} $panel
	 * @param {Object} url
	 */
	function _load($panel, url) {
		if(!url) {
			var options = $.data($panel[0], "panel");
			url = options["url"];
		}
		if(!url) return;
		$.ajax({
			type: "post",
			dataType: "html",
			url: url,
			cache: false,
			success: function(data) {
				// 填充数据到面板
				$panel.find("div.panel-content").html(data);
			}
		});
	}

	$.fn.panel = function(options, param) {

		if (typeof options == 'string') {
			switch(options) {
				case 'reload':
					return this.each(function() {
						_load($(this), param);
					});
				case 'options':
					return this.each(function() {
						return $.data(this, "panel");
					});
			}
		}

		// 默认参数配置
		var defaults = {
			title: "",
			width: "0",
			height: "0",
			url: ""
		};

		// 合并自定义参数
		var options = $.extend(defaults, options);

		return this.each(function() {

			var $panel = $(this);

			// 设置class
			$panel.addClass("panel");

			// 缓存
			$.data(this, "panel", options);

			// 缓存之前的面板内容
			var content = $panel.html();
			$panel.html("");

			// 设置title
			initPanel($panel, options, content);
			
			// 加载数据
			load($panel, options);

			// 设置宽高
			initSize($panel, options);

			
		});
	};
})(jQuery);