import { ActivityWatcher, consolePrinter } from '../dist/ticket-printer';
import chai, { expect } from 'chai';
import spies from 'chai-spies'

/* include spies in chai setup, to check if functions get called */
chai.use(spies);

function lastCallOf(spy) {
  return spy.__spy.calls[spy.__spy.calls.length - 1][0];
}

describe('ConsolePrinter', () => {

  const ticket = {
    watch: 'test watch',
    title: "Test Title",
    project: "Test Project",
    number: "0",
    body: "Test Body"
  }

  describe('#printTicket', () => {

    it('should print to the console log', () => {
      let printerSpy = chai.spy.on(console, 'log');

      consolePrinter.printTicket(ticket);
      expect(printerSpy).to.be.called.once;
    });

    it('should print a ticket to the console log', () => {
      let printerSpy = chai.spy.on(console, 'log');

      consolePrinter.printTicket(ticket);
      let terminalTape = lastCallOf(printerSpy)
      expect(terminalTape).to.contain(ticket.watch);
      expect(terminalTape).to.contain(ticket.title);
      expect(terminalTape).to.contain(ticket.project);
      expect(terminalTape).to.contain(ticket.number);
      expect(terminalTape).to.contain(ticket.body);
    });

  });

});
