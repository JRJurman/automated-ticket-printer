import { ActivityWatcher } from '../dist/ticket-printer';
import { expect } from 'chai';

describe('ActivityWatcher', () => {

  describe('#constructor', () => {
    let envObject;
    let testActivityWatcher;

    before( () => {
      envObject = new Object();
      testActivityWatcher = new ActivityWatcher(envObject);
    });

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
    let testActivityWatcher;
    let testPrinter;

    before( () => {
      testActivityWatcher = new ActivityWatcher();
      testPrinter = {
        name: 'testPrinter',
        printTicket: () => {}
      };
    });

    it('should add the printer to the printers array', () => {
      testActivityWatcher.addPrinter(testPrinter);
      expect(testActivityWatcher.printers).to.include(testPrinter);
    });

  });

  describe('#addWatch', () => {
    let testActivityWatcher;
    let testWatch;

    before( () => {
      testActivityWatcher = new ActivityWatcher();
      testWatch = {
        name: 'testWatch',
        getTicketObjects: () => {}
      };
    });

    it('should add the watch to the watches array', () => {
      testActivityWatcher.addWatch(testWatch, 1000);
      expect(testActivityWatcher.watches).to.include(testWatch);
    });

  });

  describe('#addHook', () => {
    let testActivityWatcher;
    let testHook;

    before( () => {
      testActivityWatcher = new ActivityWatcher();
      testHook = {
        name: 'testHook'
      };
    });

    it('should add the hook to the hooks array', () => {
      testActivityWatcher.addHook(testHook);
      expect(testActivityWatcher.hooks).to.include(testHook);
    });

  });


});
