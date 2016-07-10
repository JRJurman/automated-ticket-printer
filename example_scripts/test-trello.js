var ActivityWatcher = require('../dist/ticket-printer').ActivityWatcher;
var TrelloTypes = require('../dist/ticket-printer').TrelloTypes;
var consolePrinter = require('../dist/ticket-printer').consolePrinter;
var trelloWatch = require('../dist/ticket-printer').trelloWatch

trelloWatch.trelloApiKey = process.env.TRELLO_API_KEY;
trelloWatch.trelloToken = process.env.TRELLO_AUTH_TOKEN;
trelloWatch.boardId = process.env.TRELLO_BOARD_ID;

var aw = new ActivityWatcher({printLogs:true}, 
                             {type: TrelloTypes.CARD_ADDED});

aw.addPrinter(consolePrinter);
aw.addWatch(trelloWatch, 5000);
aw.start(1000);

setTimeout(function() {
  aw.reset();
}, 100000)
