package com.model;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;


public class OrderQuery extends OrderDB {
	
	/**
	 * fields
	 */
	private	List<HashMap<String,Object>> list = new ArrayList<HashMap<String,Object>>();
	/**
	 * end
	 */
	
	
	/**
	 * constructor
	 */
	public OrderQuery(){
		super();
	}
	/**
	 * end
	 */
	
	
	
	/**
	 * query order by user name
	 */
	
	public List<HashMap<String,Object>> queryOrderByUserName(String username){
		
		try {
			
			PreparedStatement orderStatement = this.connect.prepareStatement("SELECT orderID, orderTime, orderStatus, countsOfProductions, address, totalProductionsPrice, toalShippingFee, totalFee, user_name FROM orderDataSet WHERE user_name=?");
			orderStatement.setString(1,username);
			this.queryDetail(orderStatement);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
		
		
	}
	/**
	 * end
	 */
	
	
	/**
	 * query all order
	 */
	public List<HashMap<String,Object>> queryOrder(){
		
		try {
			
			PreparedStatement orderStatement = this.connect.prepareStatement("SELECT orderID, orderTime, orderStatus, countsOfProductions, address, totalProductionsPrice, toalShippingFee, totalFee, user_name FROM orderDataSet");
			this.queryDetail(orderStatement);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
		
		
	}

	/**
	 * end
	 */
	
	/**
	 * query all order by user name
	 */
	//Overloading
	public List<HashMap<String,Object>> queryOrder(String orderID){
		try {
			PreparedStatement orderProductionStatement = this.connect.prepareStatement("SELECT production.productionID, production.productionName, production.productionPrice, production.productionDescription, production.productionImageUrl, production.count FROM orderDataSet LEFT JOIN production ON orderDataSet.orderID=production.orderID WHERE orderDataSet.orderID=? ");
			orderProductionStatement.setString(1, orderID);
			this.queryDetail(orderProductionStatement);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
		
	}
	
	/**
	 * end
	 */
	
	
	/**
	 * query function  
	 */
	private void queryDetail(PreparedStatement preparedstatement) throws SQLException{
		ResultSet rs = preparedstatement.executeQuery();
		ResultSetMetaData md = rs.getMetaData();
		int columns = md.getColumnCount();


		while(rs.next()){
			 LinkedHashMap<String,Object> row = new LinkedHashMap<String,Object>(columns);
		     for(int i=1; i<=columns; ++i){           
		      row.put(md.getColumnName(i),rs.getObject(i));
		     }
		      list.add(row);
		}
		preparedstatement.close();
		this.connect.close();
	}
	
	
	/**
	 * end
	 */
	
	
	
	
	
	
	
	
}
