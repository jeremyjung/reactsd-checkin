const db = require('../services/db')

//Two years later and firebase still doesn't close the node.js connection
//http://stackoverflow.com/questions/27641764/how-to-destroy-firebase-ref-in-node
db.getAllMembers().then(result => {
  console.log(result)
  debugger
  process.exit()
})

