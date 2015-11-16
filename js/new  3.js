
var Class = {
	create: function () {
		return function () {
			return this.init.apply(this, arguments);
		}
	}
};

var slider = Class.create();
slider.prototype = {
	init: function () {
		//TODO
	}
}
/* init */
new slider();


var slider = function () {
	var init = function () {
		...
		this.pos();
	}
	init.protorype = {
		pos : function () {
			//TODO
		},
		anim : function () {
			//TODO
		}
		auto : function () {
			//TODO
		}
	}
	return init;
}();
/* init */
new slider();


