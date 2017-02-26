const firebase = require('../firebase').firebase

const db = firebase.database()

function firebaseQuery(dbPath) {
  return new Promise((resolve, reject) => {
    db.ref(dbPath).once('value', (data) => resolve(data.val()),
                                 (err) => reject(err))
  })
}

exports.getAllMembers = function() {
  return firebaseQuery('members')
}

exports.getAllEvents = function() {
  return firebaseQuery('events')
}

exports.getAllRSVPs = function() {
  return firebaseQuery('rsvps')
}

exports.getRSVPsForEvent = function(eventId) {
  return firebaseQuery(`rsvps/${eventId}`)
}

exports.getAllEmails = function() {
  return firebaseQuery('emails')
}
