package com.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.model.*;
/**
 * Servlet implementation class productionServlet
 */
@WebServlet("/productionServlet")
public class ProductionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProductionServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginedName = request.getUserPrincipal().getName();
		boolean UserRoleAdmin = request.isUserInRole("Administrator");
		boolean UserRoleUser = request.isUserInRole("User");
		if(UserRoleAdmin){
			//if current user is administrator then pass to adminMangement servlet
			RequestDispatcher view = request.getRequestDispatcher("/adminManagement?userName="+loginedName);
			view.forward(request,response);
		}
		else if(UserRoleUser){
			RequestDispatcher view = request.getRequestDispatcher("/production.jsp?userName="+loginedName);
			view.forward(request,response);
		}
		
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		
		String loginedName = request.getUserPrincipal().getName();
		//add or remove the items from session and return json+rest
		response.setContentType("text/html;charset=UTF-8");
	    PrintWriter printWriter  = response.getWriter();

	    
	    //ready to clearing the cart
	    if(request.getParameter("ClearingCart")!=null && request.getParameter("ClearingCart").equals("yes")){
	    	request.getServletContext().setAttribute(loginedName, null);
	    	printWriter.write("done");
	    }
	    
	    
		/**
		 * if get paramter addItem and its value is true, then add new production into the cart list
		 */
		if(request.getParameter("ModifiyCart")!=null && request.getParameter("ModifiyCart").equals("add")){
		String getId =request.getParameter("id");
		String getTitle =request.getParameter("title");
		String getImgUrl =request.getParameter("imgUrl");
		String getDescrption =request.getParameter("descrption");
		String getPrice =request.getParameter("price");
		//return the production LinkedhashMap only
		Production production = new Production(getId,getTitle,getImgUrl,getDescrption,getPrice);
		CartAdd cartAdd = new CartAdd(loginedName,request,production);
		printWriter.write(cartAdd.addToCartList());//generate the json and return to js page to process		
	    }
		/**
		 * if the paramter removeItem and its value is true, then remove current item from servletContext() list
		 */
		else if(request.getParameter("ModifiyCart")!=null && request.getParameter("ModifiyCart").equals("remove")){
			String getIdArray =request.getParameter("idlist");
			CartRemove cartRemove = new CartRemove(loginedName,request,getIdArray);
			printWriter.print(cartRemove.getRemovedCart());//remove item from servletContext() and update it
		}
	}

}
