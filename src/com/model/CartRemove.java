package com.model;

import java.util.*;
import javax.servlet.http.HttpServletRequest;
import org.json.simple.*;

public class CartRemove extends Cart{

	  //construct for remove the item 
	   private JSONArray idList;
		public CartRemove(String userName ,HttpServletRequest request,String idList){
			super(userName,request);
			this.idList= (JSONArray)JSONValue.parse(idList);
		}
		
		

	    //remove the items from chart
	    
	    public String getRemovedCart(){
			List<LinkedHashMap<String,String>> restoredProductionList = this.getCartList();
	    	for(int i=0;i<this.idList.size();i++){
			for(LinkedHashMap<String,String> item: restoredProductionList){
				if(item.get("id").equals(idList.get(i))){
					restoredProductionList.remove(item);
					break;
				}
				
			}
			}
	    	this.productionList.addAll(restoredProductionList);
	    	this.setCart(restoredProductionList);
	    	this.setJsonCartList(this.CartJsonIncludesTotalprices());
	    	return this.CartJsonIncludesTotalprices();
		
		}
	    

}
