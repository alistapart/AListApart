// Initiating AlaAuth object to hold form related functions
var AlaAuth = {

	// Create a simple modal for form success / error msgs.
	customModal: function(){
		
		$("#overlay").remove();
		$("html").append("<div id='overlay' style='height:"+$(document).height()+"px'></div>");
		
		$(document).on('keyup click', function(e){ //click anywhere to close the modal, or hit any key
		    var container = $(".custom-modal");
		    if (!container.is(e.target) // if the target of the click isn't the container
		        && container.has(e.target).length === 0) // nor a descendant of the container
		    {
		        container.hide();
		        $("#overlay").height('0').hide();
		    }
		});

	}, // end customModal	

	appendModal: function(elementID, msg){

			AlaAuth.customModal();
			elementID.append("<div class='custom-modal'>"+msg+"</div>");
 
	} // end appendModal 

}; //end AlaAuth object


// function request_pass_msg(){
// 	AlaAuth.appendModal($('.commenter-signin'), 'asdasd');
// }

function alert_msg(elementID, msg){

	AlaAuth.customModal();
	elementID.append("<div class='custom-modal'><i class='laurel-small'></i>"+msg+''+'<p class="note">Press any key or click anywhere outside this message to make it dissappear</p>'+"</div>");

}	

 


	 