/**
  consolePrinter.js
  Printer object that prints to the console
*/
export const consolePrinter = {

  /* name of the printer */
  name: "Console Printer",

  /* printTicket function to display the ticket */
  printTicket: function(ticket) {
    const ticketPrintOut = `
    ================Ticket-Start================
    WATCH: ${ticket.watch}
    PROJECT: ${ticket.project}
    TICKET: ${ticket.title} ${ticket.number}

    ${ticket.body}
    =================Ticket-End=================
    `;
    console.log(ticketPrintOut);
  }
};

export default consolePrinter;
