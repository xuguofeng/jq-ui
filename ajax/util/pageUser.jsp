<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="user.jsp" %>
<%!
public class PageUser {

	private Integer totalPage;
	private List<User> rows;

	public PageUser(Integer totalPage, List<User> rows) {
		this.totalPage = totalPage;
		this.rows = rows;
	}
	
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public Integer getTotalPage() {
		return this.totalPage;
	}
	public void setRows(List<User> rows) {
		this.rows = rows;
	}
	public List<User> getRows() {
		return this.rows;
	}
}
%>