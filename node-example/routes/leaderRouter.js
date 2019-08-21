var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const LeaderRouter = express.Router();
LeaderRouter.use(bodyParser.json());
LeaderRouter.route('')
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
        res.end('Will add the Leader : ' + req.body.name + ' with details : ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the Leaders');
    });
LeaderRouter.route('/:LeaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/plain');
        next();

    }).get((req, res, next) => {
        res.end('Will send details of the Leader : ' + req.params.LeaderId + ' to you !');
    }).post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation supported for /Leaders/' + req.params.LeaderId);
    }).put((req, res, next) => {
        res.write('Updating the Leader: ' + req.params.LeaderId + '\n');
        res.end("will Update the Leader: " + req.body.name + ' with details ' +
            req.body.description);
    }).delete((req, res, next) => {
        res.end('Deleting the Leader: ' + req.params.LeaderId);
    });

module.exports = LeaderRouter;