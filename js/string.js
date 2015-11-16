/*
                         `∧ ∧︵   
 ¤╭⌒╮ ╭⌒╮         ミ^r^ミ灬)~
╱◥███◣╭Author: "︶ㄣ边城浪子"
︱田︱田 田|╰E-mail: admin@jiesc.net
╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬

*/

//sort = sort.toggle('ASC', 'DESC');

// instead of conditional logic:
//sort = (sort == 'ASC' ? 'DESC' : 'ASC');

String.prototype.toggle = function(value, other){
    return this == value ? other : value;
};
/*
 * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
 * <pre><code>
var s = '  foo bar  ';
alert('-' + s + '-');         //alerts "- foo bar -"
alert('-' + s.trim() + '-');  //alerts "-foo bar-"
</code></pre>
 * @return {String} The trimmed string
 */
String.prototype.trim = function(){
    var re = /^\s+|\s+$/g;
    return function(){ return this.replace(re, ""); };
}();

// 保留数字
String.prototype.getNum = function(){
    return this.replace(/[^\d]/g,"");
}

// 保留字母
String.prototype.getEn = function(){
    return this.replace(/[^A-Za-z]/g,""); 
}

// 保留中文
String.prototype.getCn = function(){
    return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g,"");
}

// Unicode转化
String.prototype.ascW = function(){
    var str = "";
    for (var i=0; i<this.length; i++) {
        str += "&#" + this.charCodeAt(i) + ";";
    }
    return str;
}

// Unicode加密
String.prototype.toUnicode = function(str) {
    return escape(this).replace(/%/g,"\\").toLowerCase();
}

// Unicode解密
String.prototype.unUnicode = function(str) {
    return unescape(this.replace(/\\/g, "%"));
}

// HTML编码
function htmlEncode (str){
    var div = document.createElement("div");
    var text = document.createTextNode(str);
    div.appendChild(text);
    return div.innerHTML;
}

// HTML解码
function htmlDecode (str){
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.innerHTML;
}

//切割字符串;2008/10/2
function str_cut($str ,$start, $end) {
    var start = $str.lastIndexOf($start)+$start.length;
    var end = $str.lastIndexOf($end);
    content=$str.substring(start,end)
    return content; 
}

// 提取字符串前面的字符；
function getFront(mainStr,searchStr){
    foundOffset = mainStr.indexOf(searchStr);
    if(foundOffset == -1){
        return null;
    }
    return mainStr.substring(0,foundOffset);
}

// 提取字符串后面的字符；
function getEnd(mainStr,searchStr){
    foundOffset = mainStr.indexOf(searchStr);
    if(foundOffset == -1){
        return null;
    }
    return mainStr.substring(foundOffset + searchStr.length,mainStr.length);
}

/*
 * 实体转换
 *
 * var msg="Hi,all&#22909;&#30340;,&#36825;&#20010;javascript&#19981;&#38169;"; 
 * var msg2= foo(msg); 
 * var msg3=foo2(msg2); 
 * alert(msg2); // Hi,all好的,这个Javascript不错 
 * alert(msg3);
 * alert(msg===msg3); // true
 * msg="呵呵，这段字符串中只有《中文字符》会被编码。";
 * alert(msg+"\n"+fooChinese(msg));
 *
 */
function foo(s){ 
    return s.replace(/&#(\d+);/g, function(match,n){return String.fromCharCode(n)});
} 
function foo2(s){
    return s.replace(/[^\x00-\xff]/g,function(x){return "&#"+x.charCodeAt(0)+";"}); 
}
function fooChinese(s){//只编码中文
    return s.replace(/[\u4e00-\u9fa5]/g,function(x){return "&#"+x.charCodeAt(0)+";"}); 
}
