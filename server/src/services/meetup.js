const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

const apiKey = process.env.MEETUP_API_KEY
const baseUrl = 'https://api.meetup.com'
const meetupGroup = 'ReactSD'

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

function didMemberRsvp(rsvps, member_id) {
  member_rsvp = rsvps.find(rsvp => rsvp.member.member_id == member_id)
  if (member_rsvp && member_rsvp.response === 'yes') return true
  return false
}

function getJsonFromUrl(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json)
}

function getMeetupDataInPages(url, results = []) {

  return getJsonFromUrl(url)
            .then(json => {
              results = results.concat(json.results)
              console.log(`Got ${results.length} records`)
              if (!json.meta.next)
                return results
              else
                return getMeetupDataInPages(json.meta.next, results)
            })
}

function getAllEvents() {
  return getMeetupDataInPages(getEventsUrl())
}

function getRSVPsForEvent(eventId) {
  return getMeetupDataInPages(getRSVPsUrl(eventId))
}

exports.getAllMembers = function() {
  return getMeetupDataInPages(getMembersUrl())
}

exports.getRSVPsForCurrentEvent = function() {
  return getAllEvents()
           .then(events => getRSVPsForEvent(events[0].id))
           .then(rsvps => rsvps.filter((rsvp) => rsvp.response === 'yes'))
           .then(rsvpsPositive => rsvpsPositive.map((rsvpPositive) => rsvpPositive.member.member_id))
}
