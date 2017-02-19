const meetupApi = require('../meetupApi')
const eventId = process.argv[2]
if (eventId > 0) meetupApi.getRSVPsForEvent(eventId)
else console.log('You need to pass in an Event ID as an argument')
