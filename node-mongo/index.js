const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log("Connected Correctly  to the server")

    const db = client.db(dbname);
    dboper.insertDocumnet(db, {
        name: "vadonut",
        description: "test"
    }, 'dishes', (result) => {

        console.log('Insert document: \n', result.ops);

        dboper.findDocumnets(db, 'dishes', (docs) => {

            console.log('Found Documents:\n', docs);
            dboper.updateDocumnets(db, {
                name: "vadonut"
            }, {
                description: "Updated Test"
            }, 'dishes', (result) => {

                console.log("Updated Document:\n", result.result);
                dboper.findDocumnets(db, 'dishes', (docs) => {

                    console.log('Found updated Documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    })
                })
            })

        })

    })
});