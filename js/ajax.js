
var xmlhttp = null;

function initReq(reqType,url,bool,respHandle){
    try{
        xmlhttp.onreadystatechange=respHandle;
        xmlhttp.open(reqType,url,bool);
        if(reqType.toLowerCase() == "post"){
            xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
            xmlhttp.send(arguments[4]);
        }else{
            xmlhttp.send(null);
        }
    }catch (errv){
        alert(
        "The application cannot contact "+
        "the server at the moment. "+
        "Please try again in a few seconds.\n"+
        "Error detail: "+errv.message);
    }
}

function httpRequest(reqType,url,asynch,respHandle){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else if (window.ActiveXObject){
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        if (! xmlhttp){
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if(xmlhttp){
        if(reqType.toLowerCase() != "post") {
            initReq(reqType,url,asynch,respHandle);
        }else{
            var args = arguments[4];
            if(args != null && args.length > 0){
                initReq(reqType,url,asynch,respHandle,args);
            }
        }
    }else{
        alert("Your browser does not permit the use of all of this application's features!");
    }
}

function formSubmit(form, callback){
	var url = form.action;
	var data = [];
	for( var i=0, j = form.elements.length; i < j; i++ ) {
		if (form.elements[i].name) {
			if (form.elements[i].type == 'radio' || form.elements[i].type == 'checkbox')
				if(form.elements[i].checked != true) 
					continue;
			data.push(form.elements[i].name+'='+form.elements[i].value);
		}
	}
	data = dada.join('&'); //alert(data);
	var callback = callback;
	var respHandle = function() {
		if( xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var resp = xmlhttp.responseText; 
			var resp = eval('('+resp+')');
			if (callback != null) {
				eval(callback+'(form, resp)');
			} else {
				alert(resp);
			}
		}
	}
	httpRequest("POST", url, true, respHandle, data);
	return false;
}

function ajaxClick(t, callback){
	var url = t.href;
	var callback = callback;
	var respHandle = function() {
		if( xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var resp = xmlhttp.responseText; 
			var resp = eval('('+resp+')');
			if (callback != null) {
				eval(callback+'(t, resp)');
			} else {
				alert(resp);
			}
		}
	}
	httpRequest("GET", url, true, respHandle);
	return false;
}

function async_cmd(url, parms) {
	var cache = new Array;	

	var top_key = null;
	var prev_key = null;
	
	var cache_key = url + parms;
	
	var curr_cache_size = 0;
	var MAX_CACHE_SIZE = 5;

	if (cache[cache_key]) {
		response = cache[cache_key].value;

		if (cache_key != prev_key) {
			var curr_key = top_key;

			if (cache_key != top_key) {
				while (cache[curr_key].next != cache_key) {
					curr_key = cache[curr_key].next;
				}
				cache[curr_key].next = cache[cache_key].next;
			} else {
				top_key = cache[top_key].next;
			}
			cache[prev_key].next = cache_key;
			cache[cache_key].next = null;
			prev_key = cache_key;
		}
		return response;
	} else {
		var respHandle = function() {
			if( xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = httpreq.responseText;

				if (curr_cache_size >= MAX_CACHE_SIZE) {
					var oldest = top_key;
					top_key = cache[oldest].next;
					delete cache[oldest];
				} else {
					curr_cache_size++;
				}

				if (top_key == null) {
					top_key = cache_key;
				}
				if (prev_key != null) {
					cache[prev_key].next = cache_key;
				}

				cache[cache_key] = { value:response, next:null };
				prev_key = cache_key;

				return response;
			}
		}
		httpRequest("POST", url, true, respHandle, parms);
	}
}
