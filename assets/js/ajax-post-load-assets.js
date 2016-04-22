/**
 * Post load actions: 
 * Functions in ajax-functions.js
 */

var attr = $('.minutiae-block.translation-block').attr("data-loaded");
if (typeof attr !== typeof undefined && attr !== false) {
	console.log("data-loaded att exists");
}
//  //post load parts of the page to bypass cloudflare caching
// AlaPostLoad.loadTranslations();