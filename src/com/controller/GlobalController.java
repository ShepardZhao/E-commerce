package com.controller;

import javax.servlet.http.HttpServletRequest;

public class GlobalController {

	
	public static String getURLWithContextPath(HttpServletRequest request) {
		   return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
		}
	
	
	
	
	
}
