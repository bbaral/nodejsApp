const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect("mongodb+srv://bbaral:bbaral1@nodejsapp-qvxp0.mongodb.net/shop?retryWrites=true&w=majority")
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
