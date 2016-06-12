/**
  consolePrinter.js
  Printer object that prints to the console
*/
export const consolePrinter = {

  /* name of the printer */
  name: "Console Printer",

  /* printTicket function to display the ticket */
  printTicket: function(ticket, watch) {
    const ticketPrintOut = `\n
    ================Ticket-Start================\n
    WATCH: ${watch.name}\n
    PROJECT: ${ticket.project}\n
    TICKET: ${ticket.title} #${ticket.number}\n
    \n
    ${ticket.body}\n
    =================Ticket-End=================\n
    `;
    console.log(ticketPrintOut);
  }
};

export default consolePrinter;
