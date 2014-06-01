package com.model;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;



public class OrderInsert extends OrderDB{
	/**
	 * fields
	 */
	private String orderID;
  	private JSONArray JsonProductionList;
	private String userName;
	private int totalCount;
	private double productionsTotalPrice;
	private String address;
	private double ShippingFee;
	private final String status="processing";

	/**
	 * end
	 */
	
	
	
	/**
	 * constructor
	 */
	public OrderInsert(String getUserName,String getOrderID, JSONArray getOrderProductsList, String getTotalCount,String getProductionsTotalPrice,String getCityName, String getShippingFee){
		super();
		this.orderID = getOrderID;
		this.JsonProductionList =getOrderProductsList;
		this.userName =getUserName;
		this.totalCount = Integer.parseInt(getTotalCount);
		this.productionsTotalPrice = Double.parseDouble(getProductionsTotalPrice);
		this.address = getCityName;
		this.ShippingFee = Double.parseDouble(getShippingFee);	

	}
	
	/**
	 * end
	 */
	
	
	
	
	

	
	/**
	 * Ready to insert the record into the DB
	 */
	public boolean insertToDB(){
		boolean condition =false;
		try {
			//order statement 
			PreparedStatement orderStatement = this.connect.prepareStatement("INSERT INTO orderDataSet (orderID,orderTime,orderStatus,countsOfProductions,address,totalProductionsPrice,toalShippingFee,totalFee,user_name) VALUE (?,?,?,?,?,?,?,?,?)");
			orderStatement.setString(1, this.orderID);
			orderStatement.setString(2, this.getDate());
			orderStatement.setString(3, this.status);
			orderStatement.setInt(4, this.totalCount);
			orderStatement.setString(5, this.address);
			orderStatement.setDouble(6, round(this.productionsTotalPrice,2));
			orderStatement.setDouble(7, round(this.ShippingFee,2));
			orderStatement.setDouble(8, round(this.ShippingFee+this.productionsTotalPrice,2));
			orderStatement.setString(9, this.userName);
			orderStatement.executeUpdate();
			orderStatement.close();
			
			//end
			
			
			
			//detail statement -loop production and its information and insert into the database
			
			for(int index=0;index<this.JsonProductionList.size();index++){
				//get JSONObject formation from each record
				 JSONObject getSingleItem = (JSONObject) this.JsonProductionList.get(index);
				 //prepare insert statement  
				 PreparedStatement orderProductionDetail = this.connect.prepareStatement("INSERT INTO production (productionID,productionName,productionPrice,productionDescription,productionImageUrl,count,orderID) VALUE (?,?,?,?,?,?,?)");
				 orderProductionDetail.setString(1, getSingleItem.get("id").toString());
				 orderProductionDetail.setString(2, getSingleItem.get("title").toString());
				 orderProductionDetail.setDouble(3, round(Double.parseDouble(getSingleItem.get("price").toString()),2));
				 orderProductionDetail.setString(4, getSingleItem.get("description").toString());
				 orderProductionDetail.setString(5, getSingleItem.get("imgeUrl").toString());
				 orderProductionDetail.setInt(6, Integer.parseInt(getSingleItem.get("count").toString()));
				 orderProductionDetail.setString(7, this.orderID);
				 orderProductionDetail.executeUpdate();
				 orderProductionDetail.close();
		
			}
			
			//close the connector
			this.connect.close();
			condition=true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			condition= false;
			e.printStackTrace();
		}
		return condition;
	}
	
	/**
	 * end
	 */
	
	/**
	 * get current time
	 */
	private String getDate(){
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/YYYY HH:mm:ss");
		Date date = new Date();		
		String getdate = dateFormat.format(date);
		return getdate;
	}
	
	/**
	 * end
	 */
	
	
	/**
	 * convert double to 2 decimal
	 */
	public double round(double value, int places) {
	    if (places < 0) throw new IllegalArgumentException();

	    long factor = (long) Math.pow(10, places);
	    value = value * factor;
	    long tmp = Math.round(value);
	    return (double) tmp / factor;
	}
	/**
	 * end
	 */
	
}
