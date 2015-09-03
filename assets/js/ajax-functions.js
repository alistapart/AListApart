/*
* Comment sign-in and comment form actions: 
* Uses XMLHttpRequests and the history.api
*/
//check for history api support
function supports_history_api() {
  return !!(window.history && history.pushState);
}

//Initiating AlaAuth object to hold form related functions
var AlaAuth = {

	alertMsg: function(msg){ 
		// create and append a simple modal for form success / error msgs.
		$('.commenter-signin').append(
			"<div class='custom-modal'><div class='container'><i class='laurel-small'></i>" + msg + '<p class="note">X Press any key or click anywhere to close this</p>' + "</div></div>"
		);
		//vertically center the modal content
		var innerEl = $(".custom-modal .container");
		var innerElHeight = innerEl.outerHeight();
		innerEl.css('margin-top', '-'+innerElHeight/2+'px');
		//close the modal: click anywhere to close it, or hit any key
		$(document).on('keyup click', function(){ //
		    // if (!container.is(e.target) // if the target of the click isn't the container
		    //     && container.has(e.target).length === 0) // nor a descendant of the container
		    // {
		        $(".custom-modal").remove();
		    // }
		});
	},

	loadTemplate: function(state) {
		//hide current template
		ajaxContainer.addClass('none');
		//load new template
	  	$.get(states.site_url + states.tmpl_path + state + states.entry_id + states.segments, function(ret){
			ajaxContainer.replaceWith(ret);
		}, false);
	}

}; //end AlaAuth object

//AlaAuth vars
var ajaxContainer = $('.ajax-container');
	
$(document).ready(function(){

	//log window.history
	var numberOfEntries = window.history.length;
	console.log(numberOfEntries + ' ' + window.history.state);

	//this is a function in form.js that mutually excludes EE server validation and js validation
	EEValidateSync();

	//get the form x + y coordinates
	// getFormPosition();

	//check for history.api support
	if (!supports_history_api()) { return; }
	
	//check that we're on an entry page and the states object exists
	if(typeof states != "undefined") { 

		//when the an entry page loads, use replaceState to apply a state to the current document, so event.state is never null
		if (states.currentstate == 'commentsignin-index') {
			//apply a state: replace the current document's state and url
			history.replaceState(
				states.commentsignin, 
				'on ' + states.commentsignin, 
				states.site_url + states.segments //no need to add the comment-sign-in url to each entry if logged out
			);
		}
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

			var goToUrl = $(this).attr('id');

			event.preventDefault();
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

	//console.log(formOffsetTop, formOffsetLeft);

	//initiate spinner : this needs a cleanup
	var opts = {
		lines: 12             // The number of lines to draw
	  , length: 7             // The length of each line
	  , width: 3              // The line thickness
	  , radius: 10            // The radius of the inner circle
	  , scale: 0.75            // Scales overall size of the spinner
	  , corners: 1            // Roundness (0..1)
	  , color: '#333'         // #rgb or #rrggbb
	  , opacity: 1/4          // Opacity of the lines
	  , rotate: 0             // Rotation offset
	  , direction: 1          // 1: clockwise, -1: counterclockwise
	  , speed: 1              // Rounds per second
	  , trail: 100            // Afterglow percentage
	  , fps: 20               // Frames per second when using setTimeout()
	  , zIndex: 2e9           // Use a high z-index by default
	  , className: 'js-spinner none'  // CSS class to assign to the element
	  , top: '50%'            // center vertically
	  , left: '100%'           // center horizontally
	  , shadow: false         // Whether to render a shadow
	  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute'  // Element positioning
	};
	var target = document.getElementById('comment-submit-holder');
	var spinner = new Spinner(opts).spin(target);
	//animate submit button

	spinnerStart = function(){ 
		$('.js-spinner').removeClass('none');
	}
	spinnerStop = function(){ 
		$('.js-spinner').addClass('none');
	}

});// end document ready

//handle the popstate event
$(window).on('load', function() {
	//check for history.api support
	if (!supports_history_api()) { return; }
	//Using setTimeout is a necessary hack to avoid multiple file loads in webkit
	setTimeout(function() { 
	    $(window).on('popstate', function(e) {
	    	//check if there are modified entries in the history stack
			if (e.originalEvent.state !== null) { 
				//console.log('state(!== null): ' + e.originalEvent.state);
				//load the right content
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




 




  
 





 


	 