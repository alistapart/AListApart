
// Initiating AlaAuth object to hold form related functions
var AlaAuth = {

	// Create a simple modal for form success / error msgs.
	customModal: function(){
		
		//$("#overlay").remove();
		//$("html").append("<div id='overlay' style='height:"+$(document).height()+"px'></div>");
		
		$(document).on('keyup click', function(e){ //click anywhere to close the modal, or hit any key
		    var container = $(".custom-modal");

		    // if (!container.is(e.target) // if the target of the click isn't the container
		    //     && container.has(e.target).length === 0) // nor a descendant of the container
		    // {
		        container.hide();
		        //$("#overlay").height('0').hide();
		    // }
		});

	}, // end customModal	

	appendModal: function(element, msg){

		AlaAuth.customModal();
		element.append("<div class='custom-modal'>"+msg+"</div>");

	} // end appendModal 

}; //end AlaAuth object

function alert_msg(element, msg){
	AlaAuth.customModal();
	$(".custom-modal").remove();
	element.append("<div class='custom-modal'><div class='container'><i class='laurel-small'></i>"+msg+''+'<p class="note">X Press any key or click anywhere to close this</p>'+"</div></div>");
	var innerEl = $(".custom-modal .container");
	var innerElHeight = innerEl.outerHeight();
	innerEl.css('margin-top', '-'+innerElHeight/2+'px');
}	

//history api functions
var ajaxContainer = $('.ajax-container');

 
function loadTemplate(state) {
	//hide current template
	ajaxContainer.addClass('none');
	//load new template
  	$.get(states.site_url + states.tmpl_path + state + states.entry_id + states.segments, function(ret){
		ajaxContainer.replaceWith(ret);
	}, false);
}  

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

$(document).ready(function(){

	EEValidateSync();

	if(typeof states != "undefined") {

		var numberOfEntries = window.history.length;
		//console.log(numberOfEntries);

		$(window).on("popstate", function(e) {
			// In conjunction with history.pushState, when the user clicks the back/forward buttons a popstate event is triggered
			//after a popstate event has fired load a template
			if (e.originalEvent.state !== null) { //check if there are entries modified in the history stack and get the previous or next one
				loadTemplate(
					e.originalEvent.state
				);
				return false;
			} else if (e.originalEvent.state === null) { // if there are no entries in the history stack go to signin
				loadTemplate(
					states.commentsignin
				);
				return false;
			}
		});

		$('#register-link').on('click', function(event){

			event.preventDefault();
			//hide current template and load new template
			loadTemplate(
				states.register
			);
			// Add an entry to the history stack (modifies the history stack for the same document)
			history.pushState(
				states.register, 
				document.title + states.register, 
				states.site_url + states.segments + '/' + states.register
			);

		});

		$('#forgot-link').on('click', function(event){

			event.preventDefault();
			//hide current template and load new template
			loadTemplate( 
				states.password				
			);
			// Add an entry to the history stack (modifies the history stack for the same document)
			history.pushState(
				states.password, 
				document.title + states.password, 
				states.site_url + states.segments + '/' + states.password
			);

		});

		$('#cancel-registration, #cancel-password-reset').on('click', function(event){

			event.preventDefault();
			//hide current template and load new template
			loadTemplate(
				states.commentsignin
			);
			// Add an entry to the history stack (modifies the history stack for the same document)
			history.pushState(
				states.commentsignin, 
				document.title + states.commentsignin, 
				states.site_url + states.segments + '/' + states.commentsignin
			);

		});	

	} //end typeof states check

});// end document ready

window.onload = function () {
    if (typeof history.pushState === "function") {
		//remember to check for history api support    
    }
}


 




  
 





 


	 