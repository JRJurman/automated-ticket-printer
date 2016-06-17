import { ActivityWatcher, timeWatch } from '../dist/ticket-printer';
import { expect } from 'chai';
import lolex from 'lolex';

/* hacking time with lolex */
let clock = lolex.install();

describe('TimeWatch', () => {

  describe('#getTicketObjects', () => {

    it('should return a ticket with the current time', () => {
      const rightNow = (new Date()).toLocaleTimeString();
      const ticket = timeWatch.getTicketObjects()[0];
      expect(ticket.body).to.equal(`The current time is ${rightNow}`)
    });

    it('should return a ticket with a title, project, number, and body', () => {
      const ticket = timeWatch.getTicketObjects()[0];
      expect(ticket.title).to.exist;
      expect(ticket.project).to.exist;
      expect(ticket.number).to.exist;
      expect(ticket.body).to.exist;
    });

  });

});
