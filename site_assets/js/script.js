// Browser detection. Yes, really. Guess for which browser? Nope! Chrome.
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

$(document).ready(function(){

	/* setting up hamburger nav dropdown */

	$('.global-nav').addClass('deluxe');
	
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

	$("sup[data-footnote]").each(function() {

		noteCount = $(this).html();

		$(this).html('<a id="ref' + noteCount + '" href="#note' + noteCount + '">' + noteCount + '</a>');

	});

	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	
	$(".hentry .main-content > h2, .hentry .main-content > h3, .hentry .main-content > h4, .hentry .main-content > h5, .hentry .main-content > h6").each(function() {
		
		count1++;
		$(this).attr("id", "section" + count1);

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
		
		listWidth = $("#alphabits > ul").width();
		
		currentOffset = parseInt($("#alphabits > ul").css("margin-left"));
		
		if (  maskWidth > -( currentOffset + maskWidth ) ) {
			$("#alphabits > ul").css("margin-left", (currentOffset - maskWidth + 89));
		}
	});
	
	$("#previous-letters").click(function(e) {
		
		e.preventDefault();
		
		$("#alphabits").disableSelection();
		
		maskWidth = $("#alphabits").width();
		
		currentOffset = parseInt($("#alphabits > ul").css("margin-left"));
		
		if (currentOffset != "0") {
			$("#alphabits > ul").css("margin-left", (currentOffset + maskWidth - 89));
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

	var min = 1;
	var max = 10;
	var random = Math.floor(Math.random() * (max - min + 1)) + min;

	$(".no-touch").on("mouseover", ".logo-holder, #home-page > .global-nav", function() {

		if (random == 10) {

			$(".logo-holder .killer-logo a:not(.active)").addClass("yeeeeeeaahhh");

		};

	});
	
	$("form.main-search:not(.open-search)").bind("touchstart", function(e) {
			
		e.preventDefault();
	
		$(this).addClass("open-search").unbind("touchstart");
		
		$("input[type=search]").css("font-size", "16px");
		
	});
	
	$(".touch input[type=search]").blur(function() {
		
		$("input[type=search]").css("font-size", "10px");
		
		$("form.main-search").removeClass("open-search");
		
	});
	
	$("form.main-search").submit(function(e) {
	
		if ($("input[name=keywords]").val() == "") {
			
			$("input[name=keywords]").attr("placeholder", "Oh come on, search for something.").focus();
			
			return false;
			
		} else {
			
			return true;
			
		}
		
	});

	$("body").on("click", ".embed-code", function() {

		$(this).select();

	});
	
	if ($(".comment").length != -1) {

		$(".comment").CommentEditor();

	};

	$("#comments").bind("comments-appended", function() {
		
		console.log('comments loaded');

		$(".comment").CommentEditor();

	});
	
	$('body').on('input propertychange', 'textarea[data-autoresize]', function() {
	
		autoResize($(this));
	
	});
				
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

var autoLoadComments = function() {
	
	loadCommentsButton = $("#load-comments").offset();
	
	if ($(window).scrollTop() >= (loadCommentsButton.top - $(window).height())) {
		
		//console.log('trigger comment load now');
		
		loadThoseComments();
	
	}
		
}

commentsLoaded = false;

var loadThoseComments = function(target) {
	
	newTarget = target;
	
	loadWhichComments = $("#load-comments").attr("data-url-title");
	
	// unbind this stuff to prevent multiple loads (not working)
	$(window).unbind("scrollend");
	$("body").removeClass("comments-exist");
	
	if (commentsLoaded == false) {
	
		commentsLoaded = true;

		$.get("/comments/embed-comments/" + loadWhichComments, function(data) {
			
			$("#comments").append(data).trigger("comments-appended");
	
			commentsLoaded = true;
		
			$("#load-comments").remove();
		
			if (newTarget) {
			
				whereIsIt = $("#" + newTarget).position();
			
				window.scrollTo(0,whereIsIt.top);
			
			}
	
		})
		.error(function() {
	
			commentsLoaded = false;
			
			//console.log('WHERE ARE THE COMMENTS');
		
		});

	};
	
};

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

$(window).bind('enterBreakpoint600',function() {

	//$("#home-page .global-nav").clone().prependTo(".logo-holder");
	
	if (($("body").is(".comments-exist")) && ($("#load-comments").length != -1)) {
		
		autoLoadComments();
	
		$(window).bind("scrollend", function() {
	
			autoLoadComments();
		
		});
	
	};
	
});

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


// FROM: https://github.com/benmajor/jQuery-Mobile-Events/blob/master/src/jquery.mobile-events.js
/*!
 * jQuery Mobile Events
 * by Ben Major (www.ben-major.co.uk)
 *
 * Copyright 2011, Ben Major
 * Licensed under the MIT License:
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

(function($) {

	var settings = {
		swipe_h_threshold 	: 50,
		swipe_v_threshold 	: 50,
		taphold_threshold 	: 750,
		doubletap_int       : 500,
		touch_capable       : ('ontouchstart' in document.documentElement),
		orientation_support : ('orientation' in window && 'onorientationchange' in window),
		startevent        	: ('ontouchstart' in document.documentElement) ? 'touchstart' : 'mousedown',
		endevent		  	: ('ontouchstart' in document.documentElement) ? 'touchend' : 'mouseup',
		moveevent         	: ('ontouchstart' in document.documentElement) ? 'touchmove' : 'mousemove',
		tapevent		  	: ('ontouchstart' in document.documentElement) ? 'tap' : 'click',
		scrollevent       	: ('ontouchstart' in document.documentElement) ? 'touchmove' : 'scroll',
		hold_timer 			: null,
		tap_timer 			: null
	};
	
	// Add Event shortcuts:
	$.each(('tapstart tapend tap singletap doubletap taphold swipe swipeup swiperight swipedown swipeleft scrollstart scrollend orientationchange').split(' '), function(i, name) {
		$.fn[name] = function(fn)
		{
			return fn ? this.bind(name, fn) : this.trigger(name);
		};
	
		$.attrFn[name] = true;
	});
	
	// tapstart Event:
	$.event.special.tapstart = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject);
			
			$this.bind(settings.startevent, function(e) {
				if(e.which && e.which !== 1)
				{
					return false;
				}
				else
				{
					triggerCustomEvent(thisObject, 'tapstart', e)
				}
			});
		}
	}
	
	// tapend Event:
	$.event.special.tapend = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject);
			
			$this.bind(settings.endevent, function(e) {
				triggerCustomEvent(thisObject, 'tapend', e);
			});
		}
	}
	
	// taphold Event:
	$.event.special.taphold = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject),
				origTarget,
				timer,
				start_pos = { x : 0, y : 0 };
			
			$this.bind(settings.startevent, function(e) {
				if(e.which && e.which !== 1)
				{
					return false;
				}
				else
				{
					$this.data('tapheld', false);
					origTarget = e.target;
					start_pos.x = (settings.touch_capabale) ? e.targetTouches[0].pageX : e.pageX;
					start_pos.y = (settings.touch_capabale) ? e.targetTouches[0].pageY : e.pageY;
					settings.hold_timer = window.setTimeout(function() {
						var end_x = (settings.touch_capabale) ? e.targetTouches[0].pageX : e.pageX,
							end_y = (settings.touch_capabale) ? e.targetTouches[0].pageY : e.pageY;
						if(e.target == origTarget && (start_pos.x == end_x && start_pos.y == end_y))
						{
							$this.data('tapheld', true);
							triggerCustomEvent(thisObject, 'taphold', e);
						}
					}, settings.taphold_threshold);
				}
			}).bind(settings.endevent, function() {
				window.clearTimeout(settings.hold_timer);
			});
		}
	}
	
	// doubletap Event:
	$.event.special.doubletap = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject),
				origTarget,
				action;
			
			$this.bind(settings.startevent, function(e) {
				if(e.which && e.which !== 1)
				{
					return false;
				}
				else
				{
					$this.data('doubletapped', false);
					origTarget = e.target;
				}
			}).bind(settings.endevent, function(e) {
				var now = new Date().getTime();
				var lastTouch = $this.data('lastTouch') || now + 1;
				var delta = now - lastTouch;
				window.clearTimeout(action);
				
				if(delta < settings.doubletap_int && delta > 0 && (e.target == origTarget) && delta > 100)
				{
					$this.data('doubletapped', true);
					window.clearTimeout(settings.tap_timer);
					triggerCustomEvent(thisObject, 'doubletap', e);
				}
				else
				{
					$this.data('lastTouch', now);
					action = window.setTimeout(function(e){ window.clearTimeout(action); }, settings.doubletap_int, [e]);
				}
				$this.data('lastTouch', now);
			});
		}
	}
	
	// singletap Event:
	// This is used in conjuction with doubletap when both events are needed on the same element
	$.event.special.singletap = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject),
				origTarget = null,
				startTime  = null;
				
			$this.bind(settings.startevent, function(e) {
				if(e.which && e.which !== 1)
				{
					return false;
				}
				else
				{
					startTime = new Date().getTime();
					origTarget = e.target;
				}
			}).bind(settings.endevent, function(e) {
				if(e.target == origTarget)
				{
					settings.tap_timer = window.setTimeout(function() {
						if(!$this.data('doubletapped') && !$this.data('tapheld'))
						{
							triggerCustomEvent(thisObject, 'singletap', e);
						}
					}, settings.doubletap_int);
				}
			});
		}
	}
	
	// tap Event:
	$.event.special.tap = {
		setup: function() {
			var thisObject = this,
				$this = $(thisObject),
			    started = false,
				origTarget = null,
				start_time,
				start_pos = { x : 0, y : 0 };

			$this.bind(settings.startevent, function(e) {
				if(e.which && e.which !== 1)
				{
					return false;
				}
				else
				{
					started = true;
					start_pos.x = (settings.touch_capabale) ? e.targetTouches[0].pageX : e.pageX;
					start_pos.y = (settings.touch_capabale) ? e.targetTouches[0].pageY : e.pageY;
					start_time = new Date().getTime();
					origTarget = e.target;
				}
			}).bind(settings.endevent, function(e) { 
				// Only trigger if they've started, and the target matches:
				var end_x = (settings.touch_capabale) ? e.targetTouches[0].pageX : e.pageX,
					end_y = (settings.touch_capabale) ? e.targetTouches[0].pageY : e.pageY;
				
				if(origTarget == e.target && started && ((new Date().getTime() - start_time) < settings.taphold_threshold) && (start_pos.x == end_x && start_pos.y == end_y))
				{
					triggerCustomEvent(thisObject, 'tap', e);
				}
			});
		}
	};
	
	// swipe Event (also handles swipeup, swiperight, swipedown and swipeleft):
	$.event.special.swipe = {
		setup: function() {
			var thisObject = this,
			    $this = $(thisObject),
				started = false,
				originalCoord = { x: 0, y: 0 },
			    finalCoord    = { x: 0, y: 0 };
	
			// Screen touched, store the original coordinate
			function touchStart(event)
			{
				originalCoord.x = (settings.touch_capable) ? event.targetTouches[0].pageX : event.pageX;
				originalCoord.y = (settings.touch_capable) ? event.targetTouches[0].pageY : event.pageY;
				finalCoord.x = originalCoord.x;
				finalCoord.y = originalCoord.y;
				started = true;
			}
			
			// Store coordinates as finger is swiping
			function touchMove(event)
			{
				//event.preventDefault();
				event.stopPropagation();
				finalCoord.x = (settings.touch_capable) ? event.targetTouches[0].pageX : event.pageX;
				finalCoord.y = (settings.touch_capable) ? event.targetTouches[0].pageY : event.pageY;
				window.clearTimeout(settings.hold_timer);
				
				var swipedir;
				
				// We need to check if the element to which the event was bound contains a data-xthreshold | data-vthreshold:
				var ele_x_threshold = $this.attr('data-xthreshold'),
				    ele_y_threshold = $this.attr('data-ythreshold'),
					    h_threshold = (typeof ele_x_threshold !== 'undefined' && ele_x_threshold !== false && parseInt(ele_x_threshold)) ? parseInt(ele_x_threshold) : settings.swipe_h_threshold,
						v_threshold = (typeof ele_y_threshold !== 'undefined' && ele_y_threshold !== false && parseInt(ele_y_threshold)) ? parseInt(ele_y_threshold) : settings.swipe_v_threshold;
				
				
				if(originalCoord.y > finalCoord.y && (originalCoord.y - finalCoord.y > v_threshold)) { swipedir = 'swipeup'; }
				if(originalCoord.x < finalCoord.x && (finalCoord.x - originalCoord.x > h_threshold)) { swipedir = 'swiperight'; }
				if(originalCoord.y < finalCoord.y && (finalCoord.y - originalCoord.y > v_threshold)) { swipedir = 'swipedown'; }
				if(originalCoord.x > finalCoord.x && (originalCoord.x - finalCoord.x > h_threshold)) { swipedir = 'swipeleft'; }
				if(swipedir != undefined && started)
				{
					originalCoord.x = 0;
					originalCoord.y = 0;
					finalCoord.x = 0;
					finalCoord.y = 0;
					$this.trigger('swipe').trigger(swipedir);
					started = false;
				}
			}
			
			function touchEnd(event)
			{
				started = false;
			}

			// Add gestures to all swipable areas
			if(!thisObject.addEventListener)
			{
				// IE:
				thisObject.attachEvent(settings.startevent, touchStart);
				thisObject.attachEvent(settings.moveevent, touchMove);
				thisObject.attachEvent(settings.endevent, touchEnd);
			}
			else
			{
				// Everything else:
				thisObject.addEventListener(settings.startevent, touchStart, false);
				thisObject.addEventListener(settings.moveevent, touchMove, false);
				thisObject.addEventListener(settings.endevent, touchEnd, false);
			}
		}
	};
	
	// scrollstart Event (also handles scrollend):
	$.event.special.scrollstart = {
		setup: function() {
			var thisObject = this,
				$this = $(thisObject),
				scrolling,
				timer;

			function trigger(event, state)
			{
				scrolling = state;
				triggerCustomEvent(thisObject, scrolling ? 'scrollstart' : 'scrollend', event);
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind(settings.scrollevent, function(event) {
				if(!scrolling)
				{
					trigger(event, true);
				}
	
				clearTimeout(timer);
				timer = setTimeout(function() { trigger(event, false); }, 50);
			});
		}
	};
	
	// This is the orientation change (largely borrowed from jQuery Mobile):
	var win = $(window),
		special_event,
		get_orientation,
		last_orientation,
		initial_orientation_is_landscape,
		initial_orientation_is_default,
		portrait_map = { '0': true, '180': true };

	if(settings.orientation_support)
	{
		var ww = window.innerWidth || $(window).width(),
			wh = window.innerHeight || $(window).height(),
			landscape_threshold = 50;

		initial_orientation_is_landscape = ww > wh && (ww - wh) > landscape_threshold;
		initial_orientation_is_default = portrait_map[window.orientation];

		if((initial_orientation_is_landscape && initial_orientation_is_default) || (!initial_orientation_is_landscape && !initial_orientation_is_default))
		{
			portrait_map = { '-90': true, '90': true };
		}
	}

	$.event.special.orientationchange = special_event = {
		setup: function() {
			// If the event is supported natively, return false so that jQuery
			// will bind to the event using DOM methods.
			if(settings.orientation_support)
			{
				return false;
			}

			// Get the current orientation to avoid initial double-triggering.
			last_orientation = get_orientation();

			win.bind('throttledresize', handler);
		},
		teardown: function()
		{
			if (settings.orientation_support)
			{
				return false;
			}

			win.unbind('throttledresize', handler);
		},
		add: function(handleObj)
		{
			// Save a reference to the bound event handler.
			var old_handler = handleObj.handler;

			handleObj.handler = function(event)
			{
				event.orientation = get_orientation();
				return old_handler.apply(this, arguments);
			};
		}
	};

	// If the event is not supported natively, this handler will be bound to
	// the window resize event to simulate the orientationchange event.
	function handler()
	{
		// Get the current orientation.
		var orientation = get_orientation();

		if(orientation !== last_orientation)
		{
			// The orientation has changed, so trigger the orientationchange event.
			last_orientation = orientation;
			win.trigger( "orientationchange" );
		}
	}

	$.event.special.orientationchange.orientation = get_orientation = function() {
		var isPortrait = true,
		    elem = document.documentElement;

		if(settings.orientation_support)
		{
			isPortrait = portrait_map[window.orientation];
		}
		else
		{
			isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
		}

		return isPortrait ? 'portrait' : 'landscape';
	};
	
	// throttle Handler:
	$.event.special.throttledresize = {
		setup: function()
		{
			$(this).bind('resize', throttle_handler);
		},
		teardown: function()
		{
			$(this).unbind('resize', throttle_handler);
		}
	};

	var throttle = 250,
		throttle_handler = function()
		{
			curr = (new Date()).getTime();
			diff = curr - lastCall;

			if(diff >= throttle)
			{
				lastCall = curr;
				$(this).trigger('throttledresize');

			}
			else
			{
				if(heldCall)
				{
					window.clearTimeout(heldCall);
				}

				// Promise a held call will still execute
				heldCall = window.setTimeout(handler, throttle - diff);
			}
		},
		lastCall = 0,
		heldCall,
		curr,
		diff;
	
	// Trigger a custom event:
	function triggerCustomEvent( obj, eventType, event ) {
		var originalType = event.type;
		event.type = eventType;
		$.event.handle.call( obj, event );
		event.type = originalType;
	}
	
	// Correctly bind anything we've overloaded:
	$.each({
		scrollend: 'scrollstart',
		swipeup: 'swipe',
		swiperight: 'swipe',
		swipedown: 'swipe',
		swipeleft: 'swipe'
	}, function(e, srcE) {
		$.event.special[e] =
		{
			setup: function() {
				$(this).bind(srcE, $.noop);
			}
		};
	});
	
}) (jQuery);

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
		yep: [ "/d/_/css/prism.css", "/d/_/js/libs/prism.js" ],
		callback: function( url, res, key ) {
			if ( url === "/d/_/js/libs/prism.js" ) {
				Prism.highlightAll();
			}
		}
	});

};

function funLoad() {

	document.documentElement.className += " secret-state";
	// window.scroll(100,100);

};


$.fn.CommentEditor = function(options) {

        var OPT;

        OPT = $.extend({
                url: "/?ACT=32",
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
								var value = escape(textarea.val()) + '<br>z';
								expander.html(value);
								expander.css('width', textarea.innerWidth() + 2 + 'px');
								textarea.css('height', Math.max(expander.innerHeight(), initialHeight) + 2 + 'px');
						}, 0); // throttle by 100ms 
				}

				// Bind sizer to IE 9+'s input event and Safari's propertychange event
				textarea.on('input.autogrow propertychange.autogrow', sizeTextarea);

				// Set the initial size
				sizeTextarea();

				// Record autogrow applied
				textarea.data('autogrow-applied', true);
				
		};
		
};