/**
  time-watch.js
  Example watch that returns a ticket with the time
*/
export const timeWatch = {
  name: "Time Watch",
  getTicketObjects: function() {
    const time = (new Date()).toLocaleTimeString();
    return [{
      title: "THE TIME",
      project: "LIFE",
      number: "0",
      body: `The current time is ${time}`
    }];
  }
};

export default timeWatch;
