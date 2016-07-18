var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var consolePrinter = require('ticket-printer').consolePrinter;
var githubWatch = require('ticket-printer').githubWatch;

// GITHUB SETUP
var apiOptions = {
  protocol: "https",
  host: "api.github.com",
  headers: {
      "user-agent": "ticket-printer"
  },
};

var auth = {
  type: "basic",
  username: 'your-username-here',
  password: 'your-password-here'
};

var apiCallOptions = {
  user: 'jrjurman',
  repo: 'git-api-test',
  // start of the day, it will then automatically update to only be new tickets
  since: (new Date()).setHours(0,0,0,0)
};

// craft our very own watch
var githubIssuesWatch = githubWatch(apiOptions, auth, 'issues', 'getForRepo', apiCallOptions);

// END GITHUB SETUP

// now setup our ticket printer
var aw = new ActivityWatcher({printLogs:true});
aw.addPrinter(consolePrinter);
// once per minute (60000) is well under the rate limit of 5000
aw.addWatch(githubIssuesWatch, 30000);
aw.start(1000);
