var ActivityWatcher = require('../dist/ticket-printer').ActivityWatcher;
var consolePrinter = require('../dist/ticket-printer').consolePrinter;
var trelloWatch = require('../dist/ticket-printer').trelloWatch

trelloWatch.myListId = process.env.TRELLO_LIST_ID;
trelloWatch.trelloApiKey = process.env.TRELLO_API_KEY;
trelloWatch.trelloToken = process.env.TRELLO_AUTH_TOKEN;

console.log(process.env);
console.log(JSON.stringify(trelloWatch));

var aw = new ActivityWatcher({printLogs:true});
aw.addPrinter(consolePrinter);
aw.addWatch(trelloWatch, 5000);
aw.start(1000);

setTimeout(function() {
  aw.reset();
}, 20000)
