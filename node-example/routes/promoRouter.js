var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send it to you!');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('The PUT operation is not supported');
    })
    .post((req, res, next) => {
        res.end('Will add the promotion : ' + req.body.name + ' with details : ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the promotions');
    });
promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/plain');
        next();

    }).get((req, res, next) => {
        res.end('Will send details of the Promotion : ' + req.params.promoId + ' to you !');
    }).post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation supported for /promotions/' + req.params.promoId);
    }).put((req, res, next) => {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end("will Update the promotion: " + req.body.name + ' with details ' +
            req.body.description);
    }).delete((req, res, next) => {
        res.end('Deleting the promotion: ' + req.params.promoId);
    });

module.exports = promoRouter;