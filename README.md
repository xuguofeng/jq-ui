jq-ui
#####

jQuery ui plugins
-----------------


#tab插件
###引入jquery库、tab.js库、tab.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js" ><"/script>

<script type="text/javascript" src="js/tab.js" ></script>
<link rel="stylesheet" href="css/tab.css" />
```

###页面加载完成后初始化tab插件
```javascript
$(function() {
	$(".tab").tab();
});
```

###页面代码
```html
<div class="tab"">
	<ul></ul>
	<div></div>
</div>
```

###效果
![Baidu](http://www.baidu.com/img/logo.gif "百度logo")
![Github](http://github.com/用户名/项目名/raw/分支名/图片文件夹/图片名)



#accordion插件
###引入jquery库、accordion.js库、accordion.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js" ><"/script>

<script type="text/javascript" src="js/accordion.js" ></script>
<link rel="stylesheet" href="css/accordion.css" />
```

###页面加载完成后初始化accordion插件
```javascript
$(function() {
	$(".accordion").accordion();
});
```

###页面代码
```html
<ul class="accordion">
	<li accordion-id="menu1" class="active">插件使用</li>
	<li>
		<ul>
			<li><a href="javascript:;">选项卡插件</a></li>
			<li><a href="javascript:;">手风琴插件</a></li>
		</ul>
	</li>
	<li accordion-id="menu2">管理员管理</li>
	<li>
		<ul>
			<li><a href="javascript:;">管理员查看</a></li>
			<li><a href="javascript:;">管理员添加</a></li>
			<li><a href="javascript:;">管理员修改</a></li>
		</ul>
	</li>
	<li accordion-id="menu3">用户管理</li>
	<li>
		<ul>
			<li><a href="javascript:;">用户查看</a></li>
			<li><a href="javascript:;">用户添加</a></li>
			<li><a href="javascript:;">用户修改</a></li>
		</ul>
	</li>
</ul>
```

###效果



#pagination插件
###引入jquery库、pagination.js库、pagination.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js" ><"/script>

<script type="text/javascript" src="js/pagination.js" ></script>
<link rel="stylesheet" href="css/pagination.css" />
```

###页面加载完成后初始化pagination插件
```javascript
// 分页插件
$("#pagination").pagination({
	"size": 6,
	"click": function(curr, s) {
		return 11;
	}
});
$("#pagination").pagination(
	"toPage", {"current": 1, "total": 11}
);
```

###页面代码
```html
<div id="pagination"></div>
```

###效果



#slider插件
###引入jquery库、jquery.slider.js库、slider.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js" ><"/script>

<script type="text/javascript" src="js/slider/jquery.slider.js" ></script>
<link rel="stylesheet" href="js/slider/slider.css" />
```

###页面加载完成后初始化slider插件
```javascript
$("#banner1").slider({
	timeInterval: 2000, // 轮播时间间隔，默认4s
	controlNav: true,   // 圆点导航按钮
	directionNav: true  // 上一个和下一个按钮
});
$("#banner").slider({
	timeInterval: 2000,
	controlNav: true,
	directionNav: true
});
```

###页面代码
```html
<style>
	#banner { width: 640px; height: 247px; margin: 20px auto; }
	#banner1 { width: 960px; height: 450px; margin: 20px auto; }
</style>

<div id="banner">
	<ul>
		<li><a href="#"><img src="images/banner1.jpg" alt="第1张图片"></a></li>
		<li><a href="#"><img src="images/banner2.jpg" alt="第2张图片"></a></li>
		<li><a href="#"><img src="images/banner3.jpg" alt="第3张图片"></a></li>
	</ul>
</div>
<div id="banner1">
	<ul>
		<li><a href="#"><img src="images/1.jpg" alt="第1张图片"></a></li>
		<li><a href="#"><img src="images/2.jpg" alt="第2张图片"></a></li>
		<li><a href="#"><img src="images/3.jpg" alt="第3张图片"></a></li>
		<li><a href="#"><img src="images/4.jpg" alt="第4张图片"></a></li>
	</ul>
</div>
```

###效果



#Demo项目说明
ajax目录：保存ajax请求响应文件 <br/>
css目录：  保存插件css样式文件 <br/>
demo目录：保存示例html和css样式文件，这个目录下的html不可以直接访问，只能通过首页的手风琴链接查看 <br/>
doc目录：  保存插件API文档，这个目录下的html可以单独访问 <br/>
img目录：  保存插件和示例图片 <br/>
js目录：    保存jquery库、插件库 <br/> <br/>

index.html文件是demo项目的入口 <br/>



#说明
我是一个jQuery插件开发的初学者，现在是一边学习一边开发，代码难免有一些不足之处，您在使用插件时还是需要进行详细测试。 <br/>
如果您有需求优化、代码优化、BUG修复上的建议，您可以通过QQ联系我：947805384  <br/>


