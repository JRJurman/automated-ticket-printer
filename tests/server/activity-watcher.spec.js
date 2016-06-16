import { ActivityWatcher } from '../dist/ticket-printer';
import chai, { expect } from 'chai';
import spies from 'chai-spies'
import lolex from 'lolex';

/* include spies in chai setup, to check if functions get called */
chai.use(spies);

/* hacking time with lolex */
let clock = lolex.install();


describe('ActivityWatcher', () => {
  let testActivityWatcher;

  /* setup test watch */
  const testWatch = {
    name: 'testWatch',
    getTicketObjects: function() {
      return [{
        title: "Test Title",
        project: "Test Project",
        number: "0",
        body: "Test Body"
      }];
    }
  };

  /* setup test printer */
  const testPrinter = {
    name: 'testPrinter',
    printTicket: () => {}
  };

  /* setup test hook */
  const testHook = {
    name: 'testHook',
    printTicket: () => {}
  }

  describe('#constructor', () => {
    let envObject;

    beforeEach( () => {
      envObject = new Object();
      testActivityWatcher = new ActivityWatcher(envObject);
    });

    afterEach( () => {
      testActivityWatcher.reset();
    })

    it('should pass an environment variable', () => {
      expect(testActivityWatcher.env).to.equal(envObject);
    });

    it('should initialize empty watches array', () => {
      expect(testActivityWatcher.watches).to.be.empty;
    });

    it('should initialize empty hooks array', () => {
      expect(testActivityWatcher.watches).to.be.empty;
    });

    it('should initialize empty printers array', () => {
      expect(testActivityWatcher.watches).to.be.empty;
    });

  });

  describe('#addPrinter', () => {

    beforeEach( () => {
      testActivityWatcher = new ActivityWatcher();
    });

    afterEach( () => {
      testActivityWatcher.reset();
    });

    it('should add the printer to the printers array', () => {
      testActivityWatcher.addPrinter(testPrinter);

      expect(testActivityWatcher.printers).to.include(testPrinter);
    });

    it('should print when a watch is added and triggered', () => {
      let printerSpy = chai.spy.on(testPrinter, 'printTicket');
      testActivityWatcher.addWatch(testWatch, 1000);
      testActivityWatcher.addPrinter(testPrinter);

      clock.tick(1000);
      expect(printerSpy).to.have.been.called;
    });

    it('should print a ticket when a watch is added and triggered', () => {
      let printerSpy = chai.spy.on(testPrinter, 'printTicket');
      testActivityWatcher.addWatch(testWatch, 1000);
      testActivityWatcher.addPrinter(testPrinter);

      let ticket = testWatch.getTicketObjects()[0];
      clock.tick(1000);
      expect(printerSpy).to.have.been.called.with(ticket);
    });

    it('should print multiple times with multiple watches', () => {
      let testWatch2 = Object.assign({}, testWatch);
      testWatch2.name = "testWatch2";
      let printerSpy = chai.spy.on(testPrinter, 'printTicket');
      testActivityWatcher.addWatch(testWatch, 1000);
      testActivityWatcher.addPrinter(testPrinter);

      let ticket = testWatch.getTicketObjects()[0];
      let ticket2 = testWatch2.getTicketObjects()[0];
      clock.tick(1000);
      expect(printerSpy).to.have.been.called.with(ticket).once;
      expect(printerSpy).to.have.been.called.with(ticket2).once;
    });

  });

  describe('#addWatch', () => {

    beforeEach( () => {
      testActivityWatcher = new ActivityWatcher();
    });

    afterEach( () => {
      testActivityWatcher.reset();
    });

    it('should add the watch to the watches array', () => {
      testActivityWatcher.addWatch(testWatch, 1000);

      expect(testActivityWatcher.watches).to.include(testWatch);
    });

    it('should not ask for a ticket before 1000ms', () => {
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);

      clock.tick(999);
      expect(watchSpy).to.not.have.been.called;
    });

    it('should ask for a ticket at 1000ms', () => {
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);

      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
    });

    it('should continue to ask for tickets after 1000ms', () => {
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);

      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
      clock.tick(1000);
      expect(watchSpy).to.have.been.called.twice;
    });

    it('should ask for tickets from multiple watches', () => {
      let testWatch2 = Object.assign({}, testWatch);
      testWatch2.name = "testWatch2";
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      let watchSpy2 = chai.spy.on(testWatch2, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);
      testActivityWatcher.addWatch(testWatch2, 1000);

      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
      expect(watchSpy2).to.have.been.called.once;
    });

    it('should ask for tickets from multiple watches at different intervals', () => {
      let testWatch2 = Object.assign({}, testWatch);
      testWatch2.name = "testWatch2";
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      let watchSpy2 = chai.spy.on(testWatch2, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);
      testActivityWatcher.addWatch(testWatch2, 500);

      clock.tick(500);
      expect(watchSpy).to.not.have.been.called;
      expect(watchSpy2).to.have.been.called.once;

      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
      expect(watchSpy2).to.have.been.called.exactly(3);
    });

  });

  describe('#addHook', () => {

    beforeEach( () => {
      testActivityWatcher = new ActivityWatcher();
    });

    afterEach( () => {
      testActivityWatcher.reset();
    });

    it('should add the hook to the hooks array', () => {
      testActivityWatcher.addHook(testHook);

      expect(testActivityWatcher.hooks).to.include(testHook);
    });

  });

  describe('#reset', () => {

    beforeEach( () => {
      testActivityWatcher = new ActivityWatcher();
    });

    afterEach( () => {
      testActivityWatcher.reset();
    });

    it('should stop getting tickets from watches', () => {
      let watchSpy = chai.spy.on(testWatch, 'getTicketObjects');
      testActivityWatcher.addWatch(testWatch, 1000);

      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
      testActivityWatcher.reset();
      clock.tick(1000);
      expect(watchSpy).to.have.been.called.once;
    });

  });


});
