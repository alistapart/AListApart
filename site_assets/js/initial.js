(function( win, undefined ){

	var doc = window.document,
		docElem = doc.documentElement,
		head = doc.head || doc.getElementsByTagName( "head" )[ 0 ],
		initialJS = win.document.getElementById( "initial-js" ),
		// this references a meta tag's name whose content attribute should define the path to the full CSS file for the site
		fullCSSKey = "fullCSS";

	// getMeta function: get a meta tag by name
	// NOTE: meta tag must be in the HTML source before this script is included in order to guarantee it'll be found
	function getMeta( metaname ){
		var metas = window.document.getElementsByTagName( "meta" );
		var meta;
		for( var i = 0; i < metas.length; i ++ ){
			if( metas[ i ].name && metas[ i ].name === metaname ){
				meta = metas[ i ];
				break;
			}
		}
		return meta;
	}

	// simple load JS function
	function loadJS( src ){
		if( initialJS && initialJS.parentNode ) {
			var script = win.document.createElement( "script" );
			script.src= src;
			initialJS.parentNode.insertBefore( script, initialJS );
		} else {
			window.setTimeout(function() {
				loadJS( src );
			}, 15);
		}
	}

	// loadCSS: load a CSS file asynchronously. Included from https://github.com/filamentgroup/loadCSS/
	function loadCSS( href, before, media ){
		var ss = window.document.createElement( "link" );
		var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily, set media to something non-matching to ensure it'll fetch without blocking render
		ss.media = "only x";
		// inject link
		ref.parentNode.insertBefore( ss, ref );
		// set media back to `all` so that the styleshet applies once it loads
		setTimeout( function(){
			ss.media = media || "all";
		} );
		return ss;
	}

	// cookie function from https://github.com/filamentgroup/cookie/
	function cookie( name, value, days ){
		// if value is undefined, get the cookie value
		if ( value === undefined ) {
			var cookiestring = "; " + window.document.cookie;
			var cookies = cookiestring.split( "; " + name + "=" );
			if ( cookies.length === 2 ) {
				return cookies.pop().split( ";" ).shift();
			}
			return null;
		} else {
			var expires;
			// if value is a false boolean, we'll treat that as a delete
			if ( value === false ) {
				days = -1;
			}
			if ( days ) {
				var date = new Date();
				date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
				expires = "; expires="+date.toGMTString();
			} else {
				expires = "";
			}
			window.document.cookie = name + "=" + value + expires + "; path=/";
		}
	}

	// Mustard cuttin’.
	if ( !( "querySelector" in document
			&& "addEventListener" in window
			&& "getComputedStyle" in window
		) ) {
		return;
	}

	var fullCSS = getMeta( fullCSSKey );
	if ( fullCSS && !cookie( fullCSSKey ) ){
		loadCSS( fullCSS.content );
		// set cookie to mark this file fetched
		cookie( fullCSSKey, "true", 7 );
	}

	// Get scripts to load, if defined
	if ( initialJS ) {
		var enhancedScripting = initialJS.getAttribute( "data-enhance" );
		// Load JS files
		if( enhancedScripting ){
			loadJS( enhancedScripting );
		}
		cookie( "fullJS", "true", 7 );
	}

}( this ));
