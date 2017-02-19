const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

const apiKey = process.env.MEETUP_API_KEY
const baseUrl = 'https://api.meetup.com'
const meetupGroup = 'ReactSD'
const allMemberDataPath = path.join(__dirname, '../../output/allMemberData.json')
const allEventDataPath = path.join(__dirname, '../../output/allEventData.json')
const rsvpsForEventPath = path.join(__dirname, '../../output/rsvpsForEvent.json')
const pathForFirebaseImport = path.join(__dirname, '../../output/firebaseDb.json')

function appendParametersToUrl(queryUrl, params = {}) {
  let queryString = url.format({ query: params })
  return queryUrl + queryString
}

function getMembersUrl() {
  const queryUrl = `${baseUrl}/2/members`
  const params = {
    group_urlname: meetupGroup,
    key: apiKey
  }
  return appendParametersToUrl(queryUrl, params)
}

function getEventsUrl() {
  const queryUrl = `${baseUrl}/2/events`
  const params = {
    group_urlname: meetupGroup,
    key: apiKey
  }
  return appendParametersToUrl(queryUrl, params)
}

function getRSVPsUrl(eventId) {
  const queryUrl = `${baseUrl}/2/rsvps`
  const params = {
    event_id: eventId,
    key: apiKey
  }
  return appendParametersToUrl(queryUrl, params)
}

function writeToFile(json, filePath) {
  console.log(filePath)
  fs.writeFile(filePath, JSON.stringify(json), (err) => {
    if (err) throw err
    console.log('Finished writing to file')
  })
}

function prepareDataForDb() {
  console.log(__dirname)
  const members = require(allMemberDataPath)
  const events = require(allEventDataPath)
  console.log('Loaded all members to prep for Db')
  const truncatedMembers = []
  const truncatedEvents = []
  const db = {
    members: truncatedMembers,
    events: truncatedEvents
  }
  members.forEach(member => {
    truncatedMembers.push({
      name: member.name,
      meetup_id: member.id,
      source: 'meetup'
    })
  })
  events.forEach(event => {
    if (event.announced) {
      truncatedEvents.push({
        name: event.name,
        meetup_id: event.id
      })
    }
  })

  writeToFile(db, pathForFirebaseImport )
}

function getJson(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json)
}

function getMeetupDataInPages(url, results = []) {

  return getJson(url)
            .then(json => {
              results = results.concat(json.results)
              console.log(`Got ${results.length} records`)
              if (!json.meta.next)
                return results
              else
                return getMeetupDataInPages(json.meta.next, results)
            })
}

function getAllMembers() {
  return getMeetupDataInPages(getMembersUrl())
            .then(result => {
              console.log('Got all members')
              writeToFile(result, allMemberDataPath)
            })
}

function getAllEvents() {
  return getMeetupDataInPages(getEventsUrl())
           .then(result => {
              console.log('Got all events')
              writeToFile(result, allEventDataPath)
           })
}

function getRSVPsForEvent(eventId) {
  return getMeetupDataInPages(getRSVPsUrl(eventId))
           .then(result => {
              console.log('Got all RSVPs')
              writeToFile(result, rsvpsForEventPath)
           })
}

module.exports = {
  getAllMembers,
  getAllEvents,
  getRSVPsForEvent,
  prepareDataForDb
}
