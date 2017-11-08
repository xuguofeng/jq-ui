(function($) {

	/**
	 * 初始化accordion组件
	 * @param {Object} $accordion
	 */
	function init($accordion) {
		$accordion
			.children("li:even").addClass("accordion-title").end()
			.children("li:odd").addClass("accordion-body")
			.css("display", "none").eq(0)
			.css("display", "list-item");
	}
	
	/**
	 * 绑定事件
	 * @param {Object} $accordion
	 */
	function initEvents($accordion) {
		$accordion.delegate(".accordion-title", "click", function() {
			// 为菜单title添加样式
			$(this).addClass("active").siblings(".accordion-title").removeClass("active");
			// 调用select选中指定菜单
			select($accordion, $(this).attr("accordion-id"));
		});
	}
	
	/**
	 * 选中指定菜单
	 * @param {Object} $accordion
	 * @param {Object} accordionId
	 */
	function select($accordion, accordionId) {
		// 面板动画切换
		$accordion.children("li[accordion-id=" + accordionId + "]").next().slideDown('100').siblings('.accordion-body').slideUp('100');
	}
	
	/**
	 * 判断指定菜单是否选中
	 * @param {Object} $accordion
	 * @param {Object} accordionId
	 */
	function isSelected($accordion, accordionId) {
		// 通过菜单title是否有active样式来判断
		return $accordion.children("li[accordion-id=" + accordionId + "]").hasClass("active");
	}
	
	$.fn.accordion = function(options, param) {
		
		// 保存对象
		var accordion = $(this);
		
		if (typeof options == 'string') {
			switch(options){
				case 'select':
					return select(accordion, param);
				case 'isSelected':
					return isSelected(accordion, param);
			}
		}
		
		options = options || {};

		return this.each(function() {
			// 初始化组件
			init(accordion);
			// 绑定事件
			initEvents(accordion);
		});
	};
})(jQuery);