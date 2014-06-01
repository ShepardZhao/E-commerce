/**
 * 
 */
package com.model;
import java.text.DecimalFormat;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;

public abstract class Cart {
	String name;
	HttpServletRequest request;
	List<LinkedHashMap<String,String>> productionList = new ArrayList<LinkedHashMap<String,String>>();
	int count=0;//the count of productions
	protected Cart(String name, HttpServletRequest request) {
		// TODO Auto-generated constructor stub
		this.request = request;
		this.name = name;
	}
	
	//first time initial if getServletContext() is null 
	protected void setCart(List<LinkedHashMap<String,String>> CartList){
		//the below application session should store the json data format
		request.getServletContext().setAttribute(name, CartList);
	}
	

	
	//get jsonCartList
	@SuppressWarnings("unchecked")
	protected List<LinkedHashMap<String,String>> getCartList(){
		List<LinkedHashMap<String,String>> getCartlistJsonString =(List<LinkedHashMap<String,String>>)request.getServletContext().getAttribute(name);
		if(getCartlistJsonString==null){
			return null;
		}
		else{
			return getCartlistJsonString;
		}
		
	}
	
	

	protected void setJsonCartList(JSONObject obj){
		request.getServletContext().setAttribute(name+"json", obj);

	}

	
	
	/**
	   * return the json cartlist
	   * @return
	   */
	  //return final json
	  @SuppressWarnings("unchecked")
		public String CartJsonIncludesTotalprices(){
	  	JSONObject obj = new JSONObject();
	  	obj.put("name", this.name);
	  	obj.put("cartList", productionList);
	  	obj.put("totalCount",count);
	  	obj.put("totalPriceInCart",this.getTotalPriceInCart());
	  	
	  	//update the global servlet session
	  	this.setJsonCartList(obj);
	  	return obj.toJSONString();
	  }
	  
	  
	  /**
	   * end
	   */
    
    /**
     * return total price first (when the cart list is empty)
     * @return
     */
    
    //total price in cart
	protected String getTotalPriceInCart(){
        DecimalFormat f = new DecimalFormat("##.00");  // this will helps you to always keeps in two decimal places
		double totalprice=0.00;
		for (int index=0;index<this.getCartList().size();index++){
		if(this.getCartList().get(index).containsKey("price") && this.getCartList().get(index).containsKey("count")){	
			
			totalprice+=Double.parseDouble(this.getCartList().get(index).get("price")) * Integer.parseInt(this.getCartList().get(index).get("count"));				
		}
		}
		return  f.format(totalprice);
	
    }

	
	
	
	/**
     * reset the count of productions in a production List
     */
    protected void resetTotalCount(List<LinkedHashMap<String,String>> productionList ){
    	//get current production list
    	for(LinkedHashMap<String,String> item: productionList){
        	//get the single count in a production list
    		int getTempCount = Integer.parseInt(item.get("count"));
    		//get current all count in the list
    		this.count=getTempCount+this.count;
    	}
    	
    	
    } 	
    
    /**
     * end
     */
	
	
	
	
}
