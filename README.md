# Ticket Printer
This project is an automated solution to print tickets and items as they get
assigned.

## System Design
This project uses a combination of `watches`, `hooks`, and `printers` to get  
and print tickets at either a time interval, or on tiggered events.

### `ActivityWatcher`
The `ActivityWatcher` is the server that collects `watches`, `hooks`, and `printers`  
and acts as a mediator. `watches` and `hooks` do not need to know how they will be  
printed, and `printers` do not need to know how to get new tickets, or who to get  
them from.

#### `#constructor([environment])`
Builds the `ActivityWatcher` object, and can take in an environment variable for  
specific settings when running.

```javascript
var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var aw = new ActivityWatcher({printLogs:true});
```

#### `#addPrinter(printer)`
Adds a printer object for watches and hooks to print to. You can use a bundled printer  
or you can write your own printer (look at `printers` section).

```javascript
var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var consolePrinter = require('ticket-printer').consolePrinter;

var aw = new ActivityWatcher();
aw.addPrinter(consolePrinter);
```

#### `#addWatch(watch, interval)`
Adds a watch object for printing tickets at an intervals. This is useful if you can not  
add your own hooks to a project or organization. The interval is an integer in ms to check  
for new tickets from the watch. You can use a bundled watch or you can write your own  
watch (look at `watches` section).

```javascript
var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var timeWatch = require('ticket-printer').timeWatch;

var aw = new ActivityWatcher();
aw.addWatch(timeWatch, 1000);
```

#### `addHook(hook)`
Adds a hook object for printing tickets when an event occurs.  
**TODO: This has yet to be defined**

#### `reset()`
Stops watches from running and removes all watches, hooks, and printers.

```javascript
var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var timeWatch = require('ticket-printer').timeWatch;

var aw = new ActivityWatcher();
aw.addWatch(timeWatch, 1000);
aw.watches; // -> [ timeWatch ]

aw.reset();
aw.watches; // -> []
```
