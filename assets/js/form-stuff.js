// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

//var b = document.documentElement;
//b.setAttribute('data-useragent',  navigator.userAgent);
//b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

(function($){

$(document).ready(function (){

	$('form').each(function() {

		$(this).attr('novalidate', 'novalidate');

	});

	$('form').on('submit', function(e) {

		//e.preventDefault();

		errors = 0;

		$(this).find('input[data-isvalid], textarea[data-isvalid]').each(function() {

			if (($(this).attr('data-isvalid') == 'no') || ($(this).attr("required") && ($.trim($(this).val()) == ''))) {

				errors++;

				errorMsg = $(this).attr('data-error');

				if ((errorMsg != '') && ($(this).attr('data-error') != '')) {

					$(this).attr('data-error', '').parent().append('<small class="error-message" role="alert" id="' + $(this).attr('id') + '_error">' + errorMsg + '</span>');

				};

				$(this).parent().addClass('invalid');

			};
		});

		$(this).find('label.invalid input, label.invalid textarea').first().focus();

		if (errors != 0) return false;

	});

	$('*[data-validate="onblur"]').on('blur', function() {

		valType = $(this).attr('data-type');
		value = $(this).val();

		if ($(this).attr("required")) {

			required = true;

		} else {

			required = false;

		};

		//console.log('validating this');

		inputValidation($(this), required, valType, value);

	});

});


})(window.jQuery);

// master validation

var urlFilter = /^((http|https):\/\/)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$/;
var emailFilter = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

function inputValidation(which, requiredState, valType, value) {

	if ((requiredState == true) && (value == "")) { // if empty and required, don't bother running any other checks

		which.attr('data-isvalid', 'no').attr('aria-invalid', 'true');

	} else if (value == "") {

		which.attr('data-isvalid', '').attr('aria-invalid', '').parent().removeClass('invalid');

	} else {

		if (valType == "email") {

			if (emailFilter.test(which.val())) {

				which.attr('data-isvalid', 'yes').attr('aria-invalid', 'false').parent().removeClass('invalid');

			} else if (which.val().length != 0) {

				which.attr('data-isvalid', 'no').attr('aria-invalid', 'true').parent().removeClass("valid");

			};

		} else if (valType == "url") {

			if (urlFilter.test(which.val())) {

				which.attr('data-isvalid', 'yes').attr('aria-invalid', 'false').parent().removeClass('invalid');

			} else if (which.val().length != 0) {

				which.attr('data-isvalid', 'no').attr('aria-invalid', 'true').parent().removeClass("valid");

			};

		} else if (valType == "no-url") {

			if (which.val().indexOf("/") === -1) {

				which.attr('data-isvalid', 'yes').attr('aria-invalid', 'false').parent().removeClass('invalid');

			} else {

				which.attr('data-isvalid', 'no').attr('aria-invalid', 'true').parent().removeClass("valid");

			};

		} else if (valType == "matching") {

			matchWhich = $('#' + which.attr('data-mustmatch'));

			if (matchWhich.val() == which.val()) {

				which.attr('data-isvalid', 'yes').attr('aria-invalid', 'false').parent().removeClass('invalid');

			} else {

				which.attr('data-isvalid', 'no').attr('aria-invalid', 'true').parent().removeClass("valid");

			};

		} else {

			which.attr('data-isvalid', 'yes').attr('aria-invalid', 'false').parent().removeClass('invalid');

		};

	};

};
//for the ajax loaded forms to play nicely with inline EE validation
function EEValidateSync() {
	$('.ajax-container form').on('submit', function() {
		$(this).find(':required').each(function() {
			if ($.trim($(this).val()) != '') {
				$(this).parent().find('.error-message').addClass('none');
			} else 
				if ($.trim($(this).val()) == '') {
					$(this).parent().find('.error-message').removeClass('none');
				}	 
		});
	});
}

 
