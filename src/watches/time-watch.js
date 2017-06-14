/**
  time-watch.js
  Example watch that returns a ticket with the time
*/
export const timeWatch = {
  name: "Time Watch",

  // extra variable for incrementing the ticket numbers (not required)
  counter: 0,

  getTicketObjects: function( printQueue ) {
    const time = (new Date()).toLocaleTimeString();
    this.counter += 1;

    // list of tickets to return
    printQueue.unshift({
      watch: "Time Watch",
      title: "TIME-WATCH",
      project: "TIME",
      number: `${this.counter}`,
      body: `The current time is ${time}`
    });

  }
};

export default timeWatch;
