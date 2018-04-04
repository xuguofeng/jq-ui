<%@page import="net.sf.json.JSONObject"%>
<%@page import="java.util.Random"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="util/pageUser.jsp" %>
<%
	List<User> users = new ArrayList<User>();

	Random r = new Random();

	String[] phones = new String[]{"18902120811", "18902120812", "18902120813", "18902120814", "18902120815"};

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
	
	Integer totalPage = users.size() % pageSize == 0 ? users.size() / pageSize : users.size() / pageSize + 1;
	
	PageUser pu = new PageUser(totalPage, us);
	
	JSONObject jsonObject = JSONObject.fromObject(pu);
	
	out.print(jsonObject.toString());
%>