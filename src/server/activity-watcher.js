/**
  ActivityWatcher class,
  Collects watch and hook objects, and sends tickets to printers
*/
export class ActivityWatcher {

  /**
    constructor([environment])
    takes in an  environment object, which has the following properties:
      printLogs -> (bool) will print to console.log when events occur
  */
  constructor(environment) {
    this.printers = [];
    this.watches = [];
    this.hooks = [];
    this.env = environment || {};

    this.log = function(log) {
      if (this.env.printLogs) {
        console.log(log)
      }
    }

    this.log("New Activity Watcher Created");
  }

  /**
    addPrinter(printer)
    adds a printer object for watches and hooks to print to
    must have the following properties:
      name -> (string) name of the printer
      printTicket -> (function) function to print ticket object
        printTicket takes in two parameters: ticket, and watch
  */
  addPrinter(printer) {
    this.log(`Adding ${printer.name}`);

    this.printers.push(printer);

    this.log(`Added ${printer.name}`);
  }

  /**
    addWatch(watch, interval)
    adds a watch object for printing tickets at an intervals
    interval -> (integer) how long in ms to check for new tickets
    watch must have the following properties:
      name -> (string) name of the watch
      getTicketObjects -> (function) function to get ticket objects, returns a
        list of new tickets to print
  */
  addWatch(watch, interval) {
    this.log(`Adding ${watch.name}`);

    let setIntervalId = setInterval( () => {
      this.log(`Checking for Tickets from ${watch.name}`);
      let tickets = watch.getTicketObjects();

      this.log(`Recieved ${tickets.length} ticket(s)`);
      tickets.forEach( (ticket) => {
        this.printers.forEach( (printer) => {
          printer.printTicket(ticket, watch);
        });
      });
    }, interval);

    /* add close function to watch to remove the watch interval */
    watch.close = function() {
      clearInterval(setIntervalId);
    }

    this.watches.push(watch);

    this.log(`Added ${watch.name}`);
  }

  /**
    addHook(hook)
    adds a hook object for printing tickets when an event occurs
    TODO: This has yet to be defined
  */
  addHook(hook) {
    this.log(`Adding ${hook.name}`);

    this.hooks.push(hook);

    this.log(`Added ${hook.name}`);
  }

  /**
    reset()
    stops watches from running and removes all watches, hooks, and printers
  */
  reset() {
    this.log("Reseting Activity Watcher");

    /* close each watch */
    this.watches.forEach( (watch) => {
      this.log(`Closing ${watch.name}`)
      watch.close();
    })

    /* reset all the arrays */
    this.printers = [];
    this.watches = [];
    this.hooks = [];

    this.log("Finished Reseting Activity Watcher");
  }
}

export default ActivityWatcher;
