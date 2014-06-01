package com.model;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public abstract class OrderDB {
	  protected Connection connect = null;
	  private String url = "jdbc:mysql://localhost:3306/ECommerce";
	  private String username = "root";
	  private String password = "4414463";
	  
	  
	  /**
	   * OrderDB constructor
	   */
	  OrderDB(){
		    try {
				Class.forName("com.mysql.jdbc.Driver");
				connect = DriverManager.getConnection(url, username, password);

			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
			    throw new RuntimeException("Cannot find the driver in the classpath!", e);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
			    throw new RuntimeException("Cannot connect the database!", e);
			}
	  }
	  
	  /**
	   * end
	   */
	
	  
	  
	  
	  
	  
	  
	  
}
