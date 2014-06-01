package com.model;

import java.util.*;


import javax.servlet.http.HttpServletRequest;


public class CartAdd extends Cart {

	HttpServletRequest request;
	private LinkedHashMap<String,String> tempProduction = new LinkedHashMap<String,String>();
    
	
	//construct for add the item
    public CartAdd(String userName,  HttpServletRequest request, Production tempProduction ){
    	super(userName,request);
    	//get linkedHash production
    	this.tempProduction = tempProduction.getProductionMap();
    }
    
    /**
     * add item to the list
     * @return
     */
    public String addToCartList(){
    	
    	if(this.checkitemInCartListAndIdList()){
    		//add new item or change already existed items in list
    		this.addOrChangeToList();
    		//update jsonCartList
    		return this.CartJsonIncludesTotalprices();
    	}
    	else{
    		
    		//if current record is new
    	
    		//put current item into a produtionlist (a map collection)
        	this.productionList.add(this.tempProduction);

        	//put the production current production into a list, which called that productionList
    		this.setCart(productionList);	
    		
    		//reset the count in productionList
    		this.resetTotalCount(productionList);
    			
    		//return JSON format 
    		return this.CartJsonIncludesTotalprices(); 
    	}
    }
    
    /**
     * end
     */

   

   /**
    * Checking the empty of cartlist
    * @return
    */
    private boolean checkitemInCartListAndIdList(){
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
    private void addOrChangeToList(){
    	//get production list
    	List<LinkedHashMap<String,String>> getcartList = this.getCartList();
    	//if the item already existed in the cartlist then return true and update the count for this record
    	if(checkRepeartItem()){
    		//update the count for that existed record
    		//after update then copy the return values to getcartList;
    		getcartList= this.updateGetcartList(getcartList);
    		//update total count
    		this.resetTotalCount(getcartList);
    	} 
    	//else we directly append current new record to the end of list
    	else{
    		//this getcartList has been defined as above local variable
    		getcartList.add(this.tempProduction);
    		//update total count
    		this.resetTotalCount(getcartList);
    	}
    	//update servletContext()
    	this.setCart(getcartList);
    	//update productionlist
    	this.productionList.addAll(getcartList);
    	}
    
    
    
    /**
     * check the repeat item
     * @return
     */
    //check repeat items
    private boolean checkRepeartItem(){
    	boolean exeist= false;
    	for(LinkedHashMap<String,String> item: this.getCartList()){
    		if(item.get("id").equals(this.tempProduction.get("id"))){
    			exeist = true;
    		}
    	}
    	return exeist;
    }
    
    /**
     * end
     */
    
    
    /**
     * update cartList those production already existed in the list
     */
    private List<LinkedHashMap<String,String>>  updateGetcartList(List<LinkedHashMap<String,String>> getcartList){
    	
    	for(LinkedHashMap<String,String> item: this.getCartList()){
    		if(item.get("id").equals(this.tempProduction.get("id"))){
    			item= this.addCountForExistProductionlist(item);
    		}
    	}
    
    	return getcartList;
    }
    
    /**
     * end
     */
    
    /**
     * added the count for a production record if appended more than once
     */
	private LinkedHashMap<String,String> addCountForExistProductionlist(LinkedHashMap<String,String> getItem){
    	
    	String getCount = getItem.get("count");
    	String newCount =String.valueOf(Integer.parseInt(getCount) +1) ;
    	getItem.put("count", newCount);
    	return getItem;
    }
    
    /**
     * end
     */
    
    
    
    
}
