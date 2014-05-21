<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>  
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>E-Commerce System</title>
  	<link rel="stylesheet" href="css/normalize.css">
  	<link rel="stylesheet" href="css/foundation.min.css">
  	<link rel="stylesheet" href="css/ecommerce.css">
  	

	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

</head>
<body>
<div class="row" id="login">
	<div class="small-4 large-centered small-centered columns">
	
		<div class="row"><div class="large-12 columns text-center"><h3><small class="whiteColor">Please login</small></h3></div></div>
		
		<form name="loginForm" action="j_security_check" method="POST">
		      <div class="row">
		      
		        <div class="small-12 columns ">
		          <input type="text" id="right-label" name="j_username" placeholder="Username">
		        </div>
		     </div>
		     
		     <div class="row">
		      
		        <div class="small-12 columns ">
		          <input type="password" id="right-label" name="j_password" placeholder="Password">
		        </div>
		     </div>
		     		     
		     <%if (request.getParameter("loginError")!=null && request.getParameter("loginError").equalsIgnoreCase("true")){%>
		     <div data-alert class="alert-box alert secondary">Username or password error <a href="#" class="close">&times;</a></div>
		     <% }%>
		   	<div class="row text-center">
			<div class="large-6 columns">
					     <button  type="submit" class="tiny button">Login</button>
			</div>
			<div class="large-6 columns">
					     <button type="reset" class="tiny button">Reset</button>
			</div>
			
		</div>  
		</form>
		
		
	</div>
</div>

</body>
</html>