var express = require('express');
var bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('')
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
        res.end('Will add the dish : ' + req.body.name + ' with details : ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the dishes');
    });
dishRouter.route('/:dishId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", 'text/plain');
        next();

    }).get((req, res, next) => {
        res.end('Will send details of the dishes : ' + req.params.dishId + ' to you !');
    }).post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation supported for /dishes/' + req.params.dishId);
    }).put((req, res, next) => {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end("will Update the dish: " + req.body.name + ' with details ' +
            req.body.description);
    }).delete((req, res, next) => {
        res.end('Deleting the dish: ' + req.params.dishId);
    });

module.exports = dishRouter;