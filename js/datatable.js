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
		// 选择列
		if(options["showCheckbox"])
			tr.append("<th style='text-align:center'>选择</th>");

		// 遍历columns参数
		// 使用columnName填充td
		// 把td追加到表头行
		for(var i = 0; i < options["columns"].length; i++) {
			var th = $("<th>" + options["columns"][i]["columnName"] + "</th>");
			if(options["columns"][i]["css"])
				th.css(options["columns"][i]["css"]);
			tr.append(th);
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
				// 缓存数据
				$.data($datatable[0], "data", data["rows"]);
				// 首先清空tbody
				var tbody = $datatable.find("tbody").empty();
				// 遍历数据集合
				for(var i = 0; i < data["rows"].length; i++) {
					var user = data["rows"][i];
					// 定义一个tr
					var tr = $("<tr></tr>");
					// 添加复选框
					if(options["showCheckbox"]){
						tr.append("<td style='text-align:center'><input type='checkbox' row-id='" + i + "' /></td>");
					}

					// 遍历columns
					// 获取每一个字段的值填充td
					// 再把td追加到tr
					for(var j = 0; j < options["columns"].length; j++) {
						var v = user[ options["columns"][j]["field"] ];
						var format = options["columns"][j]["format"];
						if(format) {
							v = format(v);
						}
						var td = $("<td>" + v + "</td>");
						if(options["columns"][j]["css"])
							td.css(options["columns"][j]["css"]);
						tr.append(td);
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

	/**
	 * 获取选择的行记录的数组
	 * @param {Object} $datatable
	 */
	function getSelectRows($datatable) {
		// 获取tbody中的所有tr
		var trs = $datatable.find("tbody tr");
		// 获取缓存中的行记录数据
		var data = $.data($datatable[0], "data");
		// 定义数组保存选择的行记录
		var rows = new Array();
		// 遍历全部tr
		for(var i = 0; i < trs.length; i++) {
			// 获取行首复选框的checked状态
			// 如果选中就把对应的行记录放到rows数组
			var checked = $(trs[i]).children().eq(0).find("input[row-id]").prop("checked");
			if(checked)
				rows.push(data[i]);
		}
		// 如果选择了一个就返回这个记录
//		if(rows.length == 1)
//			return rows[0];

		// 如果选择了多个或没有选择就返回数组
		return rows;
	}
	
	$.fn.datatable = function(options, param) {

		// 方法
		if (typeof options == 'string') {
			switch(options){
				// 重新加载数据
				case 'reload':
					return this.each(function() {
						loadData($(this));
					});
				// 获取选择的行记录
				case 'getSelectRows':
					return getSelectRows($(this));
			}
		}

		// 默认参数配置
		var defaults = {
			width: "100%",		// 表格默认的宽，默认100%
			height: "auto",		// 表格默认的高，默认auto
			columns: [],
			url: "",
			pageNum: 1,			// 显示第几页数据，默认1
			pageSize: 10,		// 每页数据数量，默认10
			pagination: true,	// 是否启用分页组件，默认启用
			showCheckbox: false	// 行首是否显示复选框，默认不显示
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