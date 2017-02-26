const db = require('./services/db')
const meetup = require('./services/meetup')

function meetupSync() {
  meetup.getAllMembers()
        .then(members => db.importMeetupMembers(members))
}

meetupSync()
