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
TICKET: ${ticket.title} #${ticket.number}

${ticket.body}
=================Ticket-End=================
`;

    // split and re-merge the lines by a specific number of characters
    const width = 44;

    // split the lines by newline, and create a new list of lines,
    const finalPrintOut = ticketPrintOut.split('\n').reduce( function(finalLines, currentLine) {

      // split the current line by a given width,
      const splitLines = currentLine.match(new RegExp(`.{1,${width}}`, 'g'));

      // and re-join them into the final lines
      return finalLines.concat(splitLines);

    }, []).join('\n');

    // printing the ticket
    console.log(finalPrintOut);
  }
};

export default consolePrinter;
