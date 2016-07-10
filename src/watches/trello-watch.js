/**
  trello-watch.js
  Watch trello ticket assignments for a given user 
*/

var Trello = require("trello");

export const trelloWatch = {
  name: 'Trello Watch',

  getTicketObjects: function() {
		
    var trello = new Trello(this.trelloApiKey, this.trelloToken);
	 
		trello.addCard('Clean car', 'Wax on, wax off', this.myListId,
			function (error, trelloCard) {
			if (error) {
				console.log('Could not add card:', error);
			}
			else {
				console.log('Added card:', trelloCard);
			}
		});  
  }

};

export default trelloWatch;
