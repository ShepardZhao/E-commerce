/**
 * 
 */
package com.model;
import java.util.*;
/**
 * @author zhaoxun321
 *
 */
 public class Production {
	
	
	/**
	 * fields
	 */
	private String pId;
	private String pTitle;
	private String pImgeUrl;
	private String pDescription;
	private String pPrice;
	private final String pCount="1";
	private LinkedHashMap<String,String> productionMap = new LinkedHashMap<String,String>();
	
	/**
	 * end
	 */
	
	
	
	/**
	 * construct
	 */
	public Production(String pId, String pTitle, String pImgeUrl, String pDescription, String pPrice ){
			this.pId = pId;
			this.pTitle = pTitle;
			this.pImgeUrl = pImgeUrl;
			this.pDescription =pDescription;
			this.pPrice = pPrice;
			this.setProductionMap();
	}
	/**
	 * end
	 */

	
	/**
	 * methods
	 */
	
	//set production in the map
	private void setProductionMap(){
		productionMap.put("id", this.pId);
		productionMap.put("title", this.pTitle);
		productionMap.put("imgeUrl", this.pImgeUrl);
		productionMap.put("description", this.pDescription);
		productionMap.put("price", this.pPrice);
		productionMap.put("count", pCount);

	}
	
	
	//get productionMap 
	
	public LinkedHashMap<String,String> getProductionMap(){
		return this.productionMap;
	}
	
	/**
	 * end
	 */
	
	
 }
 
 
 
 
 
 
 
 
