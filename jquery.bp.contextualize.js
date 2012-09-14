/*
 * Contextualize Plugin - Give your links some context
 * @author Ben Plum
 * @version 0.2
 *
 * Copyright © 2012 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
 
(function($) {
	
	// Default Options
	var options = {
		exclude: "",
		prefix: "icon_",
		types: ["pdf", "doc", "xls", "ppt", "swf", "zip", "mp3"]
	};
	
	// Methods
	var methods = {
		
		// Set / Update defaults
		defaults: function(opts) {
			options = jQuery.extend(options, opts);
			return $(this);
		},
		
		// Add some context
		init: function(opts) {
			options = jQuery.extend(options, opts);
			var filter = (options.exclude != "") ? ", " + options.exclude : "";
			
			$(this).not('[context="on"]' + filter).each(function() {
				var $anchor = $(this);
				if ($anchor.attr("href") !== undefined) {
					var classes = "";
					var ext = $anchor.attr("href").substr(-3).toLowerCase();
					if ($.inArray(ext, options.types) > -1) {
						classes += " " + options.prefix + ext;
					}
					if ($anchor.attr("target") == "_blank") {
						classes += " " + options.prefix + "external";
					}
					
					$anchor.addClass(classes).attr("context", "on");
				}
			});
			
			return $(this);
		},
		
		// Remove some context
		remove: function(opts) {
			return $(this).filter('[context="on"]')
						  .removeClass( options.prefix + "external " + options.prefix + options.types.join(" " + options.prefix) )
						  .attr("context", null);
		}
	};
	
	// Define Plugin 
	$.fn.contextualize = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("CONTEXTUALIZE: '" +  method + "' does not exist.");
		}
	};
})(jQuery); 