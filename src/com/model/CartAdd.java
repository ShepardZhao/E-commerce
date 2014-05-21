package com.model;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;


public class CartAdd extends Cart {

	HttpServletRequest request;
	private LinkedHashMap<String,String> tempProduction = new LinkedHashMap<String,String>();
    
	
	//construct for add the item
    public CartAdd(String userName,  HttpServletRequest request, Production tempProduction ){
    	super(userName,request);
    	//get linkedHash production
    	this.tempProduction = tempProduction.getProductionMap();
    }
    
     
    public String addToCartList(){
    	if(this.checkStatus()){
    		//add new item to list
    		this.addToList();
    		//update jsonCartList
    		this.setJsonCartList(this.CartJsonIncludesTotalprices());

    		return this.CartJsonIncludesTotalprices();
    	}
    	else{
    		//if this is the firt time to add item to the cart list then execute the follwing functions
    		//set current cartlist and total price that convered to json format and saveed as in to request.getservletContext().setAttribute(name, p);
        	this.productionList.add(tempProduction);

    		this.setCart(productionList);	
    		//return the cartlist with json format
    		
    		//set to setJsonCartList 
    		this.setJsonCartList(this.CartJsonIncludesTotalprices());
    		
    		//return 
    		return this.CartJsonIncludesTotalprices(); 
    	}
    }
    
    

   

   /**
    * Checking the empty of carlist
    * @return
    */
    private boolean checkStatus(){
    	if(this.getCartList()!=null){
    		return true;
    	}
    	else{    		
    		return false;
    	}
    }
    
	/**
	 * end
	 */
	
	
    /**
     * get cartlist first and try to add current new production item in it, and of course its total will be included
     */
    private void addToList(){
    	List<LinkedHashMap<String,String>> getcartList = this.getCartList();
    	//add current temp production record into current prodcution list
    	if(!checkRepeartItem()){getcartList.add(this.tempProduction);}   
    	//update servletContext()
    	this.setCart(getcartList);
    	this.productionList.addAll(getcartList);
    	}
    
    
    
    /**
     * check the repeat item
     * @return
     */
    //check repeart items
    private boolean checkRepeartItem(){
    	boolean exeist= false;
    	for(LinkedHashMap<String,String> item: this.getCartList()){
    		
    		if(item.equals(this.tempProduction)){
    			exeist = true;
    		}
    		else{
    			exeist =false;
    		}
    	}
    	
    	return exeist;
    	
    }
    
    /**
     * end
     */
    
}
