(function($, undefined) {

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj) {
		var i, elem, l = this.length;
		for (i = 0; i < l; i++) {
			elem = this[i];
			if (elem === obj) {
				return i;
			}
		}
		return -1;
	};
}

if (!String.prototype.sprintf) {
    String.prototype.sprintf = function() {
    	var str = this.substring(0, this.length),
    		repl = arguments[0];
    	var token, regex, i;
    	
    	// we're given an array
    	//
    	//  >>> t = "%s (%s/%s)";
    	//  >>> t.sprintf(["ampelia", 1, 10]);
    	//  'ampelia 1/10'
    	if ($.isArray(repl)) {
    		for (i = 0; i < repl.length; i++) {
    			str = str.replace(/%s/, repl[i]);
    		}
    		return str;
    	
    	// we're given an object
    	//
    	//  >>> t = "%(first)s (%(second)s/%(third)s)";
    	//  >>> t.sprintf({ first: "ampelia", second: 1, third: 10 });
    	//  'ampelia 1/10'
    	} else {
    		for (token in repl) {
    			regex = new RegExp("%\\(" + token + "\\)s", "g");
    			str = str.replace(regex, repl[token]);
    		}
    		return str;
    	}
    }
}

if (!Object.create) {
    function F() {}
    Object.create = function(o) {
    	F.prototype = o;
    	return new F();
    };
}

$.fixIEAA = function () {
	if ($.browser.msie)
		this.style.removeAttribute('filter');
}

// based on $.widget.bridge
$.rad = function(name, object) {
	$.fn[name] = function(options) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call(arguments, 1),
			returnValue = this;
		
		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length
			? $.extend.apply(null, [true, options].concat(args))
			: options;
		
		// prevent calls to internal methods
		if (isMethodCall && options.charAt(0) === "_") {
			return returnValue;
		}
		
		if (isMethodCall) {
			this.each(function() {
				var instance = $.data(this, name),
					methodValue = instance && $.isFunction(instance[options])
						? instance[options].apply(instance, args)
						: instance;
				if (methodValue !== instance && methodValue !== undefined) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data(this, name);
				if (instance) {
					// instance.option(options || {})._init();
				} else {
					var obj = Object.create(object);
					obj.init(options, this);
					$.data(this, name, obj);
				}
			});
		}

		return returnValue;
	};
};

})(jQuery);
