const firebase = require("firebase-admin");

const serviceAccount = require(process.env.FIREBASE_ADMIN_API_PATH);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://reactsd-check-in.firebaseio.com"
});

module.exports = {
  firebase
}
