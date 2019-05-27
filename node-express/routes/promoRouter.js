const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/plain');
        next();
    })


    .get((req, res, next) => {
        res.end('Will send all the promotions to you!');
    })

    .post((req, res, next) => {
        res.end('Will add the dish : ' + req.body.name + ' with details : ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation supported for dishes');

    })

    .delete((req, res, next) => {
        res.end('Deleting all the promotions');
    });



module.exports = promoRouter;