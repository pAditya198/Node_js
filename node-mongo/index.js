const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

    console.log("Connected Correctly  to the server");

    const db = client.db(dbname);
    dboper.insertDocumnet(db, {
            name: "vadonut",
            description: "test"
        }, 'dishes')
        .then((result) => {

            console.log('Insert document: \n', result.ops);

            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {

            console.log('Found Documents:\n', docs);
            return dboper.updateDocumnets(db, {
                name: "vadonut"
            }, {
                description: "Updated Test"
            }, 'dishes')
        })
        .then((result) => {

            console.log("Updated Document:\n", result.result);
            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {

            console.log('Found updated Documents:\n', docs);

            return db.dropCollection('dishes')
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);
            return client.close();
        }).catch((err) => console.log(err));
}).catch((err) => console.log(err));