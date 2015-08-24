
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

 


	 