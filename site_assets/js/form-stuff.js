// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

//var b = document.documentElement;
//b.setAttribute('data-useragent',  navigator.userAgent);
//b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

(function($){

$(document).ready(function (){

	$('form').on('submit', function(e) {
		
		errors = 0;
		
		$(this).find('input[data-isvalid]').each(function() {
			
			if ($(this).attr('data-isvalid') == 'no') {
				
				errors++;
				
				$(this).parent().addClass('invalid');
				
			};
			
		});
		
		if (errors != 0) return false;
		
	});
	
	$('*[data-validate="onblur"]').on('blur', function() {
		
		valType = $(this).attr('data-type');
		value = $(this).val();
		
		if($(this).attr("required")) {
			
			required = true;
			
		} else {
		
			required = false;
		
		};
		
		console.log('validating this');
		
		inputValidation($(this), required, valType, value);
	
	});

});


})(window.jQuery);

// master validation

var urlFilter = /^((http|https):\/\/)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$/;
var emailFilter = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

function inputValidation(which, requiredState, valType, value) {

	if ((requiredState == true) && (value == "")) { // if empty and required, don't bother running any other checks
		
		which.attr('data-isvalid', 'no');
		
	} else if (value == "") {
		
		which.attr('data-isvalid', '').parent().removeClass('invalid');
		
	} else {
	
		if (valType == "email") {
			
			if (emailFilter.test(which.val())) {
			
				which.attr('data-isvalid', 'yes').parent().removeClass('invalid');
			
			} else if (which.val().length != 0) {
				
				which.attr('data-isvalid', 'no').parent().removeClass("valid");
			
			};
		
		} else if (valType == "no-url") {
		
			if (which.val().indexOf("/") === -1) {
				
				which.attr('data-isvalid', 'yes').parent().removeClass('invalid');
				
			} else {
			
				which.attr('data-isvalid', 'no').parent().removeClass("valid");
			
			};
		
		} else if (valType == "matching") {
		
			matchWhich = $('#' + which.attr('data-mustmatch'));
			
			if (matchWhich.val() == which.val()) {
				
				which.attr('data-isvalid', 'yes').parent().removeClass('invalid');
				
			} else {
				
				which.attr('data-isvalid', 'no').parent().removeClass("valid");
				
			};
		
		} else {
		
			which.attr('data-isvalid', 'yes').parent().removeClass('invalid');
		
		};
	
	};

};
