const path = require('path');
const fs = require('fs');
const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');

const ROUTES_PATH = './routes';

const firebaseConfig = {
    apiKey: "AIzaSyC0JAt1c5xin7-uhb1mIPn_G5embdb94tM",
    authDomain: "classhack-2019.firebaseapp.com",
    databaseURL: "https://classhack-2019.firebaseio.com",
    projectId: "classhack-2019",
    storageBucket: "classhack-2019.appspot.com",
    messagingSenderId: "262878608279",
    appId: "1:262878608279:web:1d61ed6f8b33c7a4"
  };

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);
 
const app = express();
app.use(express.json());
app.use(require('express-edge'));
app.set('views', './views');

app.get('/', (request, response) => {
    response.render('index', {});
});

const apiRouter = express.Router({ mergeParams: true });

app.use('/api', apiRouter);

['events'].forEach(route => {
    require(path.join(__dirname, ROUTES_PATH, route))(apiRouter, firebaseApp);
});

exports.app = functions.https.onRequest(app);
