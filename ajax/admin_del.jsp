<%@page import="java.util.Arrays"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String[] ids = request.getParameterValues("ids");
	System.out.println(Arrays.toString(ids));
	
	out.print("{ \"retCode\": \"0\" }");
%>