(function($) {

	/**
	 * 创建一个button
	 * 
	 * @param {Object} text
	 * @param {Object} fn
	 */
	function createButton(text, fn) {
		return $("<button>" + text + "</button>")
				.addClass("default-button")
				.click(function() {
					$.dialog.close($(this).parentsUntil(".dialog-container").parent().attr("id"));
					if(fn) fn();
				});
	}

	/**
	 * 设置定时关闭的定时器
	 * 
	 * @param {Object} dialog
	 * @param {Object} t
	 */
	function setTimer(dialog, t) {
		// 定时关闭
		if(t > 0) {
			setTimeout(function() {
				$.dialog.close(dialog[0].id);
			}, t);
		}
	}

	$.messager = {
		alert: function(options) {
			// 默认配置
			var defaultSettings = {
				title: '信息',
				width: 250,
				height: 170,
				content: '页面出现错误。',
				level: 'warning', // info|question|warning|error
				btn: '确定',
				time: 0,
				showType: '' // slide|fade
			};

			// 合并默认配置和用户配置参数
			var options = $.extend(defaultSettings, options);

			// 消息内容
			var messageContent = $("<div></div>")
					.addClass("message-content")
					.append($("<span></span>").addClass("message-" + options[ 'level' ] + "-icon message-icon"))
					.append($("<span>" + options[ 'content' ] + "</span>"));

			// 按钮容器
			var messageButtonContainer = $("<div></div>").addClass("message-button-container");

			// 把按钮添加到按钮容器
			messageButtonContainer.append(createButton(options[ 'btn' ], null));

			// 创建dialog
			var alertDialog = $.dialog.create({
				title: '信息',
				width: 250,
				height: 170,
				modal: true,
				showType: options[ 'showType' ]
			});
			// 把alert的组件插入到dialog中，显示dialog
			alertDialog
				.find("div.dialog-content").append(messageContent).append(messageButtonContainer).end()
				.css({"display": "block", "z-index": ++window[ 'zIndex' ]}).appendTo($("body"));

			// 定时关闭
			setTimer(alertDialog, options[ 'time' ]);
		},
		
		confirm: function(options) {

			var defaultSettings = {
				title: '信息',
				width: 250,
				height: 170,
				content: '请确认？',
				btn: [ 
				       { text: '确定', callback: function() {} }, 
				       { text: '取消', callback: function() {} }
				],
				showType: '' // slide|fade
			};

			// 合并默认配置和用户配置参数
			var options = $.extend(defaultSettings, options);

			// 消息内容
			var messageContent = $("<div></div>")
					.addClass("message-content")
					.append($("<span></span>").addClass("message-question-icon message-icon"))
					.append($("<span>" + options[ 'content' ] + "</span>"));

			// 按钮容器
			var messageButtonContainer = $("<div></div>").addClass("message-button-container");
			// 把按钮添加到按钮容器
			for(var i = 0; i < options['btn'].length; i++) {
				var b = options['btn'][i];
				messageButtonContainer.append(createButton(b[ 'text' ], b[ 'callback' ]));
			}
			// 创建dialog
			var alertDialog = $.dialog.create({
				title: '信息',
				width: 250,
				height: 170,
				modal: true,
				showType: options[ 'showType' ]
			});
			// 把alert的组件插入到dialog中，显示dialog
			alertDialog
				.find("div.dialog-content").append(messageContent).append(messageButtonContainer).end()
				.css({"display": "block", "z-index": ++window[ 'zIndex' ]}).appendTo($("body"));
		},
		
		message: function() {
			
			var defaultSettings = {
				title: '信息',
				width: 250,
				height: 170,
				content: '操作成功。',
				time: 0,
				showType: '' // slide|fade
			};
			
		}
	};
	
})(jQuery);
