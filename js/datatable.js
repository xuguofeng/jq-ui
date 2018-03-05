(function($) {
	
	function initTable($datatable) {
		// 获取参数配置
		var options = $.data($datatable[0], "datatable");

		var columns = options["columns"];

		$datatable.addClass("datatable").attr({ "cellpadding": "0", "cellspacing": "0" });

		var tr = $("<tr></tr>");

		for(var i = 0; i < columns.length; i++) {
			tr.append("<th>" + columns[i]["columnName"] + "</th>");
		}

		$("<thead></thead>").append(tr).appendTo($datatable);

		var wrap = $("<div></div>").addClass("datatable-wrapper");

		if(options["width"])
			wrap.css("width", options["width"]);
		
		if(options["height"])
			wrap.css("height", options["height"]);
		
		$datatable.wrap(wrap);
	}
	
	function loadData($datatable) {
		
	}
	
	$.fn.datatable = function(options, param) {

		// 方法
		if (typeof options == 'string') {
			switch(options){
//				case 'addTab':
//					return this.each(function() {
//						addTab($(this), param);
//					});
			}
		}
		
		// 默认参数配置
		var defaults = {
//			width: 400,		// 表格默认的宽，默认400
//			height: 300,	// 表格默认的高，默认300
			columns: [],
			url: "",
			pageNum: 1,		// 显示第几页数据，默认1
			pageSize: 10,	// 每页数据数量，默认10
			pagination: true	// 是否启用分页组件，默认启用
		};
		
		// 合并自定义参数
		var options = $.extend(defaults, options);

		return this.each(function() {
			// 缓存配置参数
			$.data(this, "datatable", options);

			// 保存对象
			var datatable = $(this);

			// 初始化表格组件
			// 表头
			initTable(datatable);

			// 加载初始数据，初始化分页组件
			loadData(datatable);
		});
	};
})(jQuery);