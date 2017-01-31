const people = [
  {
    id: 1,
    name: 'Jordan Walke',
    checkedIn: false
  },
  {
    id: 2,
    name: 'Michael Jackson',
    checkedIn: false
  },
  {
    id: 3,
    name: 'Harry Wolff',
    checkedIn: false
  },
  {
    id: 4,
    name: 'Chris Geirman',
    checkedIn: true
  }
]

const db = {
  getPeople: function () {
    return people
  },
  checkIn: function (id) {
    people.find(person => person.id === id).checkedIn = true
  }
}

export default db
