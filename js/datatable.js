(function($) {

	/**
	 * 初始化表格组件
	 * @param {Object} $datatable
	 */
	function initTable($datatable) {
		// 获取参数配置
		var options = $.data($datatable[0], "datatable");
		// 表头行
		var tr = $("<tr></tr>");
		// 遍历columns参数
		// 使用columnName填充td
		// 把td追加到表头行
		for(var i = 0; i < options["columns"].length; i++) {
			tr.append("<th>" + options["columns"][i]["columnName"] + "</th>");
		}
		// 把表头行追加到thead
		// 再把thead追加到$datatable
		// 为$datatable添加class，设置cellpadding和cellspacing
		$("<thead></thead>").append(tr).appendTo($datatable.addClass("datatable").attr({ "cellpadding": "0", "cellspacing": "0" }));
		// 定义表格wrapper组件
		var wrap = $("<div></div>").addClass("datatable-wrapper");

		// 设置宽和高
		wrap.css({ "width": options["width"], "height": options["height"] });
		// 为table追加到tbody
		// 再wrap包裹table
		$datatable.append("<tbody></tbody>").wrap(wrap);
	}
	
	/**
	 * 加载初始数据，初始化分页组件
	 * @param {Object} $datatable
	 */
	function loadData($datatable) {
		// 获取参数配置
		var options = $.data($datatable[0], "datatable");
		// 获取url
		var url = options["url"];
		// 获取数据，然后填充到新添加的面板
		$.ajax({
			type: options["method"] || "post", // 默认使用post请求
			dataType: "json",
			url: url,
			data: { "pageNum": options["pageNum"], "pageSize": options["pageSize"] },
			success: function(data) {
				// 首先清空tbody
				var tbody = $datatable.find("tbody").empty();
				// 遍历数据集合
				for(var i = 0; i < data["users"].length; i++) {
					var user = data["users"][i];
					// 定义一个tr
					var tr = $("<tr></tr>");
					// 遍历columns
					// 获取每一个字段的值填充td
					// 再把td追加到tr
					for(var j = 0; j < options["columns"].length; j++) {
						tr.append("<td>" + user[ options["columns"][j]["field"] ] + "</td>");
					}
					// 把tr追加到tbody
					tbody.append(tr);
				}
				// 分页组件
				if(options["pagination"]) {
					// 先把之前的分页组件删除
					$datatable.parent().find(".pagination").remove();
					// 定义一个div用于显示分页组件
					var $pagination = $("<div></div>").css("margin-top", "10px");
					// 初始化分页组件
					$pagination.pagination({
						pageNum: options["pageNum"],
						size: options["pageSize"],
						total: data["totalPage"],
						click: function(curr, s) {
							options["pageNum"] = curr;
							$.data(this, "datatable", options);
							loadData($datatable);
							return data["totalPage"];
						}
					});
					// 把分页组件追加到datatable组件
					$datatable.parent().append($pagination);
				}
			}
		});
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
			width: "100%",		// 表格默认的宽，默认80%
			height: "auto",		// 表格默认的高，默认auto
			columns: [],
			url: "",
			pageNum: 1,			// 显示第几页数据，默认1
			pageSize: 10,		// 每页数据数量，默认10
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