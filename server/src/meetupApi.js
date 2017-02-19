const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

const apiKey = process.env.MEETUP_API_KEY
const baseUrl = 'https://api.meetup.com'
const meetupGroup = 'ReactSD'
const allMemberDataUrl = path.join(__dirname, '../../output/allMemberData.json')
const allEventDataUrl = path.join(__dirname, '../../output/allEventData.json')
const membersForDbUrl = path.join(__dirname, '../../output/membersForDb.json')

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

function writeToFile(json, filePath) {
  console.log(filePath)
  fs.writeFile(filePath, JSON.stringify(json), (err) => {
    if (err) throw err
    console.log('Finished writing to file')
  })
}

function prepareDataForDb() {
  console.log(__dirname)
  const members = require(allMemberDataUrl)
  console.log('Loaded all members to prep for Db')
  const truncatedMembers = []
  const db = {
    members: truncatedMembers
  }
  members.forEach(member => {
    truncatedMembers.push({
      name: member.name,
      meetup_id: member.id,
      source: 'meetup'
    })
  })

  writeToFile(db, membersForDbUrl)
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
              writeToFile(result, allMemberDataUrl)
            })
}

function getAllEvents() {
  return getMeetupDataInPages(getEventsUrl())
           .then(result => {
              console.log('Got all events')
              writeToFile(result, allEventDataUrl)
           })
}

module.exports = {
  getAllMembers,
  getAllEvents,
  prepareDataForDb
}
