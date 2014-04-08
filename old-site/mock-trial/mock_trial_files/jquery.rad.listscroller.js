;(function($) {

var ListScroller = {
	defaults: {
	    items: null,
	    
		inverse: false,
		cycle: false,
		
		paginateBy: 1,
		paginationList: null,
		
		changePage: function(page, $itemsToHide, $itemsToShow, dir, cycle) {
		    $itemsToHide.hide();
		    $itemsToShow.show();
		}
	},
	
	init: function(options, elem) {
		var self = this;
		
		this.options = $.extend({}, ListScroller.defaults, options);
		
		this.$elem = $(elem);
		this.$items = options.items;
		
		var n, p;
		
		if (this.options.inverse) {
		    n = ".next-button a";
		    p = ".previous-button a";
	    } else {
		    n = ".previous-button a";
		    p = ".next-button a";
	    }
		
		this.$nextButton = $(n, elem).click(function(e) {
			e.preventDefault();
			self.showNext();
		});
    	this.$previousButton = $(p, elem).click(function(e) {
			e.preventDefault();
			self.showPrevious();
		});
		
		var pl = this.options.paginationList;
	    
	    if (pl) {
	        this.$pagination = $(pl);
            // this.$pagination.find("a").click(function(e) {
            //     e.preventDefault();
            //     self.showPage(parseInt($(this).html(), 10) - 1);
            // });
	    }
		
		this.itemsCount = this.$items.length;
		this.pagesCount = Math.ceil(this.$items.length / this.options.paginateBy);
		this.currentPage = 0;
		
        this.$items.hide();
        this.showPage(0);
	},
	
	page: function(index) {
	    if (typeof index == "undefined")
	        return this.currentPage;
	    this.showPage(parseInt(index, 10));
	},
	
	showPage: function(index) {
		var self = this,
		    opts = self.options,
			dir = index > this.currentPage ? -1 : 1;
		
		var itemsToHide = this.$items.slice(
		        this.currentPage * opts.paginateBy,
		        this.currentPage * opts.paginateBy + opts.paginateBy),
		    itemsToShow = this.$items.slice(
		        index * opts.paginateBy,
		        index * opts.paginateBy + opts.paginateBy);
		
		if (index == this.currentPage)
		    dir = 0;
		
		opts.changePage.apply(this, [index, itemsToHide, itemsToShow, dir]);
		
		this.currentPage = index;
		this._updateButtons();
		this._updatePagination();
	},
	
	showNext: function() {
		if (!this.hasNext()) {
    	    if (this.options.cycle)
    	        return this.showPage(this.pagesCount - 1);
			return null;
		}
		return this.showPage(this.currentPage - 1);
	},
	
	showPrevious: function() {
		if (!this.hasPrevious()) {
    	    if (this.options.cycle)
    	        return this.showPage(0);
			return null;
		}
		return this.showPage(this.currentPage + 1);
	},
	
	hasNext: function() {
		return this.currentPage > 0;
	},
	
	hasPrevious: function() {
		return this.currentPage < this.pagesCount - 1;
	},
	
	_updateButtons: function() {
	    if (this.options.cycle)
	        return;
	    
		if (this.hasNext())
			this.$nextButton.parent().removeClass("inactive");
		else
			this.$nextButton.parent().addClass("inactive");
		
		if (this.hasPrevious())
			this.$previousButton.parent().removeClass("inactive");
		else
			this.$previousButton.parent().addClass("inactive");
	},
	
	_updatePagination: function() {
	    if (typeof this.$pagination !== "undefined") {
	        this.$pagination.find("li").removeClass("current");
            this.$pagination.find("#p-" + (this.page() + 1)).addClass("current");
	    }
	}
};

$.rad("listscroller", ListScroller);
	
})(jQuery);
