// Browser detection. Yes, really. Guess for which browser? Nope! Chrome.
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

$(document).ready(function(){

	$('.global-nav').addClass('deluxe');

	// attempts to neuter any existing Genius annotations
	$('genius-referent')
	  .attr('data-genius-style-id','')
	  .attr('data-genius-featured-referent','')
	  .attr('data-genius-referent-id','')
	  .attr('data-genius-wrapped-path','')
	  .attr('data-genius-api-path','')
	  .attr('data-genius-annotator-id','');

	$('.go-to-nav').click (function(event){

		var navState = $( "html" ).hasClass('show-nav');

		var scrollHandler = function(){
		    $('html').removeClass('show-nav');
		}

		if (!navState){
			$( "html" ).addClass('show-nav');
			/* $(window).bind('scroll', scrollHandler); */
		} else {
			$( "html" ).removeClass('show-nav');
			/* $(window).unbind('scroll', scrollHandler); */
		}

		return false;

	});

	$('.global-nav').click(function(event){
	     event.stopPropagation();
	});

	$('body').click(function() {
	   $('html').removeClass('show-nav');
	});

	$('.load-comments-no-js').addClass('none');
	$('#load-comments').addClass('buttonish new');

	$('[data-fallback]').on('error', function(){

		var fallback = $(this).attr('data-fallback');

		$(this).attr('src', fallback);

	});

	$('[data-trackevent]').on('click', function() {

		mixpanel.track($(this).attr('data-trackevent'));

	});

	$("sup[data-footnote]").each(function() {

		noteCount = $(this).html();

		$(this).html('<a id="ref' + noteCount + '" href="#note' + noteCount + '">' + noteCount + '</a>');

	});

	var count1 = 0;
	var count2 = 0;
	var count3 = 0;

	var hashLink;

	$(".hentry .main-content > h2, .hentry .main-content > h3, .hentry .main-content > h4, .hentry .main-content > h5, .hentry .main-content > h6").each(function() {

		// need to check for existence of an ID attribute

		count1++;

		var thisID = $(this).attr('id');

		if (typeof thisID !== 'undefined' && thisID !== false) {

			hashLink = $(this).attr("id");

			console.log('found one with an id');

		} else {

			hashLink = "section" + count1;

			$(this).attr("id", hashLink);

			//console.log('adding id');

		};

		$(this).append("<a class='subhead-anchor' href='#" + hashLink + "'>#" + hashLink + "</a>");

	});

	$(".hentry .main-content > pre").each(function() {

		count2++;
		$(this).attr("id", "snippet" + count2);

	});

	$(".hentry .main-content > figure:not(.tall-hero)").each(function() {

		count3++;
		$(this).attr("id", "figure" + count3);

	});

	/*
	$(".hentry .main-content pre").on("click", function() {

		$(this).addClass("editing").children("code").attr("contenteditable", "true");

	});

	$("code[contenteditable='true']").on("blur", function() {

		alert();

	});
	*/

// Initiating AlaEvents object to hold events related functions
	var AlaEvents = {

		// On the event page connect panelist anchor to panelist bio.
		createPanelistAnchor: function(){

			var nameLink = $('.name-link'),
				nameTarget= $('.columnist'),
				nameHash, i, j;

			for (i=0;i<nameLink.length;i++) {
				nameHash = "#panelist" + (i + 1);
				nameLink[i].setAttribute("href", nameHash);
			}

			for (j=0;j<nameTarget.length;j++) {
				nameTarget[j].setAttribute("id", "panelist" + (j + 1));
			}
		}
		// Todo: maybe show panelist name in hash instead of panelist#
		// Make the function not content specific
	};

	AlaEvents.createPanelistAnchor();

	$("body").on("click", "#cancel-login", function(e) {

		e.preventDefault();

		$("#sign-in-form").removeClass("active");

		$("#login-buttons").addClass("active");

	});

	$("body").on("click", "#cancel-password-reset", function(e) {

		e.preventDefault();

		$("#forgot_password_form").removeClass("active");

		$("#sign-in-form").addClass("active");

	});

	$("body").on("click", "#cancel-registration", function(e) {

		e.preventDefault();

		$("#register-form").removeClass("active");

		$("#sign-in-form").addClass("active");

	});

	$("body").on("click", "#show-native-login", function(e) {

		e.preventDefault();

		$("#sign-in-form").toggleClass("active");

		$("#register-form").removeClass("active");

		$("#forgot_password_form").removeClass("active");

		$("#login-buttons").removeClass("active");

		$("#subject-name-here").focus();

	});

	$("body").on("click", "#show-forgot-password-form", function(e) {

		e.preventDefault();

		$("#sign-in-form").removeClass("active");

		$("#show-registration-form").removeClass("active");

		$("#forgot_password_form").toggleClass("active");

		$("#subject-email-here").focus();

	});

	$("body").on("click", "#show-registration-form", function(e) {

		e.preventDefault();

		$("#sign-in-form").removeClass("active");

		$("#forgot_password_form").removeClass("active");

		$("#register-form").toggleClass("active");

		$("#subject-username-here").focus();

	});

	$(".col-holder .secondary-column .author-nav:not(.active) h2").click(function() {

		$(".col-holder .secondary-column .author-nav").toggleClass("active");

	});

	$("#next-letters").click(function(e) {

		e.preventDefault();

		$("#alphabits").disableSelection();

		maskWidth = $("#alphabits").width();

		listWidth = $("#alphabits > ol").width();

		currentOffset = parseInt($("#alphabits > ol").css("margin-left"));

		if (  maskWidth > -( currentOffset + maskWidth ) ) {
			$("#alphabits > ol").css("margin-left", (currentOffset - maskWidth + 89));
		}
	});

	$("#previous-letters").click(function(e) {

		e.preventDefault();

		$("#alphabits").disableSelection();

		maskWidth = $("#alphabits").width();

		currentOffset = parseInt($("#alphabits > ol").css("margin-left"));

		if (currentOffset != "0") {
			$("#alphabits > ol").css("margin-left", (currentOffset + maskWidth - 89));
		};

	});

	$("a[data-alphabit]").on("click", function(e) {

		e.preventDefault();

		$("#alphabits").disableSelection();

		if (!$(this).hasClass("active")) {

			$("a[data-alphabit]").removeClass("active");

			letter = $(this).attr("data-alphabit");

			$("#alpha-target").attr("data-show", letter);

			$(this).addClass("active");

			$("#browse-title").attr("data-display-letter", letter.toUpperCase());

		} else {

			$("a[data-alphabit]").removeClass("active");

			$("#alpha-target").removeAttr("data-show");

			$("#browse-title").removeAttr("data-display-letter");

		};

	});

	$("#load-comments").click(function(e) {

		e.preventDefault();

		loadThoseComments();

	});

	$("form#main-search").submit(function(e) {

		userQuery = $("input[name=q]").val();

		if (userQuery == "") {

			$("input[name=keywords]").attr("placeholder", "").focus();

			e.stopPropagation();

			return false;

		} else {

			e.preventDefault();

			window.location = '/search?keywords=' + userQuery;

		};

	});

	$("body").on("click", ".embed-code", function() {

		$(this).select();

	});

	if ($(".comment").length != -1) {

		$(".comment").CommentEditor();

	};

	$("#comments").bind("comments-appended", function() {

		//console.log('comments loaded');

		$(".comment").CommentEditor();

	});

	$('body').on('input propertychange focus', 'textarea[data-autoresize]', function() {

		autoResize($(this));

	});

	var tabMaster = false;

	$('body').on('focus', '[data-tabmaster]', function() {

		tabMaster = $(this).attr('data-tabmaster');

	});

	$('body').on('keydown', '[data-tabto]', function(e) {

		var target = $(this).attr('data-tabto');

		if (e.which == 9 && !e.shiftKey && tabMaster == "true") {
			e.preventDefault();
			console.log('tab detected');
			$('#' + target).focus();
		} else if (e.shiftKey) {

			tabMaster = false;

		};

	});

	/*var emailFilter = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

	$("form#email-subscribe").submit(function(e) {

		customValidation = $(this).attr('data-customvalidate');

		userName = $("form#email-subscribe input[name=NAME]").val();

		userEmail = $("form#email-subscribe input[name=EMAIL]").val();

		userType = $('form#email-subscribe input[type=checkbox]:checked').size();

		if (userName == "" || userEmail == "") {

			$("form#email-subscribe p.error").html('Hey, did you fill out all the fields?');

			return false;

		} else {

			if (!emailFilter.test(userEmail)) {

				$("form#email-subscribe p.error").html('Hey, is that a real email address?');

				return false;

			} else if (customValidation != 'no-checkbox' && userType == 0) {

				$("form#email-subscribe p.error").html('Hey, did you check some boxes?');

				return false;

			};

		};

	})*/

	// var maskTerm = 'hide';
	// var unmaskTerm = 'show';

	// $('.password-field').append('<a class="password-mask" href="#">' + maskTerm + '</a>');

	// $('input[type="password"]').each(function() {

	// 	$(this).changeType($(this), 'text');

	// });

	// $('.password-mask').on('click', function(){

	// 	var field = $(this).siblings('input[type="password"], input[type="text"]');

	// 	if ($(this).html() == unmaskTerm) {

	// 		field.changeType(field, 'text')
	// 		$(this).html(maskTerm);

	// 	} else {

	// 		field.changeType(field, 'password');
	// 		$(this).html(unmaskTerm);

	// 	};

	// 	return false;

	// });

	// if ($("#job-board-target") != -1){


	// 	Modernizr.load({
	// 		test: ($("#job-board-target" ).length > 0),
	// 		yep: [ "/components/assets/js/libs/postscribe.js" ],
	// 		callback: function( url, res, key ) {
	// 			postscribe('#job-board-target', '<h4>Job Board</h4><script src="https://weworkremotely.com/jobs/random.js"><\/script><p class="board-link">Job listings via <a href="https://weworkremotely.com/?source=ala">We Work Remotely</a></p>');

	// 			postscribe('#deck-target', '<div class="deck-inner"><script src=http://www.northmay.com/deck/deckAL_js.php?' + (new Date().getTime()) + '><\/script><p><a href="http://www.coudal.com/deck/">Ad via The Deck</a></p></div>');
	// 		}
	// 	});


	// };

});


