<%@page import="java.util.Map"%>
<%@page import="java.util.Arrays"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%

	String id = "0";
	String table = request.getParameter("table");

	String t = request.getParameter("t");

	if("1".equals(t)) {
		Map<String, String[]> m = request.getParameterMap();
		
		out.print("{ \"retCode\": \"0\" }");
		
		return;
	} else {
		id = request.getParameter("id");
		System.out.println(id);
	}
%>
<style>
	#admin-update-table td {
		padding: 0 10px;
		font-size: 14px;
		text-align: right;
	}
</style>
<script type="text/javascript">
	function updateAdmin(id) {
		$.ajax({
			type: "post",
			dataType: "json",
			data: $("#admin-update-form").serialize(),
			url: "/jq-ui/ajax/admin_update.jsp",
			success: function(data) {
				if(data["retCode"] == '0') {
					alert("修改成功");
					$('.tab').tab('removeTab', "admin_update");
					$('.tab').tab('selectTab', "tab11");
					$("#" + id).datatable("reload");
				}
			}
		});
	}
</script>
<form id="admin-update-form">
	<input type="hidden" name="t" value="1" />
	<table id="admin-update-table">
		<tr>
			<td>编号:</td>
			<td><input name="" value="<%=id %>" readonly /></td>
		</tr>
		<tr>
			<td>用户名:</td>
			<td><input name="" value="" /></td>
		</tr>
		<tr>
			<td>年龄:</td>
			<td><input name="" value="" /></td>
		</tr>
		<tr>
			<td>联系电话:</td>
			<td><input name="" value="" /></td>
		</tr>
		<tr>
			<td>邮箱:</td>
			<td><input name="" value="" /></td>
		</tr>
		<tr>
			<td>自我介绍:</td>
			<td><input name="" value="" /></td>
		</tr>
		<tr>
			<td><input type="button" value=" 修 改 " onclick="updateAdmin('<%=table %>');" /></td>
			<td></td>
		</tr>
	</table>
</form>
