package com.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.*;
import com.model.OrderQuery;
import com.model.OrderUpdate;

/**
 * Servlet implementation class AdminManagementServlet
 */
@WebServlet("/AdminManagementServlet")
public class AdminManagementServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminManagementServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//get user name
		//query all users order 
		OrderQuery orderQuery = new OrderQuery();
		request.setAttribute("queryOrderResult", orderQuery.queryOrder());
		RequestDispatcher view = request.getRequestDispatcher("/adminManagement.jsp");
		view.forward(request,response);	
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//update the order status
		response.setContentType("text/html;charset=UTF-8");
	    PrintWriter printWriter  = response.getWriter();
		//get parameters
		String getNewStatus = request.getParameter("selectStauts");
		String getOrderID = request.getParameter("currentOrderID");
		
		//end
		
		if(getNewStatus!=null && getOrderID!=null){
		//update the order status 
		
		OrderUpdate orderUpdate = new OrderUpdate(getOrderID,getNewStatus);
		if(orderUpdate.updateOrderStatus()){
			printWriter.write("done");
		}
		}
		
		
		//query detail for a order
		String getQueryDetailForOrderID = request.getParameter("queryDetailForOrder");
		if(getQueryDetailForOrderID!=null){
			//using OrderQuery
			
			OrderQuery orderQuery = new OrderQuery();
			//return JSON text
			printWriter.write(JSONValue.toJSONString(orderQuery.queryOrder(getQueryDetailForOrderID)));
			
			
		}
		
		
	}

}