sponsorSniff = document.addEventListener("DOMNodeInserted", function(event) {

	if ($(event.target).parent()[0].id == 'bsap_1031') {

		$('body').addClass('sponsored');

		showSponsorImage();

		document.removeEventListener('DOMNodeInserted', sponsorSniff, false);

	};

});

var dpr = window.devicePixelRatio

function showSponsorImage() {

	if ((dpr != 'undefined') && (dpr > '1')) {
		var adImage = $('.sponsor-logo').attr('data-hiresbg');
	} else {
		var adImage = $('.sponsor-logo').attr('data-standardbg');
	};
	var adHeight = $('.sponsor-logo').attr('data-height');
	var adWidth  = $('.sponsor-logo').attr('data-width');

	$('.sponsor-logo').css({
		height: adHeight,
		width: adWidth,
		backgroundImage: 'url(' + adImage + ')'
	});

	$('.sponsor-top').css('display', 'block');

};

// var autoLoadComments = function() {

// 	loadCommentsButton = $("#load-comments");

// 	//loadThoseComments();

// }

// commentsLoaded = false;

// var loadThoseComments = function(target) {

// 	newTarget = target;

// 	loadWhichComments = $("#load-comments").attr("data-url-title");

// 	$("#load-comments").addClass('buttonish');

