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
