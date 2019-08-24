const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);
 
const app = express();
app.use(require('express-edge'));
app.set('views', './views');

app.get('/', function (request, response) {
    response.render('index', {});
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
