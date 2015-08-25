
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

	appendModal: function(elementID, msg){

		AlaAuth.customModal();
		elementID.append("<div class='custom-modal'>"+msg+"</div>");

	} // end appendModal 

}; //end AlaAuth object

function alert_msg(elementID, msg){
	AlaAuth.customModal();
	$(".custom-modal").remove();
	elementID.append("<div class='custom-modal'><div class='container'><i class='laurel-small'></i>"+msg+''+'<p class="note">X Press any key or click anywhere to close this</p>'+"</div></div>");
	var innerEl = $(".custom-modal .container");
	var innerElHeight = innerEl.outerHeight();
	innerEl.css('margin-top', '-'+innerElHeight/2+'px');
}	

//history api functions
var ajaxContainer = $('.ajax-container');

function loadTemplate(statePath, state, stateParams) {
	//hide current template
	hideTemplate();
	//load new template
  	$.get(statePath + state + stateParams, function(ret){
		ajaxContainer.replaceWith(ret);
	});
}  

function hideTemplate() {
	if (ajaxContainer.classList) {
  		ajaxContainer.classList.add('none');
	} else {
		ajaxContainer.className += ' ' + 'none';
	}
}  

document.getElementById(states.register.clickId).addEventListener('click', function(event){

	event.preventDefault();
	//hide current template and load new template
	loadTemplate(states.path, states.register.url, states.entry_id + states.segments);
	// Add item to the history log
	history.pushState(states.register, document.title, states.site_url + states.segments + states.register.url);

}, false);

document.getElementById(states.forgotpassword.clickId).addEventListener('click', function(event){

	event.preventDefault();
	//hide current template and load new template
	loadTemplate(states.path, states.forgotpassword.url, states.entry_id + states.segments);
	// Add item to the history log
	history.pushState(states.forgotpassword, document.title, states.site_url + states.segments + states.forgotpassword.url);

}, false);

//popstate event (associated with the back function)
$(window).on("popstate", function(e) {
	if (e.originalEvent.state !== null) {
		loadTemplate(states.site_url + states.path, states.commentsignin.url, states.entry_id + states.segments);
	}
});

// Store the content so we can revisit it later and reload the page
if (document.location.href == states.site_url + states.segments + states.register.url) {

	loadTemplate(states.site_url + states.path, states.register.url, states.entry_id + states.segments);

} else if (document.location.href == states.site_url + states.segments + states.forgotpassword.url) {

	loadTemplate(states.site_url + states.path, states.forgotpassword.url, states.entry_id + states.segments);

} else if (document.location.href == states.site_url + states.segments + states.commentform.url) {

	loadTemplate(states.site_url + states.path, states.commentform.url, states.entry_id + states.segments);

}



 


	 