// 	// unbind this stuff to prevent multiple loads (not working)
// 	$(window).unbind("scrollend");
// 	$("body").removeClass("comments-exist");

// 	if (commentsLoaded == false) {

// 		commentsLoaded = true;

// 		$.get("/comments/embed-comments/" + loadWhichComments, function(data) {

// 			$(".article-comments.form").before(data).trigger("comments-appended");

// 			commentsLoaded = true;

// 			$("#load-comments").remove();

// 			// if (newTarget) {

// 			// 	whereIsIt = $("#" + newTarget).position();

// 			// 	window.scrollTo(0,whereIsIt.top);

// 			// }

// 		})
// 		.done(function() {
// 			var fullDocHeight = $(document).height();
// 		})
// 		.error(function() {

// 			commentsLoaded = false;

// 			// console.log('WHERE ARE THE COMMENTS');

// 		});

// 	};

// };

var loadWhichComments = $("#load-comments").attr("data-url-title");

var loadComments = function() { 


	$.get("/comments/embed-comments/" + loadWhichComments, function(data) {
 	
		$(".article-comments.form").before(data).trigger("comments-appended");

 		$("#load-comments").remove();

	});

};
 
var loadCommentCount = function() {

	loadWhichCommentCount = $("#comments h1").attr("data-url-title");
	loadCommentCountIndex = $("#home-page .comments").attr("data-url-title");
	loadCommentCountArticles = $(".meta .comments").attr("data-url-title");

	 
	$.get("/comments/comment-count-comment-form/" + loadWhichCommentCount, function(ret){

		$('#comments h1 span').replaceWith(ret);

	}, false);

	$.get("/comments/comment-count-bubble/" + loadWhichCommentCount, function(ret){

		$('.comment-bubble-articles span').replaceWith(ret);

	}, false);

 
	$.get("/comments/comment-count-bubble-blog/" + loadWhichCommentCount, function(ret){

		$('.comment-bubble-blog span').replaceWith(ret);

	}, false);
 
 
	$.get("/comments/comment-count-index/" + loadCommentCountIndex, function(ret){

		$('#home-page .comments').replaceWith(ret);

	}, false);
};

