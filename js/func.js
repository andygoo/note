
function format(string) {
	var args = arguments;
	var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
	return String(string).replace(pattern, function(match, index) {
		return args[index];
	});
}

function Template(tpl, data){
	if (data instanceof Array) {
		var str = '';
		for (var i = 0, j = data.length; i < j; i++) {
			str += Template(tpl, data[i]);
		}
		return str;
	}
	return tpl.replace(/{(.*?)}/g, function (all, ns) {
		var ns = ns.replace(/^\s+|\s+$/g,'').split('.'), d = data;
		while(ns.length) {
			d = d[ns.shift()]; 
		}
		return d;
	});
}

// 检查括号是否配对
function isPair(str){
		var key = "<>{}()[]".split("");
		var open = {}, close = {}, relating = {};
		for (var i=0; i<key.length; i++){
				var s = key[i];
				i%2==0	? (open[s]=true) : (close[s]=true) && (relating[s]=key[i-1]);
		}

		str = str.split("");
		var stack = [];
		for (var i=0; i<str.length; i++){
				var s = str[i];
				if (open[s]){
						stack.push(s);
				}else if(close[s]){
						if (stack.length==0||stack.pop()!=relating[s]) return false;
				}
		}
		return stack.length==0;
}

/*
 * 示例：
 *
 * var str1 = "[()]";
 * var str2 = "[(])";
 *
 * alert(isPair(str1));
 * alert(isPair(str2));
 *
 */

function getTime(){
	var now = new Date();
	var h = now.getHours(), 
		m = now.getMinutes(), 
		s = now.getSeconds();
	h = h<10 ? '0'+h : h;
	m = m<10 ? '0'+m : m;
	s = s<10 ? '0'+s : s;
	return h+':'+m+':'+s;
}

//创建表格;2008/10/2
function createTable(m, n){ 
	var str=['<table cellpadding="0" cellspacing="10">\n'];
	for(i=0; i<m; i++){
		str.push('<tr>');
		for(j=0; j<n; j++){
			str.push('<td id="'+i+'_'+j+'"></td>\n');
		}
		str.push('</tr>');
	}
	str.push('</table>');
	return str.join('');
}

function _remove(obj){
	var idx = $( "#drugw tr:first a").index($(obj));
	console.log(idx);
	$('#drugw tr').each(function(){
		$(this).children('td').eq(idx).hide();
	});
}

//全选；2008-9-17；
function checkAll(name) {
	var arr = $N(name);
	var k = arr.length;
	for(var i=0; i<k; i++) {
		arr[i].checked = "ture";
	}
}

//反选；2008-9-17；
function _checkAll(name) {
	var arr = $N(name);
	var k = arr.length;
	for(var i=0; i<k; i++) {
		arr[i].checked = !arr[i].checked;
	}
}

// 取得元素的位置;2008/10/5
function getPosition(obj) {
	var o = $(obj);
	x = o.offsetLeft;
	y = o.offsetTop;
	while(o = o.offsetParent) {
		x += o.offsetLeft;
		y += o.offsetTop;
	}
	return {x:x, y:y};
}

// gets the real scrollpos:
function getscrollpos(){
	var scrtop=0;
	var scrleft=0;
	if (document.documentElement){
		scrtop=document.documentElement.scrollTop;
		scrleft=document.documentElement.scrollLeft;
	} else if (document.body){
		scrtop=document.body.scrollTop;
		scrleft=document.body.scrollLeft;
	} else {
		var derhtml=document.body.parentNode;
		scrtop=derhtml.scrollTop;
		scrleft=derhtml.scrollLeft;
	}
	return	{x:scrleft, y:scrtop};
}

//mouse-positon (with scroll-pos on ie)
var Mouse = {x:0, y:0};
document.onmousemove = function (evt) {
	var e = window.event || evt;
	Mouse.x = e.x || e.pageX || 0;
	Mouse.y = e.y || e.pageY || 0;
	if (Browser.isIE){
	var scrpos = getscrollpos();
		Mouse.x += scrpos.x;
		Mouse.y += scrpos.y;
	}
}

// 取得当前窗口的大小
function getWinSize() {
	var winWidth, winHeight;
	winWidth = document.body.clientWidth;
	winHeight = document.body.clientHeight;
	return {w:winWidth, h:winHeight}
}

// 创建罩遮层
function creatMask(bgcolor, opacity, zIndex){
	var bgcolor = bgcolor || "#000000";
	var opacity = opacity || "0.4";
	var zIndex = zIndex || "999";
	var winSize = getWinSize();
	var w = winSize.w;
	var h = winSize.h;
	var mask_div = document.createElement("DIV");
	mask_div.style.cssText="position:absolute; top:0px; left:0px; width:" + w + "px; height:" + h + "px;"; 
	mask_div.style.opacity = opacity;
	mask_div.style.filter = "alpha(opacity="+100*opacity+")";
	mask_div.style.background = bgcolor;
	mask_div.style.zIndex = zIndex;
	document.body.appendChild(mask_div);
}

//加载CSS文件; 2008/10/4
function loadCss(url){   
	var head = $T("head")[0];   
	link = document.createElement('link');   
	link.setAttribute("href", url);      
	link.setAttribute("rel", "stylesheet");   
	link.setAttribute("type", "text/css");
	head.appendChild(link);
}

//加载js文件; 2009/6/11
function loadJs(url){   
	var head = $T("head")[0]; 
	oScript = document.createElement("script");
	oScript.setAttribute("src", url);
	oScript.setAttribute("type","text/javascript");
	head.appendChild(oScript);
}

//仿QQ抖动窗口;2008/9/17
function jitter(id){ 
	var a=['top','left'],b=0;
	var l = $(id).offsetLeft;
	var t = $(id).offsetTop;
	u=setInterval(
		function(){
			if(b>15){return false;}
			$(id).style[a[(b+1)%2]]=(++b)%4<2?((b%2)?l:t):((b%2)?l+4:t+4);
			if(b>15){clearInterval(u);}
		}
	,32)
}

function type(o) {
	var toS = Object.prototype.toString,
	types = {
		'undefined'         : 'undefined',
		'number'            : 'number',
		'boolean'           : 'boolean',
		'string'            : 'string',
		'[object Function]' : 'function',
		'[object RegExp]'   : 'regexp',
		'[object Array]'    : 'array',
		'[object Date]'     : 'date',
		'[object Error]'    : 'error'
	};

	// Function name can't be can't be typeof or typeOf because Safari barfs on
	// the reserved word use.  Non-IE browsers report the class in the toString
	// e.g. '[object HTMLDivElement]', but IE always returns '[object Object]'

	return  types[typeof o] || types[toS.call(o)] || (o?'object':'null');
};
function __getClass(object){  
	return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
};
