/**
  github-watch.js
  Watch that pulls tickets from github
*/

/**
  githubWatch takes in several parameters to build a watch for a given query.

  github: instance of the github api for github.com or an enterprise instance
  e.g. var github = new GithubApi({protocol: "https", host: "api.github.com"});

  query: the search query you want to run against the instance of github.
  This can be the same syntax as the search you would do on the web interface.
  e.g. var query = 'is:open assignee:username'

  startDate: a date object to start loading tickets -- optional
  If a startDate is not provided, the watch will only grab new tickets
  e.g. var startDate = (new Date()).setHours(0,0,0,0) // start of the day
*/
export const githubWatch = function(github, query, startDate) {
  return {
    name: `Github Watch: '${query}'`,

    now: startDate ? startDate : new Date(),

    getTicketObjects: function( printQueue ) {
      var now = this.now;

      // make the call, and run the callback when the tickets are recieved
      const apiTickets = github.search.issues({q: query, sort: 'created'},
        function(err, res) {
          if (err) {
            throw err;
          }
          else {
            // iterate over each ticket, and if they were created after the last
            // check, then add it to the printQueue
            res.items.filter( function (ticket) {
              return ((new Date(ticket.created_at)) >= now);
            }).forEach( function (ticket) {
              const project = ticket.url.split("/").slice(-4,-2).join("/");
              printQueue.unshift({
                watch: 'Github Watch',
                title: ticket.title,
                project: project,
                number: ticket.number,
                body: ticket.body
              });
            });
          }

        }
      );

      // update this.now so we only get new tickets
      this.now = new Date();

    }

  }
}

export default githubWatch;
