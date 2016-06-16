var ActivityWatcher = require('../dist/ticket-printer').ActivityWatcher;
var consolePrinter = require('../dist/ticket-printer').consolePrinter;
var timeWatch = require('../dist/ticket-printer').timeWatch;

var aw = new ActivityWatcher({printLogs:true});
aw.addPrinter(consolePrinter);
aw.addWatch(timeWatch, 5000);

setTimeout(() => {
  aw.reset();
}, 40000)
