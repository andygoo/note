/*
 *						 `∧ ∧︵	 
 * ¤╭⌒╮ ╭⌒╮		 ミ^r^ミ灬)~
 * ╱◥███◣╭Author: "︶ㄣ边城浪子"
 * ︱田︱田 田|╰E-mail: hackoo7@qq.com
 * ╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬
 */

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
};

var BindAsEventListener = function(object, fun) {
	return function(event) {
		return fun.call(object, (event || window.event));
	}
};

var Try = {
	these: function() {
		var returnValue;
		for (var i = 0, length = arguments.length; i < length; i++) {
			var lambda = arguments[i];
			try {
				returnValue = lambda();
				break;
			} catch (e) { }
		}
		return returnValue;
	}
};

var Ajax = {
	getTransport: function() {
		return Try.these(
			function() {return new XMLHttpRequest()},
			function() {return new ActiveXObject('Msxml2.XMLHTTP')},
			function() {return new ActiveXObject('Microsoft.XMLHTTP')}
		) || false;
	},
	activeRequestCount: 0
};

function $(id) {
	return document.getElementById(id);
}

function show(id) {
	$(id).style.display = "block";
}

function hide(id){
	$(id).style.display = "none";
}

function showOrHide(id) {
	($(id).style.display == "none") ? show(id) : hide(id);
}

function $N(name) {
	return document.getElementsByName(name);
}

function $T(tagName) {
	return document.getElementsByTagName(tagName);
}

function $C(className, parentElement){
	var elems = ($(parentElement)||document.body).getElementsByTagName("*");
	var result = [];
	for (i = 0; j = elems[i]; i++){
		if ((" "+j.className+" ").indexOf(" "+className+" ") != -1){
			result.push(j);
		}
	}
	return result;
}

function $D(str) {
	return decodeURIComponent(str);
}

function $E(str) {
	return encodeURIComponent(str);
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof(window.onload) != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function getXmlDom() {
	var xmlDoc;
	if (Browser.isIE) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	} else if (Browser.isMoz) {
		xmlDoc = document.implementation.createDocument("","",null);
	}
	xmlDoc.async = "false";
	return xmlDoc; 
}

var _dom = { 
	hasClass: function(el, className) {
		return className && (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
	},
	addClass: function(el, className) {
		if (el.className === '') {
			el.className = className;
		}else if (el.className !== '' && !this.hasClass(el, className)) {
			el.className += ' ' + className;
		}
	},
	removeClass: function(el, className) {
		if (this.hasClass(el, className)) {
			el.className = (' ' + el.className + ' ').replace(' ' + className + ' ', ' ').replace(/^ | $/g,'');
		}
	}
}
/*
var dom = {};
dom.hasClass = function (el, cls) {
    return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};
dom.addClass = function (el, cls) {
    if (!this.hasClass(el,cls)) el.className += " "+cls;
    return el;
};
dom.removeClass = function (el, cls) {
    if (this.hasClass(el,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
    return el;
};*/

function GetQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}