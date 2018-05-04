<%@page import="net.sf.json.JSONArray"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="util/TreeNode.jsp" %>
<%
	List<TreeNode> nodes = new ArrayList<TreeNode>();

	nodes.add(new TreeNode(1, "菜单", "", "", false, 0));
	nodes.add(new TreeNode(2, "用户管理", "", "folder", false, 0));
	nodes.add(new TreeNode(3, "用户查看", "", "", false, 2));
	nodes.add(new TreeNode(4, "用户添加", "", "", false, 2));
	nodes.add(new TreeNode(5, "权限管理", "", "folder", false, 2));
	nodes.add(new TreeNode(6, "权限查看", "", "", false, 5));
	nodes.add(new TreeNode(7, "权限添加", "", "", false, 5));
	nodes.add(new TreeNode(8, "分配权限", "", "", false, 5));
	nodes.add(new TreeNode(9, "系统管理", "", "folder", true, 0));
	nodes.add(new TreeNode(10, "管理员管理", "", "folder", true, 9));
	nodes.add(new TreeNode(11, "管理员查看", "", "", false, 10));
	nodes.add(new TreeNode(12, "管理员添加", "", "", false, 10));
	nodes.add(new TreeNode(13, "黑名单管理", "", "", false, 9));
	nodes.add(new TreeNode(14, "日志管理", "", "", false, 9));

	String reqId = request.getParameter("id");

	int id = reqId == null || reqId.length() == 0 ? 0 : Integer.parseInt(reqId);

	List<TreeNode> nodes2 = new ArrayList<TreeNode>();

	for(TreeNode n : nodes) {
		if(n.getParentId() == id) {
			nodes2.add(n);
		}
	}

	JSONArray jsonObject = JSONArray.fromObject(nodes2);

	out.print(jsonObject.toString());
%>
