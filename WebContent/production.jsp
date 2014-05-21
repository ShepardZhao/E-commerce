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
          	<h2 style="color:#000"><small>Hello, <%=request.getParameter("userName") %> </small></h2>
            <h3><small>welcome to back store</small></h3>            
          </div>
          <div class="row">
          <div class="large-12 columns">
          	<div class="panel cartzone">
          	<% 
				String username = request.getParameter("userName");
          		String accordinglyProductionly = (String) application.getAttribute(username+"json");
         	
          		if(accordinglyProductionly!=null && !accordinglyProductionly.isEmpty()){
          			Object obj=JSONValue.parse(accordinglyProductionly);
              	 	JSONObject getobj=(JSONObject)obj;
          			JSONArray productionListArray=(JSONArray)(getobj.get("cartList"));
          		%>
          		<table>
          			<tbody class='additem'>
          				<% for(int i=0;i<productionListArray.size();i++){
          					JSONObject getProductionlist=(JSONObject)productionListArray.get(i);
          				%>
        					 <tr  class="id_<%=i%>">
         				
          					<% if(getProductionlist.containsKey("id")){%>
          					   <th id=<%=getProductionlist.get("id") %> class="text-center cid"><h5><small><%=getProductionlist.get("id")%></small></h5></th>
          					
          					<% }%>	
          					
          					<% if(getProductionlist.containsKey("title") ){%>
          					   <th class="text-center"><h5 style="max-width:100px" class="breakword"><small><%=getProductionlist.get("title") %></small></h5></th>
          					<% }%>	
          					
          					
          					<% if(getProductionlist.containsKey("price") ){%>
          					   <th class="text-center"><h5><small>$<%=getProductionlist.get("price") %></small></h5></th>
          					<% }%>	
          				          						
          				
          				    <th class="text-center"><div class="row"><div class="large-12 columns"><input name="selectToRemove" class="selectToRemove" type="checkbox"></div></div></th>
          				
         					</tr>          				
          				<%}%>
          				<tr class="pricetr">
          				<th class="text-center cid"><h5><small></small></h5></th>
        				<th class="text-center cid"><h5><small></small></h5></th>
        				<th class="text-center cid"><h5><small>$<%=getobj.get("totalPriceInCart") %></small></h5></th>
        				<th class="text-center cid"><h5 style="cursor:point"><small class="removeItems"><a>Remove</a></small></h5></th>
          				</tr>
          			</tbody>
          		</table>
          	<% }else{%>
          	   <h4><small>Cart is Empty</small></h4>
          	
          	<%} %>
          	</div>
          
          </div>
          
          </div>
 
         
          
          <div class="row" id="checkzone">
          <%if(accordinglyProductionly!=null && !accordinglyProductionly.isEmpty()) {%>
          <div class="large-6 columns" id="logoutzone">
          <a href="${pageContext.request.contextPath}/logout" class="button tiny">Logo Out</a>
          </div>
           <div class="large-6 columns text-right">
			<a class='checkout button alert tiny'>Check Out</a>        
		 </div>
          <%}else{ %>
          
          <div class="large-6 columns end" id="logoutzone">
          <a href="${pageContext.request.contextPath}/logout" class="button tiny">Logo Out</a>
          </div>
          <%} %>
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
    
<div id="s1"></div>
</body>
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/foundation.min.js"></script>
	<script src="js/ecommerce.js"></script>
</html>