loadCommentCount();
loadComments();


$(window).setBreakpoints({
// use only largest available vs use all available
    distinct: true,
// array of widths in pixels where breakpoints
// should be triggered
    breakpoints: [
        1,
        600
    ]
});

$(window).bind('exitBreakpoint600',function() {

	//$("#home-page .logo-holder .global-nav").remove();

	$(window).unbind("scrollend");

});

// $(window).bind('enterBreakpoint600',function() {

// 	//$("#home-page .global-nav").clone().prependTo(".logo-holder");

// 	if (($("body").is(".comments-exist")) && ($("#load-comments").length != -1)) {

// 		autoLoadComments();

// 		$(window).scrollStopped(function(){

// 			autoLoadComments();

// 		});

// 	};

// });

$.fn.scrollStopped = function(callback) {
    $(this).scroll(function(){

        var self = this, $this = $(self);
        if ($this.data('scrollTimeout')) {
          clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,250,self));
    });
};

// because we're post-loading some things, anchor link target positions often change
// (because the page changes size/shape after things are inserted)
// this tells the page to re-trigger; hopefully it happens quickly enough that the user doesn't have a bumpy ride
window.onload = function() {

	if(window.location.hash) {

		parseHash = window.location.hash.split("#");

		// if ((parseHash[1] == "comment-form") || (parseHash[1] == "latest") || (parseHash[1] == "comments")) {
		if ((parseHash[1] == "comment-form") || (parseHash[1] == "comments")) {

			loadThoseComments(parseHash[1]);

		} else if ($("#" + parseHash[1]).length) {

			// do we need this for non-comment-related anchors?

			//whereIsIt = $("#" + parseHash[1]).position();

			//window.scrollTo(0,whereIsIt.top);

		}

 	 }

};

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

