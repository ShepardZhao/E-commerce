package com.controller;

import java.io.IOException;
import java.util.*;
import java.io.PrintWriter;

import org.json.simple.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.OrderInsert;
import com.model.OrderQuery;

/**
 * Servlet implementation class UserManagementServlet
 */
@WebServlet(name = "UsersManagementServlet", urlPatterns = { "/UsersManagementServlet" })
public class UsersManagementServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UsersManagementServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//query the order by user name
		response.setContentType("text/html;charset=UTF-8");
	    PrintWriter printWriter  = response.getWriter();
		OrderQuery orderQuery = new OrderQuery();

	    //given the condition to mark current progress
	    //GET method in here has two functions, one is for query current users' order only without detail -- mark 1
	    //another function is querying detail productions in a specific order according to order ID. --- mark 2
	    if(request.getParameter("userOrderID")!=null){
		    //mark 1   
	    	
	    	
	    	//return the JSON 
	    	printWriter.write(JSONValue.toJSONString(orderQuery.queryOrder(request.getParameter("userOrderID"))));
	    	
	    }
	    
	    
	    //here the condition is, if there is not parameter called "userOrderID" then current request will be considered that mark 2   
	    else{
		String username = request.getUserPrincipal().getName();
		//query the record via database
		
		List<HashMap<String,Object>> result = orderQuery.queryOrderByUserName(username);
		
		//convert the collection to a JSON string
		String getString = JSONValue.toJSONString(result);
		
	    printWriter.write(getString);
	    }
	
		

	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
	    PrintWriter printWriter  = response.getWriter();
		// TODO Auto-generated method stub
		//Received the string that contains all validated productions, 
		String getOrderID = request.getParameter("orderID");
		String getOrderProductsList = request.getParameter("cartList");
		String getUserName = request.getParameter("name");
		String getTotalCount = request.getParameter("totalCount");
		String getProductionsTotalPrice = request.getParameter("totalPriceInCart");
		String getCityName = request.getParameter("city");
		String getShippingFee = request.getParameter("shippingFee");
		//end
		
		//convert JSON string to jsonObejct
		Object obj=JSONValue.parse(getOrderProductsList);
		JSONArray array=(JSONArray)obj;

		//end
		
		
		//ready to insert order into the database;
		
		OrderInsert orderInsert =new OrderInsert(getUserName,getOrderID,array,getTotalCount,getProductionsTotalPrice,getCityName,getShippingFee);
		if(orderInsert.insertToDB()){
			printWriter.write("done");
		}
		

		
		
	}

}
