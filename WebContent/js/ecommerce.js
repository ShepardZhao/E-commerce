/**
 * Customer JS file for E-Commerce system
 */    

$(document).ready(function(){
	window.cartlist=null;
	//select to remove
	window.removeArray=new Array();
	//initial display, which can be changed after user input 
	searchPhoto("dog");
	$('body').on('click','#clickSubmit',function(){
		
		if($('#searchInput').val()!=''){
			$('#photoItemZone').fadeOut(500,function(){
				$(this).empty().append('<div class="row"><div class="large-12 columns text-center"><img src="img/loading.gif"></div></div>').fadeIn();
				searchPhoto($('#searchInput').val());
			});
				
		}
		
		
	});
	
	var page=1;
	function searchPhoto(getkeyword){
	//flicker starts
	var keyword=getkeyword;
	var pageItem =10; //default peer page
	var key="d869180313dc72f687e47143df66194c";
	var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1&format=json&extras=tags&api_key="+key+"&tags="+keyword+"&per_page="+pageItem+"&page="+page++;
	flickerAjax(url);
	function flickerAjax(url){
		var request = $.ajax({
			  url: url,
			  type: "GET",
			  dataType: 'json'
			});
			 
			request.done(function( data ) {
				$('#photoItemZone').fadeOut(500,function(){$(this).empty();loopPhoto(data.photos.photo);});

			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
	}
    
	
	function loopPhoto(photos){
		$.each(photos,function(key,value){
			var imgUrl = "http://farm"+value.farm+".staticflickr.com/"+value.server+"/"+value.id+"_"+value.secret+"_q.jpg";
			var bigimgUrl = "http://farm"+value.farm+".staticflickr.com/"+value.server+"/"+value.id+"_"+value.secret+"_c.jpg";

			$('#photoItemZone').append('<li><img class="imgUrl" src="'+imgUrl+'" data-options="align:left;is_hover:true" data-dropdown="Id'+value.secret+'"> <div id="Id'+value.secret+'" data-dropdown-content class="f-dropdown medium  content">'+getSpecific(bigimgUrl,value)+'</div><div class="panel"><div class="row"><div class="large-12 columns text-center"><h4 class="breakword"><small>'+value.title+'</small></h4><h5><small>price: $'+getPrice(countOfTages(value.tags))+'</small></h5><a class="tiny button addedToCart">add to chart</a></div></div></div><input type="hidden" class="pid" value="'+value.id+'"><input type="hidden" class="ptitle" value="'+value.title+'"><input type="hidden" class="pid" value="'+value.id+'"><input type="hidden" class="ptags" value="'+value.tags+'"><input type="hidden" class="pPrice" value="'+getPrice(countOfTages(value.tags))+'"></li>');	
		
		
		});
		$(document).foundation();

		
		$('#photoItemZone').fadeIn(500);
	
	}

	}
	
	//get count of tages
	function countOfTages(tags){
		if(tags!=undefined){
		var tagesArray = tags.split(" ");
		return tagesArray.length;
		}
		else{
			return 0;
		}
		}
	
	//get price of photo
	
	function getPrice(countOfTages){
		//define initial price
		var base = 3.00;
		return parseFloat(countOfTages * parseFloat(base).toFixed(2)).toFixed(2);
		
	}

	
	function getSpecific(bigimg,value){
		var returnValue = '';
		returnValue+='<img src='+bigimg+'>';
		returnValue+='<h4><small>ID:'+value.id+'</small></h4>';
		returnValue+='<h4><small>Title:'+value.title+'</small></h4>';
		returnValue+='<h4><small>Description:'+value.tags+'</small></h4>';

		return returnValue;
		
		
	}
	
	
	//added to cart function
	
	$('body').on('click','.addedToCart',function(){
		var parent = $(this).parent().parent().parent().parent();
		var imgUrl = parent.find('.imgUrl').attr('src');
		var id = parent.find('.pid').val();
		var title =  parent.find('.ptitle').val();
		var descrption =  parent.find('.ptags').val();
		var price = parent.find('.pPrice').val();
		var object ={};
		object['ModifiyCart']="add";
		object['id']=id;
		object['title']=title;
		object['imgUrl']=imgUrl;
		object['descrption']=descrption;
		object['price']=price;
		addAndRemoveToCart(object);
		
		
	});
	
	//add and remove the id from the list
	$('body').on('click','.selectToRemove',function(){
		var id  = $(this).attr('id');
		if($(this).is(':checked')){
			window.removeArray.push(id);
		}
		else{
			var i = window.removeArray.indexOf(id);
			if(i != -1) {
				window.removeArray.splice(i, 1);
			}
		}
	});
	

	//remove item
	$('body').on('click','.removeItems',function(){
		var object={};
		var id=window.removeArray;
		object['ModifiyCart']="remove";
		object['idlist']=JSON.stringify(id);
		if(id.length==0){
		$('<div data-alert class="alert-box  alert alertCart">You are not selection any item<a href="#" class="close">&times;</a></div>').insertAfter('table');
		}
		else{
			if($('.alertCart').length>0){
				$('.alertCart').fadeOut(500,function(){
					$(this).remove();
					addAndRemoveToCart(object);
					window.removeArray= new Array;
				});
				
			}
			else{
				addAndRemoveToCart(object);
				window.removeArray= new Array();

			}
			

		}
	});
	
	function addAndRemoveToCart(data){
		var request = $.ajax({
			  url: 'production',
			  type: "POST",
			  data:data,
			  dataType: 'json'
			});
			 
			request.done(function( data ) {
				window.cartlist= data;
				$('.cartzone').fadeOut(500,function(){
					$(this).empty();
					if(data.cartList.length>0){
					$(this).append("<table><tbody class='additem'></tbody></table>");
					$.each(data.cartList,function(key,value){
						$('.additem').append('<tr class=id_'+key+'>');
						$('.id_'+key).append('<th id='+value.id+' class="text-center cid"><h5><small>'+value.id+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><h5 style="max-width:100px" class="breakword"><small>'+value.title+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><h5><small>$'+value.price+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><h5><small>'+value.count+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><div class="row"><div class="large-12 columns"><input name="selectToRemove" id="'+value.id+'" class="selectToRemove" type="checkbox"></div></div></th>');
						$('.additem').append("</tr>");
					});
					$('.additem').append('<tr class="pricetr">');
					$('.pricetr').append('<th class="text-center cid"><h5><small></small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5><small></small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5><small>$'+parseFloat(data.totalPriceInCart).toFixed(2)+'</small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5><small>'+data.totalCount+'</small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5 style="cursor:point"><small class="removeItems"><a>Remove</a></small></h5></th>');

					$('.additem').append('</tr>');

					
					if($('.checkout').length==0){
					$('#logoutzone').removeClass('end');
					$('#checkzone').append("<div class='large-6 columns text-right'><a  class='checkout button alert tiny' data-reveal-id='modal'  data-reveal-ajax='true'>Check Out</a></div>");
					}
					}
					else{
						$('.cartzone').append('<h4><small>Cart is Empty</small></h4>');
						$('.checkout').remove();
					}
		          	   
					$(this).fadeIn();
				});

					
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
	} 
	
	
	
	/**
	 * pass the data to the restful server
	 */
	$('body').on('click','.confirmToCheck',function(){
		if(window.cartlist!='' && $('#address_zone').val()){
			$.getJSON('http://127.0.0.1:8081/E-Commerce-shipping-component/rest/orders/?name='+$('#userName').text()+'&city='+$('#address_zone').val()+'&item='+window.cartlist.cartList.length, function( data ) {
				if(data.status=='address is incorrect'){//address is incorrect
					if($('#error_display').length>0){
						$('#error_display').remove();
					}
					$('.confirmToCheck').remove();
					if($('#addressEmpty').length>0){
						$('#addressEmpty').remove();
					}
					$('<div id="error_display"><div class="row "><div class="large-12 columns"><div data-alert class="alert-box alert">'+data.status+'</div></div></div><div class="row"><div class="large-6 columns"><a class="button secondary tiny text-left" id="discardCart">Discarding order</a></div><div class="large-6 columns text-right"><a class="button tiny confirmToCheck">re-confirm</a></div></div></div>').insertAfter('#inforzone');

				}
				else if(data.status=='address is correct'){//address is correct
					//if address is validation, we should get the costs fee
					$('#modalWarp').fadeOut(500,function(){
						$('.cartzone>table').fadeOut().remove();
						$(this).empty();
						$(this).append('<h4><small>OrderID: '+data.orderID+'</small></h4>');
							$(this).append("<table><tbody class='orderTable'></tbody></table>");
							$.each(window.cartlist.cartList,function(key,value){
								$('.orderTable').append('<tr class="id_order_'+key+'">');
								$('.id_order_'+key).append('<th class="text-center cid"><img src="'+value.imgeUrl+'"></th>');
								$('.id_order_'+key).append('<th class="text-center cid"><h5><small>'+value.id+'</small></h5></th>');
								$('.id_order_'+key).append('<th class="text-center"><h5><small>'+value.title+'</small></h5></th>');
								$('.id_order_'+key).append('<th class="text-center"><h5><small>$'+value.price+'</small></h5></th>');
								$('.id_order_'+key).append('<th class="text-center"><h5><small>$'+value.count+'</small></h5></th>');
								$('.orderTable').append("</tr>");
							});
							$('.orderTable').append('<tr class="orderProductionPrice">');
							$('.orderProductionPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderProductionPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderProductionPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderProductionPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderProductionPrice').append('<th class="text-center cid"><h5><small>Products Cost: $'+parseFloat(window.cartlist.totalPriceInCart).toFixed(2)+'</small></h5></th>');
							$('.orderTable').append('</tr>');
							
							
							$('.orderTable').append('<tr class="orderCostPrice">');
							$('.orderCostPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderCostPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderCostPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderCostPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.orderCostPrice').append('<th class="text-center cid"><h5><small>Shipping Cost: $'+data.shippingFee+'</small></h5></th>');
							$('.orderTable').append('</tr>');
							
							$('.orderTable').append('<tr class="TotalPrice">');
							$('.TotalPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.TotalPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.TotalPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.TotalPrice').append('<th class="text-center cid"><h5><small></small></h5></th>');
							$('.TotalPrice').append('<th class="text-center cid"><h5><small>Total Price: $'+(parseFloat(data.shippingFee)+parseFloat(window.cartlist.totalPriceInCart))+'</small></h5></th>');
							$('.orderTable').append('</tr>');
							$('<div class="row"><div class="large-12 columns text-center"><a id="closeValidedbutton" class="success button tiny">close </a></div></div>').insertAfter('table');
							$(this).fadeIn();
							
							var object={};
							object['orderID'] = data.orderID;
							object['cartList'] = JSON.stringify(window.cartlist.cartList);
							object['name'] = window.cartlist.name;
							object['totalCount']= window.cartlist.totalCount;
							object['totalPriceInCart']= window.cartlist.totalPriceInCart;
							object['city']= data.city;
							object['shippingFee'] = data.shippingFee;
							
							//request to clearing the cartlist because the order has been record in window.cartlist
							requestToClearingCart();
							
							//save to database
						
							requestToSaveOrder(object);
						
						
					});	
					
					
				}
				
				

			});				
		}
		else{
			$('<div class="row" id="addressEmpty"><div class="large-12 columns"><div data-alert class="alert-box alert">The address cannot be empty</div></div>').insertAfter('#inforzone');
		}
		
		
	});
	
	/**
	 * end
	 */
	
	
	/**
	 * rest cart
	 */
	$('body').on('click','#discardCart',function(){
		$('table').fadeOut(500,function(){
			$(this).remove();
			
			requestToClearingCart();
			 $('#modal').foundation('reveal', 'close');//close the modal
	         $('#modalWarp').empty().append('<div class="row" id="inforzone"><div class="large-12 columns "><input type="text" id="address_zone" placeholder="Please input the address"></div></div><div class="row"><div class="large-12 columns text-center"><a class="button tiny confirmToCheck">Confirm</a></div></div>');	//resotre the check out button to primitve status
			
			
		});
		
		
		
	});
	
	/**
	 * end
	 */
	
	
	
	/*
	 * empty carlist if user click discardCart and confrim AJAX call
	 */
	
	function requestToClearingCart(){
		var request = $.ajax({
			  url: 'production',
			  type: "POST",
			  data:{'ClearingCart':'yes'},
			  dataType: 'html'
			});
		request.done(function( data ) {
			if(data=='done'){
				$('.cartzone').append('<h4><small>Cart is Empty</small></h4>');//change the cart status
				$('.checkout').remove();//remove the checkout button
				$('#searchInput').focus();	//now fouces on search bar
					
			}
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
			
	}
	
	
	/**
	 * end
	 */
	
	
	/**
	 * request to save the order to database (AJAX call)
	 */
	function requestToSaveOrder(object){
	
		var request = $.ajax({
			  url: 'usersManagement',
			  type: "POST",
			  data:object,
			  dataType: 'html'
			});
		request.done(function( data ) {
			if(data=='done'){
				
			}
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
	
	}

	/**
	 * 
	 */
	
	
	
	
	
	
	
	/**
	 * click button to close modal
	 */
	
	$('body').on('click','#closeValidedbutton',function(){
		$('#modalWarp').empty().append('<div class="row" id="inforzone"><div class="large-12 columns "><input type="text" id="address_zone" placeholder="Please input the address"></div></div><div class="row"><div class="large-12 columns text-center"><a class="button tiny confirmToCheck">Confirm</a></div></div>');
		 $('#modal').foundation('reveal', 'close');//close the modal
	});
	/**
	 * end
	 */
	
	
	
	
	
	
	/**
	 * click to change the order status
	 */
	$('body').on('click','.changeOrderStatus',function(){
		var getorderstatus = $(this).parent().parent().parent().parent().find('.orderstatus');
		var selectStauts =$(this).parent().parent().parent().find('.selectStatus').val();
		var currentOrderID = $(this).attr('id');
		
		var request = $.ajax({
			  url: 'adminManagement',
			  type: "POST",
			  data:{'selectStauts':selectStauts,'currentOrderID':currentOrderID},
			  dataType: 'html'
			});
		request.done(function( data ) {
			if(data=='done'){
				getorderstatus.fadeOut(500,getorderstatus.text(selectStauts).fadeIn());
			}
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
	});
	
	/**
	 * end
	 */
	
	
	
	/**
	 * click to view detail info in administrator mode
	 */
	
	$('#orderModal').data('reveal-init', {
	    animation: 'fadeAndPop',
	    animation_speed: 250,
	    dismiss_modal_class: 'close-reveal-modal',
	    bg_class: 'reveal-modal-bg',
	    bg : $('.reveal-modal-bg'),
	    css : {
	        open : {
	            'opacity': 0,
	            'visibility': 'visible',
	            'display' : 'block'
	        },
	        close : {
	            'opacity': 1,
	            'visibility': 'hidden',
	            'display': 'none'
	        }
	    }
	});
	
	
	
	
	$('body').on('click','#closeDetail',function(){
		$('#orderModal').foundation('reveal', 'close');

	});
	$('body').on('click','.queryDetailByOrderID',function(){
		
		//initial reveal modal
		$('#orderModal').foundation('reveal', 'open','usersManagement');
		
		var getQueryID = $(this).attr('id');
		
		//ready to AJAX call
		var request = $.ajax({
			  url: 'adminManagement',
			  type: "POST",
			  data:{'queryDetailForOrder':getQueryID},
			  dataType: 'json'
			});
		request.done(function( data ) {
			console.log(data);
			//get json result
			$('#orderModal').empty();

			$('#orderModal').append("<table id='itemDetailTable'><tbody class='orderTable'></tbody></table>");
			$.each(data,function(key,value){
				$('#itemDetailTable').append('<tr class="id_order_'+key+'">');
				$('.id_order_'+key).append('<th class="text-center cid"><img src="'+value.productionImageUrl+'"></th>');
				$('.id_order_'+key).append('<th class="text-center cid"><h5><small>ProductionID: '+value.productionID+'</small></h5></th>');
				$('.id_order_'+key).append('<th class="text-center cid"><h5><small>Title: '+value.productionName+'</small></h5></th>');
				$('.id_order_'+key).append('<th class="text-center"><h5><small>Description: '+value.productionDescription+'</small></h5></th>');
				$('.id_order_'+key).append('<th class="text-center"><h5><small>Price: $'+value.productionPrice+'</small></h5></th>');
				$('.id_order_'+key).append('<th class="text-center"><h5><small>Number: '+value.count+'</small></h5></th>');
				$('#itemDetailTable').append("</tr>");
			});
	
			$('<div class="row"><div class="large-12 columns text-center"><a id="closeDetail" class="success button tiny">close </a></div></div>').insertAfter('#itemDetailTable');

			
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
		
	});
	
	
	
	
	/**
	 * end
	 */
	
	
	
	/**
	 * user to check the order
	 */
	
	$('body').on('click','#orderbutton',function(){
		
		var request = $.ajax({
			  url: 'usersManagement',
			  type: "GET",
			  dataType: 'json'
			});
		request.done(function( data ) {
			//if the data length is longer than 0, then shows records
			if(data.length>0){
				//ready to insert the data to the table
				$('#orderModal').empty().append('<table id="userOrderTable"><thead><tr><th>Order ID</th><th>Order Status</th><th>items number</th><th>Address</th><th>Items fee</th><th>Shipping fee</th><th>Total fee</th><th style="width:200px;text-align: center">Created Time</th><th>User</th><th>Operation</th></tr></thead><tbody></tbody></table>');
				$.each(data,function(key,value){
					
					$('#userOrderTable>tbody').append('<tr class="id_order_'+key+'">');
					$('.id_order_'+key).append('<th><h5><small>'+value.orderID+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.orderStatus+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.countsOfProductions+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.address+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>$'+value.totalProductionsPrice+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>$'+value.toalShippingFee+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>$'+value.totalFee+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.orderTime+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.user_name+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small><a  data-reveal-id="orderDetailModal"  data-reveal-ajax="true" class="usertoViewDetail" id="'+value.orderID+'"> view detail</a></small></h5></th>');
					$('#userOrderTable>tbody').append('<tr>');
	
				});
				$('<div class="row"><div class="large-12 columns text-center"><a id="closeDetail" class="success button tiny">close </a></div></div>').insertAfter('#userOrderTable');

			}
			//else the data length is eaual 0 meaning that there is no record
			else{
				$('#orderModal').empty().append('Sorry, it looks like you do not have the order yet!');
			}
	

			
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		

	});
	
	/**
	 * end
	 */
	
	
	/**
	 * user should be able to click the userViewDetail to see the deatil items' information through another page
	 */
	
	$('body').on('click','.usertoViewDetail',function(){
		var getUserOrderID = $(this).attr('id');
		
		var request = $.ajax({
			  url: 'usersManagement',
			  type: "GET",
			  data:{'userOrderID':getUserOrderID},
			  dataType: 'json'
			});
		request.done(function( data ) {
			//if the data length is longer than 0, then shows records
				//ready to insert the data to the table
				$('#orderDetailModal').empty().append('<table id="userDetailOrderTable"><thead><tr><th>Production Image</th><th>Production ID</th><th>Production Name</th><th>Description</th><th>Items fee</th><th>Number</th></tr></thead><tbody></tbody></table>');
				$.each(data,function(key,value){
					
					$('#userDetailOrderTable>tbody').append('<tr class="id_order_'+key+'">');
					$('.id_order_'+key).append('<th class="text-center cid"><img src="'+value.productionImageUrl+'"></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.productionID+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.productionName+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.productionDescription+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>$'+value.productionPrice+'</small></h5></th>');
					$('.id_order_'+key).append('<th><h5><small>'+value.count+'</small></h5></th>');
					$('#userDetailOrderTable>tbody').append('<tr>');
	
				});
				$('<div class="row"><div class="large-12 columns text-center"><a id="closeDetail" class="success button tiny">close </a></div></div>').insertAfter('#userDetailOrderTable');

			
		});
		
		request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
		
		
		
		
		
		
		
		
		
	});
	
	/**
	 * end
	 */
	
	
	
	
    	
});





