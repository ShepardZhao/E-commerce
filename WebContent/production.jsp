<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Map.*"%>
<%@ page import="org.json.simple.*"%>
   
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  	<link rel="stylesheet" href="css/normalize.css">
  	<link rel="stylesheet" href="css/foundation.min.css">
  	<link rel="stylesheet" href="css/ecommerce.css">
  	
<title>E-Commerce Production </title>

</head>
<body>
    <div class="row">
    <div class="large-12 columns">
 
    <!-- Navigation -->
 
      <div class="row">
        <div class="large-12 columns">
 
          <nav class="top-bar" data-topbar>
            <ul class="title-area">
              <!-- Title Area -->
              <li class="name">
                <h1>
                  <a href="#">
                    E-Commerce System
                  </a>
                </h1>
              </li>
            </ul>
         
            <section class="top-bar-section" >
              <!-- Right Nav Section -->
                	
                  <div class="large-6 columns right" style="margin-top:-3px;">
      				<div class="row collapse">
        				<div class="small-10 columns">
         					 <input type="text" id="searchInput" placeholder="Search photo....">
       					 </div>
        				<div class="small-2 columns">
          				<a href="#" class="button postfix" id="clickSubmit">Search</a>
        				</div>
     				</div>
    			</div>
   
            </section>
          </nav>
          <!-- End Top Bar -->
        </div>
      </div>
 
    <!-- End Navigation -->
 
      <div class="row">
 
  <!-- Side Bar -->
 
        <div class="large-4 small-12 columns">
 

          <div class=" panel">
          	<div class="row"><div class="large-7 columns"><h2 style="color:#000"><small>Hello, <i id="userName"><%=request.getParameter("userName") %></i> </small></h2></div><div class="large-5 columns text-right"><a id="orderbutton" data-reveal-id="orderModal"  data-reveal-ajax="true" class="button secondary tiny" style="top:10px">My order</a></div></div>
            <h3><small>welcome to back store</small></h3>            
          </div>
          <div class="row">
          <div class="large-12 columns">
          	<div class="panel cartzone">
 	
          	   <h4><small>Cart is Empty</small></h4>
                   	
          	</div>
          
          </div>
          
          </div>
 
         
          
          <div class="row" id="checkzone">
       
          
          <div class="large-6 columns end" id="logoutzone">
          <a href="${pageContext.request.contextPath}/logout" class="button tiny">Logout</a>
          </div>
      
          </div>
         
 
        </div>
 
    <!-- End Side Bar -->
 
 
    <!-- Thumbnails -->
 
        <div class="large-8 columns">
 				<!-- photo item -->
 				 				
 				<ul class="small-block-grid-3 medium-block-grid-3 large-block-grid-4" id="photoItemZone">
 				
 				</ul>
     		
         
 
    <!-- End Thumbnails -->
 
 
  
        </div>
      </div>
 
 
   
 
    <!-- End Footer -->
 
    </div>
  </div>
 <div id="modal" class="reveal-modal small" data-reveal><div id="modalWarp"><div class="row" id="inforzone"><div class="large-12 columns "><input type="text" id="address_zone" placeholder="Please input the address"></div></div><div class="row"><div class="large-12 columns text-center"><a class="button tiny confirmToCheck">Confirm</a></div></div></div></div>
 <div id="orderModal" class="reveal-modal large" data-reveal></div>
 <div id="orderDetailModal" class="reveal-modal large" data-reveal></div>
 
   
</body>
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/foundation.min.js"></script>
	<script src="js/ecommerce.js"></script>
</html>