
;( function( $, window, undefined ) {

    'use strict';

    $.CustomRadio = function(options, element ) {
        this.$el = $( element );
        this._init(options);
    };

    $.CustomRadio.defaults = {
        mobileImages : false,
        mobileSize: 640,
        imgsUrl: '../imgs/'
    };

    $.CustomRadio.prototype = {

        _init : function(options) {
             this.options = $.extend({}, $.CustomRadio.defaults, options);
             this._initialView();
             this._initEvents();
        },

        _initialView : function() {
            this.$el.children("input:first-child").prop('checked', true);
            if ($(window).width() < this.options.mobileSize && this.options.mobileImages) {
                $("body").css("background-image", "url('" + this.options.imgsUrl + "filter-1-mobile.jpg')");
            }
            else {
                $("body").css("background-image", "url('" + this.options.imgsUrl + "filter-1.jpg')");
            }
        },

        _initEvents : function() {
            this._slide();
            this._changeImg();
            this._clickOutsideElm();
        },

        _slide : function() {
            this.$el.click( function(e) {
                if( e.target.tagName.toUpperCase() == 'LABEL' ) {
                    $(this).toggleClass("active");
                    if ($(this).hasClass("active")) {
                        var labelHeight = $(this).children("label").outerHeight(true); 
                        $(this).children("input:not(:checked)+label").each(function (i) {
                            $(this).animate({
                                top: (i + 1) * labelHeight,
                                }, 300);
                        });
                    }
                    else {
                        $(this).children("input:not(:checked)+label").each(function (i) {
                            $(this).css({
                                top: 0,
                            });
                        });
                    }
                }
            });
        },

        _changeImg : function() {
            var self = this;
            this.$el.children("input").change(function (){
                var prop = $(this).prop('checked');
                var filterID = event.target.id;
                if (typeof prop !== typeof undefined && prop !== false) {
                    if ($(window).width() < self.options.mobileSize && self.options.mobileImages) {
                        $("body").css("background-image", "url('" + self.options.imgsUrl + filterID + "-mobile.jpg')");
                    }
                    else {
                        $("body").css("background-image", "url('" + self.options.imgsUrl + filterID + ".jpg')");
                    }
                }
            });
        },

        _clickOutsideElm : function() {
            var sel = this.$el;
            $(document).click(function(e) { 
                if(!$(e.target).closest(sel).length) {
                    if(sel.hasClass("active")) {
                        sel.removeClass("active");
                        sel.children("input:not(:checked)+label").each(function (i) {
                            $(this).css({
                                top: 0,
                            });
                        });
                    }
                }        
            })
        }

    }

    $.fn.customradio = function(options) {
        
        this.each(function() {
            $.data( this, 'customradio', new $.CustomRadio(options, this ) );
        });
 
        return this;
    };

} )( jQuery, window );
