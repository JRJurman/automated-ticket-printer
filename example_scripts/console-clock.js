var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var consolePrinter = require('ticket-printer').consolePrinter;
var timeWatch = require('ticket-printer').timeWatch;

var aw = new ActivityWatcher({printLogs:true});
aw.addPrinter(consolePrinter);
aw.addWatch(timeWatch, 5000);
aw.start(1000);

setTimeout(function() {
  aw.reset();
}, 20000)
