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
				console.log(data);
				$('.cartzone').fadeOut(500,function(){
					$(this).empty();
					if(data.cartList.length>0){
					$(this).append("<table><tbody class='additem'></tbody></table>");
					$.each(data.cartList,function(key,value){
						$('.additem').append('<tr class=id_'+key+'>');
						$('.id_'+key).append('<th id='+value.id+' class="text-center cid"><h5><small>'+value.id+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><h5 style="max-width:100px" class="breakword"><small>'+value.title+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><h5><small>$'+value.price+'</small></h5></th>');
						$('.id_'+key).append('<th class="text-center"><div class="row"><div class="large-12 columns"><input name="selectToRemove" id="'+value.id+'" class="selectToRemove" type="checkbox"></div></div></th>');
						$('.additem').append("</tr>");
					});
					$('.additem').append('<tr class="pricetr">');
					$('.pricetr').append('<th class="text-center cid"><h5><small></small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5><small></small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5><small>$'+parseFloat(data.totalPriceInCart).toFixed(2)+'</small></h5></th>');
					$('.pricetr').append('<th class="text-center cid"><h5 style="cursor:point"><small class="removeItems"><a>Remove</a></small></h5></th>');

					$('.additem').append('</tr>');

					
					if($('.checkout').length==0){
					$('#logoutzone').removeClass('end');
					$('#checkzone').append("<div class='large-6 columns text-right'><a class='checkout button alert tiny'>Check Out</a></div>");
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
	

    	
});





