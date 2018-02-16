(function($){

	$.fn.slider = function( settings ) {
		
		// 默认配置项
		var defaultSettings = {
			directionNav: true, // 上一个和下一个按钮
			controlNav: true, // 圆点导航按钮
			width: 960,
			height: 450,
			timeInterval: 4000  // 轮播时间间隔，默认4s
		};

		// 合并默认配置和用户配置参数
		settings = $.extend( defaultSettings, settings );

		return this.each(function() {

			var ele = $( this );

			// 初始化轮播图组件元素
			var s = new SliderConfiger( ele, settings );
			s.generate();
			
			// 下一个按钮
			// $('.nextBtn').click(function() { s.next(); });
			ele.find('.nextBtn').click(function() { s.next(); });

			// 上一个按钮
			// $('.prevBtn').click(function() { s.prev(); });
			ele.find('.prevBtn').click(function() { s.prev(); });

			// 鼠标划入圆点
			ele.find(".sliderControlNav li").mouseover(function() {
				var _index = $( this ).index();
				s.changeTo( _index );
			});

			s.setTimer(function() { s.next(); }, settings.timeInterval);

			// 鼠标移入暂停自动播放，移出开始自动播放
			ele.hover(function() {
				ele.find('.directionNav').show();
				s.clearTimer();
			},function() {
				ele.find('.directionNav').hide();
				s.setTimer(function() { s.next(); }, settings.timeInterval);
			});
		});

	};

	function SliderConfiger( element, settings ) {
		this.index = 0;
		this.ele = element;
		this.settings = settings;
		this.globalWidth = 0;
		this.img = this.ele.find("ul").eq(0);
		this.timer = null;
	}

	SliderConfiger.prototype = {
		generate: function() {
			this.globalWidth = parseInt( this.ele.css("width") );
			this.ele.addClass("sliderContainer");
			this.img.addClass("sliderList");

			// 创建圆点导航
			if (this.settings.controlNav) {
				this.ele.append("<ul class='sliderControlNav'></ul>");
				for (var j = 0; j < this.img.find('li').length; j++) { // 创建圆点
					this.ele.find(".sliderControlNav").append('<li></li>');
				}
				this.ele.find(".sliderControlNav li").first().addClass('active'); // 给第一个圆点添加样式
			}
			
			// 创建左右导航
			if (this.settings.directionNav) {
				this.ele.append("<div class='directionNav'><span class='prevBtn'>&lt;</span><span class='nextBtn'>&gt;</span></div>");
			}
			
			var firstimg = this.img.find('li').first().clone(); // 复制第一张图片
			this.img.append(firstimg).width(this.img.find('li').length * (this.img.find('img').width())); // 将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
			this.img.append(firstimg).width(this.img.find('li').length * this.globalWidth);
		},
		setTimer: function(func, time) {
			this.timer = setInterval(func, time);
		},
		clearTimer: function() {
			clearInterval(this.timer);
		},
		next: function() {
			this.index++;
			if (this.index == this.img.find('li').length) {
				this.index = 1; // 这里不是i=0
				this.img.css({ left: 0 }); // 保证无缝轮播，设置left值
			}
			this.img.stop().animate({ left: -this.index * this.globalWidth }, 300);
			// 设置小圆点指示
			if (this.index == this.img.find('li').length - 1) {
				this.ele.find(".sliderControlNav li").eq(0).addClass('active').siblings().removeClass('active');
			} else {
				this.ele.find(".sliderControlNav li").eq(this.index).addClass('active').siblings().removeClass('active');
			}
		},
		prev: function() {
			this.index--;
			if (this.index == -1) {
				this.index = this.img.find('li').length - 2;
				this.img.css({ left: -(this.img.find('li').length - 1) * this.globalWidth });
			}
			this.img.stop().animate({ left: -this.index * this.globalWidth }, 300);
			this.ele.find(".sliderControlNav li").eq(this.index).addClass('active').siblings().removeClass('active');
		},
		changeTo: function(_index) {
			this.index = _index;
			this.img.stop().animate({ left: -_index * this.globalWidth }, 150);
			this.ele.find(".sliderControlNav li").eq(_index).addClass('active').siblings().removeClass('active');
		}
	};
})(jQuery);
