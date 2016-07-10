/**
  trello-watch.js
  Watch trello ticket assignments for a given board
*/

var Trello = require("trello");

export const trelloWatch = {
  name: 'Trello Watch',
  numCards: undefined,

  getTicketObjects: function() {

    var trello = new Trello(this.trelloApiKey, this.trelloToken);

		trello.getCardsOnBoard(this.boardId, function(error, trelloCards) {
      var numFreshCards = 0;

      if(error) {
        console.log(error);
      }

			trelloCards.forEach(function(card) {
        numFreshCards++; 
      });

			console.log('numcards:', this.numCards);
			console.log('fresh:', numFreshCards);
			
			if(!this.numCards) {
				this.numCards = numFreshCards;
			}

			else if(numFreshCards > this.numCards) {
				//TODO: Establish actual criterion for printing
				console.log('A new card has been added');
			}
	  }.bind(this))
  }
};

export default trelloWatch;
