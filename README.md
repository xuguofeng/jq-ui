# [jQuery ui plugins](http://5ijy01.duapp.com/jq-ui/index.html)


## 1. 下载、部署
把项目clone到tomcat的应用目录下面<br />
启动tomcat访问 localhost:8080/jq-ui/ 即可看到页面效果


## 2. tab插件
### 2.1  引入jquery库、tab.js库、tab.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/tab.js"></script>
<link rel="stylesheet" href="css/blue/tab.css"/>
```

### 2.2  页面加载完成后初始化tab插件
```javascript
$(function() {
	$("#tab1").tab();
});
```

### 2.3  页面代码
```html
<div id="tab1"">
	<ul></ul>
	<div></div>
</div>
```

### 2.4  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/tab_demo_2.jpg)



## 3. accordion插件
### 3.1  引入jquery库、accordion.js库、accordion.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/accordion.js"></script>
<link rel="stylesheet" href="css/blue/accordion.css"/>
```

### 3.2  页面加载完成后初始化accordion插件
```javascript
$(function() {
	$("#accordion1").accordion();
});
```

### 3.3  页面代码
```html
<ul id="accordion1">
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

### 3.4  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/accordion_demo_2.jpg)



## 4. pagination插件
### 4.1  引入jquery库、pagination.js库、pagination.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/pagination.js"></script>
<link rel="stylesheet" href="css/blue/pagination.css"/>
```

### 4.2  页面加载完成后初始化pagination插件
```javascript
// 分页插件
$("#pagination").pagination({
	pageNum: 1,
	size: 6,
	total: 11,
	click: function(curr, s) {
		return 11;
	}
});
```

### 4.3  页面代码
```html
<div id="pagination"></div>
```

### 4.4  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/pagination_demo_2.jpg)



## 5. slider插件
### 5.1  引入jquery库、jquery.slider.js库、slider.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/slider/jquery.slider.js"></script>
<link rel="stylesheet" href="js/slider/slider.css"/>
```

### 5.2  页面加载完成后初始化slider插件
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

### 5.3  页面代码
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

### 5.4  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/slider_demo_2.jpg)



## 6. datatable插件
### 6.1  引入jquery库、datatable.js库、datatable.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/datatable.js"></script>
<link rel="stylesheet" href="css/blue/datatable.css"/>
```

### 6.2  页面加载完成后初始化datatable插件
```javascript
$("#first-datatable").datatable({
	width: "1000",
	height: "auto",
	columns: [
		{ field: "id", columnName: "编号", css: { "text-align": "center" } },
		{ field: "username", columnName: "用户名" },
		{ field: "age", columnName: "年龄" },
		{ field: "phone", columnName: "联系电话", css: { "text-align": "center" } },
		{ field: "email", columnName: "邮箱" },
		{ field: "description", columnName: "自我介绍" }
	],
	url: "/jq-ui/ajax/admin_json.jsp",
	pageNum: 1,			// 显示第几页数据，默认1
	pageSize: 15,		// 每页数据数量，默认10
	pagination: true,	// 是否启用分页组件，默认启用
	showCheckbox: true
});
```

### 6.3  页面代码
```html
<button class="default-button" onclick="update();">修 改</button>
<button class="default-button" onclick="del();">删 除</button>
<button class="default-button" onclick="reload();">刷 新</button>
<table id="first-datatable"></table>
```

### 6.4  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/datatable_demo.jpg)



## 7. dialog插件
### 7.1  引入jquery库、dialog.js库、dialog.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/dialog.js"></script>
<link rel="stylesheet" href="css/blue/dialog.css"/>
```

### 7.2  打开一个dialog对话框
```javascript
$.dialog.open({
	id: 'dialog1',
	url: 'ajax/admin_dialog.html',
	width: 600,
	height: 400,
	title: '使用url加载数据',
	modal: true,
	showType: 'slide'
});
```

### 7.3  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/dialog_demo.jpg)



## 8. messager插件
### 8.1  引入jquery库、messager.js库、messager.css样式文件
```html
<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>

<script type="text/javascript" src="js/messager.js"></script>
<link rel="stylesheet" href="css/blue/messager.css"/>
```

### 8.2  打开一个alert提示框
```javascript
$.messager.alert({
	title: '信息',
	content: '请填写执行情况(200字以内)',
	level: 'warning',
	btn: '知道了',
	time: 1000,
	callback: function() {
		// location.reload();
	},
	showType: 'slide'
});
```

### 8.3  效果
![Github](https://github.com/xuguofeng/jq-ui/raw/master/img/demo/messager_demo.jpg)



## 9. 其他插件
[panel插件示例](http://5ijy01.duapp.com/jq-ui/index.html?tab=panel_demo)
<br />
[panel插件手册](http://5ijy01.duapp.com/jq-ui/index.html?tab=panel_doc)
<br />
<br />
[tree插件示例](http://5ijy01.duapp.com/jq-ui/index.html?tab=tree_demo)
<br />
[tree插件手册](http://5ijy01.duapp.com/jq-ui/index.html?tab=tree_doc)
<br />



## 10. Demo项目说明
ajax目录：保存ajax请求响应文件 <br/>
css目录：  保存插件css样式文件 <br/>
demo目录：保存示例html和css样式文件，这个目录下的html不可以直接访问，只能通过首页的手风琴链接查看 <br/>
doc目录：  保存插件API文档，这个目录下的html不可以直接访问，只能通过首页的手风琴链接查看 <br/>
img目录：  保存插件和示例图片 <br/>
js目录：    保存jquery库、插件库 <br/> <br/>

index.html文件是demo项目的入口 <br/>
 <br/> <br/>
我是一个jQuery插件开发的初学者，现在是一边学习一边开发，代码难免有一些不足之处，您在使用插件时还是需要进行详细测试。 <br/>
如果您有需求优化、代码优化、BUG修复上的建议，您可以通过QQ联系我：947805384  <br/>


