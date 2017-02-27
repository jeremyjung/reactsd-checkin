const db = require('./services/db')
const meetup = require('./services/meetup')

function meetupSync() {
  meetup.getAllMembers()
        .then(members => db.importMeetupMembers(members))
        .then(result => console.log(`Finished importing ${result.length} members`))
}

meetupSync()
