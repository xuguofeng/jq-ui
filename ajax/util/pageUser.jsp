<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="user.jsp" %>
<%!
public class PageUser {

	private Integer totalPage;
	private List<User> users;

	public PageUser(Integer totalPage, List<User> users) {
		this.totalPage = totalPage;
		this.users = users;
	}
	
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public Integer getTotalPage() {
		return this.totalPage;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public List<User> getUsers() {
		return this.users;
	}
}
%>