const firebase = require('../firebase').firebase
const meetup = require('./meetup')

const db = firebase.database()

function firebaseQuery(dbPath) {
  return new Promise((resolve, reject) => {
    db.ref(dbPath).once('value', (data) => resolve(data.val()),
                                 (err) => reject(err))
  })
}

function firebasePush(dbPath, data) {
  return db.ref(dbPath).push(data)
}

function firebaseSet(dbPath, data) {
  return db.ref(dbPath).set(data)
}

function firebaseUpdate(dbPath, data) {
  db.ref(dbPath).update(data)
}

exports.getAllMembers = function() {
  return firebaseQuery('members')
}

exports.getAllProtectedMemberData = function() {
  return firebaseQuery('protectedMembers')
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

exports.importMeetupMembers = function (meetupMembers) {
  firebaseSet('/members', {})
  firebaseSet('/protectedMembers', {})

  return meetup.getRSVPsForCurrentEvent()
    .then(memberIdsWithRSVP => {
      return meetupMembers.map(member => {
        const memberToPush = {
          name: member.name,
          rsvp: memberIdsWithRSVP[member.id] === true
        }
        result = firebasePush('/members', memberToPush)
        memberToPush.key = result.key

        firebaseSet(`/protectedMembers/${result.key}`, {
          meetupId: member.id,
          meetupJoined: member.joined
        })

        return memberToPush
    })
  })
}
