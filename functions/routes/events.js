const express = require('express');

module.exports = function (apiRouter, firebaseApp) {

    const router = express.Router({ mergeParams: true });
    
    router.get('/', async (req, res) => {
        const ref = firebaseApp.database().ref('events');

        const snap = await ref.once('value');

        res.json(snap.val());
    });

    apiRouter.use('/events', router);
};