		
		postscribe('#job-board-target', '<h4>Job Board</h4><script src="https://weworkremotely.com/jobs/random.js"><\/script><p class="board-link">Job listings via <a href="https://weworkremotely.com/?source=ala">We Work Remotely</a></p>');
        postscribe('#deck-target', '<div class="deck-inner"><script src=http://www.northmay.com/deck/deckAL_js.php?' + (new Date().getTime()) + '><\/script><p><a href="http://www.coudal.com/deck/">Ad via The Deck</a></p></div>', {
	            error: function(e) {
	                console.log(e);
<<<<<<< HEAD
=======
	            },
	            done: function() {
	                console.info('the deck script has been delivered.');
>>>>>>> components
	            }
	        });
 