var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

const port = 3000;
const hostname = 'localhost';
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/dishes/:dishID', dishRouter);
app.use('/promotions', promoRouter);
app.use('/promotions/:promoID', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderID', leaderRouter);

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><H1>Welcome to express server</H1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})