$.support.selectstart = "onselectstart" in document.createElement("div");

$.fn.disableSelection = function() {
    return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
        ".ui-disableSelection", function( event ) {
        event.preventDefault();
    });
};

if(document.URL.indexOf("do-not-share") == -1){

	Modernizr.load({
		test: ($( "[class*='language']" ).length > 0),
		yep: [ "/components/assets/css/prism.css", "/components/assets/js/libs/prism.js" ],
		callback: function( url, res, key ) {
			if ( url === "/components/assets/js/libs/prism.js" ) {
				Prism.highlightAll();
			}
		}
	});

};

$.fn.CommentEditor = function(options) {

	var OPT;

	OPT = $.extend({
	       url: "/?ACT=4",
	       comment_body: '.comment-body',
	       showEditor: '.edit-link',
	       hideEditor: '.cancel-edit',
	       hideEmbed: '.cancel-embed',
	       saveComment: '.submit-edit',
	       closeComment: '.mod-link',
	       showEmbed: '.embed-link'
	}, options);

	var view_elements = [OPT.comment_body, OPT.showEditor, OPT.closeComment, OPT.showEmbed].join(','),
	       edit_elements = '.edit-comment',
	       embed_elements = '.embed-comment';

	return this.each(function() {
	       var id = this.id,
	       parent = $(this);

	       parent.find(OPT.showEditor).click(function() { showEditor(id); return false; });
	       parent.find(OPT.hideEditor).click(function() { hideEditor(id); return false; });
	       parent.find(OPT.hideEmbed).click(function() { hideEmbed(id); return false; });
	       parent.find(OPT.saveComment).click(function() { saveComment(id); return false; });
	       parent.find(OPT.closeComment).click(function() { closeComment(id); return false; });
	       parent.find(OPT.showEmbed).click(function() { showEmbed(id); return false; });
	});

	function showEmbed(id) {
	       $("#"+id)
	               .find(view_elements).css('opacity', '.1').end()
	               .find(embed_elements).slideDown('fast').end();
	}

	function showEditor(id) {
	       $("#"+id)
	               .find(view_elements).css('opacity', '.1').end()
	               .find(edit_elements).slideDown('fast').end();
	}

	function hideEditor(id) {
	       $("#"+id)
	               .find(view_elements).css('opacity', '1').end()
	               .find(edit_elements).slideUp('fast');
	}

	function hideEmbed(id) {
	       $("#"+id)
	               .find(view_elements).css('opacity', '1').end()
	               .find(embed_elements).slideUp('fast');
	}

	var getHash;

	function closeComment(id) {

		var confirmClose = confirm('Are you sure?');

		if (confirmClose == true) {

			if (getHash == null) {
				getHash = $("#comments-parent").data('xid');
			}
			var data = {status: "close", comment_id: id, XID: getHash};

			$.post(OPT.url, data, function (res) {
				if (res.error) {
					return $.error('Could not moderate comment.');
				}

				hash = res.XID;
				$('input[name=XID]').val(hash);
				$('#' + id).fadeOut('fast');
				getHash = hash;
				//reload comment count
				loadCommentCount();
				console.log('comment count loaded after comment deleted');
			});

		}
	}

	function saveComment(id) {

	if (getHash == null) {
		getHash = $("#comments-parent").data('xid');
	}
	var content = $("#"+id).find('.edit-comment'+' textarea').val(),
	data = {comment: content, comment_id: id, XID: getHash};

	$.post(OPT.url, data, function (res) {
		if (res.error) {
			return $.error('Could not save comment.');
		}

		hash = res.XID;
		$('input[name=XID]').val(hash);
		$("#"+id).find('.comment-body').html(res.comment);
		hideEditor(id);
		getHash = hash;
	});
	}
};

