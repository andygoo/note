var QW = {};

(function() {

	var DateH = {
		/** 
		 * 格式化日期
		 * @method format
		 * @static
		 * @param {Date} d 日期对象
		 * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
		 * @return {string}  返回format后的字符串
		 * @example
		 var d=new Date();
		 alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
		 */
		format: function(d, pattern) {
			pattern = pattern || 'yyyy-MM-dd';
			var y = d.getFullYear().toString(),
				o = {
					M: d.getMonth() + 1, //month
					d: d.getDate(), //day
					h: d.getHours(), //hour
					m: d.getMinutes(), //minute
					s: d.getSeconds() //second
				};
			pattern = pattern.replace(/(y+)/ig, function(a, b) {
				return y.substr(4 - Math.min(4, b.length));
			});
			for (var i in o) {
				pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
					return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
				});
			}
			return pattern;
		}
	};

	QW.DateH = DateH;

}());

function getDatetime(){
    var dt = new Date();
    return (dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g,'$10$2');
}
//getDatetime

function date2str(x,y) {
    var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
}
alert(date2str(new Date(),"yy-M-d h:m:s"));
alert(date2str(new Date(),"yyyy-MM-d h:m:s"));