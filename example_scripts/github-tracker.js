var ActivityWatcher = require('ticket-printer').ActivityWatcher;
var consolePrinter = require('ticket-printer').consolePrinter;
var githubWatch = require('ticket-printer').githubWatch;

// GITHUB SETUP
var GithubApi = require('github');

// github api options. Can point to github.com or an enterprise github instance.
// For more options, look at:
// https://github.com/mikedeboer/node-github#example
var apiOptions = {
  protocol: "https",
  host: "api.github.com",
  headers: {
    "user-agent": "ticket-printer"
  },
};
var github = new GithubApi(apiOptions);

// github authentication. Can be basic or a token. For more info, look at:
// https://github.com/mikedeboer/node-github#authentication
// required for looking at private repos, or doing more than 10 hits per minute

// var auth = {
//   type: "basic",
//   username: 'username',
//   password: 'password'
// };
// github.authenticate(auth);

// END GITHUB SETUP

// make our watch with our query
var query = 'is:open assignee:username';
var startOfDay = (new Date()).setHours(0,0,0,0);
var githubAssignments = githubWatch(github, query, startOfDay);


// now setup our ticket printer
var aw = new ActivityWatcher({printLogs:true});
aw.addPrinter(consolePrinter);
aw.addWatch(githubAssignments, 10000); // 6 times per minute
aw.start(1000);