/*
		Functions for auto-resizing textareas.
		Based almost entirely on John Long's excellent autogrow plugin (except I un-plugin-ifyed it):
		https://gist.github.com/jlong/2127634

		For a more consistent user experience you should apply resize: none to auto-resizing textareas in your CSS.
		The plugin needs to apply it on its own, so it's better that it not be there at all. (That said, you probably
		want to apply that style only when JS is avaialble.)
*/

var properties = ['-webkit-appearance','-moz-appearance','-o-appearance','appearance','font-family','font-size','font-weight','font-style','border','border-top','border-right','border-bottom','border-left','box-sizing','padding','padding-top','padding-right','padding-bottom','padding-left','min-height','max-height','line-height'],		escaper = $('<span />');

function escape(string) {
	return escaper.text(string).text().replace(/\n/g, '<br>');
};

function autoResize(which) {

	if (!which.data('autogrow-applied')) {

			var textarea = which, initialHeight = textarea.innerHeight(), expander = $('<div />'), timer = null;

			// Setup expander
			expander.css({'position': 'absolute', 'visibility': 'hidden', 'bottom': '110%'})
			$.each(properties, function(i, p) { expander.css(p, textarea.css(p)); });
			textarea.after(expander);

			// Setup textarea
			textarea.css({'overflow-y': 'hidden', 'resize': 'none', 'box-sizing': 'border-box'});

			// Sizer function
			function sizeTextarea() {
				clearTimeout(timer);
				timer = setTimeout(function() {
						var value = escape(textarea.val().replace(/\</g, '&lt;')) + '<br>z';
						expander.html(value);
						expander.css('width', textarea.innerWidth() + 2 + 'px');
						textarea.css('height', Math.max(expander.innerHeight(), initialHeight) + 6 + 'px');
				}, 100); // throttle by 100ms ?
			}

			// Bind sizer to IE 9+'s input event and Safari's propertychange event
			textarea.on('input.autogrow propertychange.autogrow focus', sizeTextarea);

			// Set the initial size
			sizeTextarea();

			// Record autogrow applied
			textarea.data('autogrow-applied', true);

	};

};

$.fn.changeType = function(x, type) {

	if(x.prop('type') == type) return x; //That was easy.

	try {
	return x.prop('type', type); //Stupid IE security will not allow this
	} catch(e) {
	//Try re-creating the element (yep... this sucks)
	//jQuery has no html() method for the element, so we have to put into a div first
	var html = $("<div>").append(x.clone()).html();
	var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
	//If no match, we add the type attribute to the end; otherwise, we replace
	var tmp = $(html.match(regex) == null ?
	html.replace(">", ' type="' + type + '">') :
	html.replace(regex, 'type="' + type + '"') );
	//Copy data from old element
	tmp.data('type', x.data('type') );
	var events = x.data('events');
	var cb = function(events) {
	return function() {
	//Bind all prior events
	for(i in events)
	{
	var y = events[i];
	for(j in y)
	tmp.bind(i, y[j].handler);
	}
	}
	}(events);
	x.replaceWith(tmp);
	setTimeout(cb, 10); //Wait a bit to call function
	return tmp;
	}

}

//history api helper - this is outside the ajax-functions.js because we don't want it loading on each XMLHttpRequest call
$(document).ready(function(){

	if(typeof states != "undefined") //check that the current page has a states object
	{
		// When the pages refreshes show the correct template
		if (window.location.href == states.site_url + states.segments + '/' + states.register) {
			console.log('script.js call');
			AlaAuth.loadTemplate(
				states.register
			);
			history.replaceState(
				states.register,
				'on ' + states.register,
				states.site_url + states.segments + '/' + states.register
			);

		}
		if (window.location.href == states.site_url + states.segments + '/' + states.password) {
			console.log('script.js call');
			AlaAuth.loadTemplate(
				states.password
			);
			history.replaceState(
				states.password,
				'on ' + states.password,
				states.site_url + states.segments + '/' + states.password
			);

		}

	}//end states check

});


