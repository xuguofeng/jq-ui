<%@page import="java.util.Random"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="util/user.jsp" %>
<%
	List<User> users = new ArrayList<User>();

	Random r = new Random();

	String[] phones = new String[]{ "18902120811", "18902120812", "18902120813", "18902120814", "18902120815" };

	for(int i = 1; i < 300; i++) {
		User user = new User();
		user.setId(i);
		user.setAge(r.nextInt(80) + 1);
		user.setUsername(String.format("%s%04d", "John", i));
		user.setPhone(phones[r.nextInt(phones.length)]);
		user.setEmail(user.getUsername() + "@189.cn");
		user.setDescription("我是" + user.getUsername());
		users.add(user);
	}

	Integer pageNum = Integer.parseInt(request.getParameter("pageNum"));
	Integer pageSize = Integer.parseInt(request.getParameter("pageSize"));
	
	int toIndex = pageNum * pageSize;
	if(toIndex >= users.size())
		toIndex = users.size();

	List<User> us = users.subList((pageNum - 1) * pageSize, toIndex);
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<script type="text/javascript">
		$(function(){
			$("#pagination3").pagination({
				pageNum: <%=pageNum %>,
				total: <%=users.size() % pageSize == 0 ? users.size() / pageSize : users.size() / pageSize + 1 %>,
				click: function(curr, s) {
					$('.tab').tab(
						'addRemoteTab', 
						{
							'title': '分页表格示例', 
							'id': 'tab10', 
							'url': '/jq-ui/ajax/admin_list.jsp?pageNum=' + curr + '&pageSize=' + s
						}
					);
					return <%=users.size() % pageSize == 0 ? users.size() / pageSize : users.size() / pageSize + 1 %>;
				}
			});
		});
	</script>
</head>
<body>
<table cellpadding="0" cellspacing="0" class="list" style="width: 1000px">
	<thead>
		<tr>
			<th style="text-align: center">编号</th>
			<th>用户名</th>
			<th>年龄</th>
			<th style="text-align: center">联系电话</th>
			<th>邮箱</th>
			<th>自我介绍</th>
			<th style="text-align: center">操作</th>
		</tr>
	</thead>
	<tbody>
		<%
			for(User u : us) {
		%>
				<tr>
					<td style="text-align: center"><%=u.getId() %></td>
					<td><%=u.getUsername() %></td>
					<td><%=u.getAge() %></td>
					<td style="text-align: center"><%=u.getPhone() %></td>
					<td><%=u.getEmail() %></td>
					<td><%=u.getDescription() %></td>
					<td style="text-align: center"><a href="#">删除</a> <a href="#">修改</a></td>
				</tr>
		<%	} %>
	</tbody>
</table>
<br />
<div id="pagination3"></div>
</body>
</html>