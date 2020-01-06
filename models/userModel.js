const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, _id) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDB();
        return db.collection('users')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

    }

    static findUserById(userId) {
        const db = getDB();
        return db.collection('users').findOne({_id: new ObjectId(userId)});
    }
}


module.exports = User;
