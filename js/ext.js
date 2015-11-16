
var extend = function(subClass, superClass){
	var F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	subClass.superClass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.construtor = superClass;
	}
}

Ext = {};

Ext.apply = function(o, c, defaults){
	if(defaults){
		Ext.apply(o, defaults);
	}
	if(o && c && typeof c == 'object'){
		for(var p in c){
			o[p] = c[p];
		}
	}
	return o;
};

(function(){

	var toString = Object.prototype.toString,
		ua = navigator.userAgent.toLowerCase(),
		check = function(r){
			return r.test(ua);
		},
		DOC = document,
	
	Ext.apply(Ext, {
		applyIf : function(o, c){
			if(o){
				for(var p in c){
					if(!Ext.isDefined(o[p])){
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		extend : function(){
			var io = function(o){
				for(var m in o){
					this[m] = o[m];
				}
			};
			var oc = Object.prototype.constructor;

			return function(sb, sp, overrides){
				if(Ext.isObject(sp)){
					overrides = sp;
					sp = sb;
					sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
				}
				var F = function(){},
					sbp,
					spp = sp.prototype;

				F.prototype = spp;
				sbp = sb.prototype = new F();
				sbp.constructor=sb;
				sb.superclass=spp;
				if(spp.constructor == oc){
					spp.constructor=sp;
				}
				sb.override = function(o){
					Ext.override(sb, o);
				};
				sbp.superclass = sbp.supr = (function(){
					return spp;
				});
				sbp.override = io;
				Ext.override(sb, overrides);
				sb.extend = function(o){return Ext.extend(sb, o);};
				return sb;
			};
		}(),
		override : function(origclass, overrides){
			if(overrides){
				var p = origclass.prototype;
				Ext.apply(p, overrides);
				if(Ext.isIE && overrides.hasOwnProperty('toString')){
					p.toString = overrides.toString;
				}
			}
		},
		namespace : function(){
			var o, d;
			Ext.each(arguments, function(v) {
				d = v.split(".");
				o = window[d[0]] = window[d[0]] || {};
				Ext.each(d.slice(1), function(v2){
					o = o[v2] = o[v2] || {};
				});
			});
			return o;
		},
		each: function(array, fn, scope){
			if(Ext.isEmpty(array, true)){
				return;
			}
			if(typeof array.length == "undefined" || Ext.isPrimitive(array)){
				array = [array];
			}
			for(var i = 0, len = array.length; i < len; i++){
				if(fn.call(scope || array[i], array[i], i, array) === false){
					return i;
				};
			}
		},
		toArray : function(){
			return isIE ?
				function(a, i, j, res){
					res = [];
					for(var x = 0, len = a.length; x < len; x++) {
						res.push(a[x]);
					}
					return res.slice(i || 0, j || res.length);
				} :
				function(a, i, j){
					return Array.prototype.slice.call(a, i || 0, j || a.length);
				}
		}(),
		getDom : function(el){
			if(!el || !DOC){
				return null;
			}
			return el.dom ? el.dom : (Ext.isString(el) ? DOC.getElementById(el) : el);
		},
		getBody : function(){
			return Ext.get(DOC.body || DOC.documentElement);
		},
		isEmpty : function(v){
			return v === null || v === undefined || (Ext.isArray(v) && !v.length);
		},
		isArray : function(v){
			return toString.apply(v) === '[object Array]';
		},
		isDate : function(v){
			return toString.apply(v) === '[object Date]';
		},
		isObject : function(v){
			return !!v && Object.prototype.toString.call(v) === '[object Object]';
		},
		isPrimitive : function(v){
			return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
		},
		isFunction : function(v){
			return toString.apply(v) === '[object Function]';
		},
		isNumber : function(v){
			return typeof v === 'number' && isFinite(v);
		},
		isString : function(v){
			return typeof v === 'string';
		},
		isBoolean : function(v){
			return typeof v === 'boolean';
		},
		isElement : function(v) {
			return !!v && v.tagName;
		},
		isDefined : function(v){
			return typeof v !== 'undefined';
		},
	});
	Ext.ns = Ext.namespace;
})();


Ext.ns("Ext.util", "Ext.lib", "Ext.data");


Ext.applyIf(String, {

	format : function(format){
		var args = Ext.toArray(arguments, 1);
		return format.replace(/\{(\d+)\}/g, function(m, i){
			return args[i];
		});
	},

	escape : function(string) {
		return string.replace(/('|\\)/g, "\\$1");
	},

	leftPad : function (val, size, ch) {
		var result = String(val);
		if(!ch) {
			ch = " ";
		}
		while (result.length < size) {
			result = ch + result;
		}
		return result;
	}
});

String.prototype.toggle = function(value, other){
	return this == value ? other : value;
};

String.prototype.trim = function(){
	var re = /^\s+|\s+$/g;
	return function(){ return this.replace(re, ""); };
}();


Ext.apply(Function.prototype, {
	createInterceptor : function(fcn, scope){
		var method = this;
		return !Ext.isFunction(fcn) ?
				this :
				function() {
					var me = this,
						args = arguments;
					fcn.target = me;
					fcn.method = method;
					return (fcn.apply(scope || me || window, args) !== false) ?
							method.apply(me || window, args) :
							null;
				};
	},
	createCallback : function(/*args...*/){
		// make args available, in function below
		var args = arguments,
			method = this;
		return function() {
			return method.apply(window, args);
		};
	},
	createDelegate : function(obj, args, appendArgs){
		var method = this;
		return function() {
			var callArgs = args || arguments;
			if (appendArgs === true){
				callArgs = Array.prototype.slice.call(arguments, 0);
				callArgs = callArgs.concat(args);
			}else if (Ext.isNumber(appendArgs)){
				callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
				var applyArgs = [appendArgs, 0].concat(args); // create method call params
				Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
			}
			return method.apply(obj || window, callArgs);
		};
	},
	defer : function(millis, obj, args, appendArgs){
		var fn = this.createDelegate(obj, args, appendArgs);
		if(millis > 0){
			return setTimeout(fn, millis);
		}
		fn();
		return 0;
	}
});


Ext.applyIf(Array.prototype, {

	indexOf : function(o, from){
		var len = this.length;
		from = from || 0;
		from += (from < 0) ? len : 0;
		for (; from < len; ++from){
			if(this[from] === o){
				return from;
			}
		}
		return -1;
	},

	remove : function(o){
		var index = this.indexOf(o);
		if(index != -1){
			this.splice(index, 1);
		}
		return this;
	}
});

