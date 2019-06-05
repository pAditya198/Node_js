const assert = require('assert');

exports.insertDocumnet = (db, document, collection, callback) => {

    const coll = db.collection(collection);
    coll.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the " + collection);
        callback(result);
    });

};
exports.findDocumnets = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, doc) => {
        assert.equal(err, null);
        callback(doc);
    })

};
exports.removeDocumnet = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result)
    })

};
exports.updateDocumnets = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {
        $set: update
    }, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result)
    })
};