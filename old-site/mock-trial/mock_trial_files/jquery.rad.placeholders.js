;(function($) {

var Placeholders = {
    defaults: {
        selector: "input[type=text], input[type=password], textarea"
    },
	
	init: function(options, elem) {
	    var $form = $(elem),
		    opts = $.extend({}, Placeholders.defaults, options),
		    hasNativeSupport = 'placeholder' in document.createElement('input'),
		    self = this;
		
		this.$form = $form;
		this.options = opts;
		this.hasNativeSupport = hasNativeSupport;
		
		this.refresh();
		
		$form
		    .delegate(opts.selector, "focus", function() {
    		    var $elem = $(this);
    			if ($elem.val() === $elem.attr("placeholder")) {
    				if (!hasNativeSupport) {
    					$elem.val('');
    					if ($elem.hasClass("placeholder-password"))
    					    this.type = "password";
    				}
    				$elem.removeClass("placeholder");
    			}
    		})
		    .delegate(opts.selector, "blur", function() {
    		    var $elem = $(this);
    			if ($elem.val() === '') {
    				if (!hasNativeSupport) {
    					$elem.val($elem.attr("placeholder"));
    					if ($elem.hasClass("placeholder-password"))
    					    this.type = "text";
    				}
    				$elem.addClass("placeholder");
    			}
    		})
		    .submit(function() {
    		    $.each($form.find(opts.selector), function(i, elem) {
    		        var $elem = $(elem);
    		        if ($elem.val() === $elem.attr("placeholder"))
    				    $elem.val('');
    		    });
    		});
	},
	
	refresh: function() {
	    var $form = this.$form,
	        opts = this.options,
	        hasNativeSupport = this.hasNativeSupport;
	    
        $.each($form.find(opts.selector), function(i, elem) {
            var $elem = $(elem),
                ph = $elem.attr("placeholder");
            
            if (!ph || ph === '')
                return;
            
            if ($elem.val() == '') {
                if (!hasNativeSupport) {
                    $elem.val(ph);
                    // we can't use jQuery to change the input type
                    if (elem.type === "password") {
                        if (!$.browser.msie) { // ie does not allow changing the input type
                            elem.type = "text";
                            $elem.addClass("placeholder-password");
                        }
                    }
                }
                $elem.addClass("placeholder");
            }
        });
	}
};

$.rad("placeholders", Placeholders);

})(jQuery);
