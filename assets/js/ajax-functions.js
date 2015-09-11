/**
 * Comment sign-in and comment form actions: 
 * Uses XMLHttpRequests and the history.api
 */

//check for history api support
function supports_history_api() {
  return !!(window.history && history.pushState);
}

//AlaAuth vars
var ajaxContainer = $('.ajax-container');
var placeholderLoader = $('.placeholder.loader');

//Initiating AlaAuth object to hold form related functions
var AlaAuth = {

	alertMsg: function(msg){ 
		//create and append a simple modal for form success / error msgs.
		$('.commenter-signin').append(
			"<div class='custom-modal'><div class='container'><i class='laurel-small'></i>" + msg + '<p class="note">Press any key or click anywhere to close this</p>' + "</div></div>"
		);
		//vertically center the modal content
		var innerEl = $(".custom-modal .container");
		var innerElHeight = innerEl.outerHeight();
		innerEl.css('margin-top', '-' + innerElHeight/2 + 'px');
		//close the modal: click anywhere to close it, or hit any key
		$(document).on('keyup click touchstart', function(){ //
		    $(".custom-modal").remove();
		});
	},

	loadTemplate: function(state) {
		//show loader

		//hide current template
		ajaxContainer.addClass('none');
		//load new template
	  	$.get(states.site_url + states.tmpl_path + state + states.entry_id + states.segments, function(ret){
			ajaxContainer.replaceWith(ret);
		}, false);
	},

	spinnerInit: function(){
		//initiate spinner
		var spinnerOpts = {
			className: 'js-spinner none'  // CSS class to assign to the element
		};
		var spinnerTarget = document.getElementById('comment-submit-holder');
		var spinner = new Spinner(spinnerOpts).spin(spinnerTarget);
	},

	spinnerStart: function(){
		$('.js-spinner').removeClass('none');
		$('#comment-submit-holder input').addClass('inactive');
	},

	spinnerStop: function(){ 
		$('.js-spinner').addClass('none');
		$('#comment-submit-holder input').removeClass('inactive');
	}

}; //end AlaAuth object
	
$(document).ready(function(){

	//this is a function in form.js that mutually excludes EE server validation and our js custom validation
	EEValidateSync();

	//Initiate spinner
	AlaAuth.spinnerInit();

	//hide placeholder loader
	placeholderLoader.addClass('none');

	//check for history.api support
	if (!supports_history_api()) { return; }
	
	//check that we're on an entry page and the states object exists
	if(typeof states != "undefined") { 
		/**
		* when the document loads and while the user is signed in, 
		* use replaceState to apply a state to the current document, 
		* so event.state is never null, and the user gets to see the comment form
		*/
		if (states.currentstate == 'comment-form') {
			//hide social sign-in btns
			$('#login-buttons').addClass('none');
			//apply a state: replace the current document's state and url
			history.replaceState(
				states.commentform, 
				'on ' + states.commentform, 
				states.site_url + states.segments //no need to add the comment-form url to each entry if logged in
			);
			return false;	
		}

		//history.api nav clickhandler
		$('.history-nav').on('click', function(event){

			event.preventDefault();
			var goToUrl = $(this).attr('id');

			//show placeholder loader
			placeholderLoader.removeClass('none');

			//hide current template and load new template
			AlaAuth.loadTemplate(
				goToUrl
			);
			// Add an entry to the history stack and push the url
			history.pushState(
				goToUrl, 
				'on ' + goToUrl, 
				states.site_url + states.segments + '/' + goToUrl
			);

		});

	} //end typeof states check

});// end document ready

//handle the popstate event
$(window).on('load', function() {
	//check for history.api support
	if (!supports_history_api()) { return; }
	//Using setTimeout is a necessary hack to avoid multiple file loads in webkit
	setTimeout(function() { 
	    $(window).on('popstate', function(e) {
	    	//check if there are modified entries in the history stack
	    	if (e.originalEvent.state === null) { 
				//load the comment sign in form
				AlaAuth.loadTemplate(
					states.commentsignin
				);
			} 
			if (e.originalEvent.state !== null) { 
				//load the right content based on the state
				AlaAuth.loadTemplate(
					e.originalEvent.state
				);
			} 
		});
	}, 0);

}); //end window onload
/*
* Using setTimeout with popstate is a necessary hack 
* because WebKit fires a popstate event on document load, 
* so then we get multiple file loads.
* https://code.google.com/p/chromium/issues/detail?id=63040
* https://bugs.webkit.org/process_bug.cgi
*/





 




  
 





 


	 
