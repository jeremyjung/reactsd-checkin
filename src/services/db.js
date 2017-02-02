const people = [
  {
    id: 1,
    name: 'Jordan Walke',
    email: 'jordan@fake.com',
    checkedIn: false
  },
  {
    id: 2,
    name: 'Michael Jackson',
    email: 'michael@fake.com',
    checkedIn: false
  },
  {
    id: 3,
    name: 'Harry Wolff',
    email: 'harry@fake.com',
    checkedIn: false
  },
  {
    id: 4,
    name: 'Chris Geirman',
    email: 'chris@fake.com',
    checkedIn: true
  }
]

const db = {
  getPeople: function () {
    return people
  },
  findPerson: function (id) {
    return people.find(person => person.id === Number(id))
  },
  findPersonByName: function (name) {
    return people.find(person => person.name === name)
  },
  checkIn: function (id) {
    people.find(person => person.id === id).checkedIn = true
  }
}

export default db
