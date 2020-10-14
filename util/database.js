const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect("******")
        .then(client => {
            _db = client.db();
            callback();
            console.log('Connected!!');
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
