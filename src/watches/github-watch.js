/**
  github-watch.js
  Watch that pulls tickets and PRs from github
*/

import GithubApi from 'github';

/**
  githubWatch takes in several parameters, most of which are based on the node
  api. They are, in order:

  apiOptions: github options -- http vs https, headers, host, etc...
  For more concrete examples, look at:
  https://github.com/mikedeboer/node-github#example

  auth: github authentication -- increases the rate limit to 5000. Can be basic,
  or using a token. For more info, look at:
  https://github.com/mikedeboer/node-github#authentication

  apiAccessor: the property you want information about -- this could be issues,
  PRs, users, orgs, etc... For more info, look at:
  https://mikedeboer.github.io/node-github/

  apiCall: this is the function we are calling on the apiAccessor -- this could
  be getAll, getForRepo, getForUser, getForOrg, etc... For more info, look at:
  https://mikedeboer.github.io/node-github/

  apiCallOptions: this is the object passed into the apiCall. Read above on the
  different parameters those functions take in.
*/
export const githubWatch = function(apiOptions, auth, apiAccessor, apiCall, apiCallOptions) {
  const github = new GithubApi(apiOptions);

  // final watch object
  return {
    name: `Github Watch ${apiAccessor}#${apiCall}`,

    // sometimes the github api supports "since",
    // we want to be able to update this to get only the newest tickets
    now: apiCallOptions.since,

    getTicketObjects: function( printQueue ) {

      // merge the current time with our other options
      const apiCallOptionsSinceNow = Object.assign(apiCallOptions, {since: this.now});

      // make the call, and run the callback when the tickets are recieved
      const apiTickets = github[apiAccessor][apiCall](apiCallOptionsSinceNow,
        function(err, res) {
          if (err) {
            throw err;
          }
          else {
            // iterate over each ticket, and add them to the printQueue
            res.forEach( function (ticket) {
              printQueue.unshift({
                watch: `Github Watch ${apiAccessor}#${apiCall}`,
                title: ticket.title,
                project: ticket.html_url,
                number: ticket.number,
                body: ticket.body
              });
            });
          }

        }
      );

      // update this.now
      this.now = new Date();

    }

  }

}

export default githubWatch;
