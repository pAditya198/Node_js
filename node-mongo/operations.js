const assert = require('assert');

exports.insertDocumnet = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocumnet = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocumnets = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {
        $set: update
    }, null);
};