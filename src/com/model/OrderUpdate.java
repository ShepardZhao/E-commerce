package com.model;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class OrderUpdate extends OrderDB{

	/**
	 * fields
	 */
	private	String requestToChangedOrderID;
	private	String requestToChangedNewStatus;

	/**
	 * end
	 */
	
	
	
	/**
	 * constructor
	 */
	public OrderUpdate(String orderID, String newStatus){
		super();
		this.requestToChangedOrderID = orderID;
		this.requestToChangedNewStatus = newStatus;	
	}
	
	/**
	 * end
	 */
	
	
	
	/**
	 * update order status
	 */
	
	public boolean updateOrderStatus(){
		boolean condition=false;
		try {
			PreparedStatement orderUpdateStatement = this.connect.prepareStatement("UPDATE orderDataSet SET orderStatus=? WHERE orderID=?");
			orderUpdateStatement.setString(1, this.requestToChangedNewStatus);
			orderUpdateStatement.setString(2, this.requestToChangedOrderID);
			orderUpdateStatement.executeUpdate();
			orderUpdateStatement.close();
			this.connect.close();
			condition= true;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return condition;
		
		
	}
	
	
	/**
	 * end
	 */
	
	
	
	
}
