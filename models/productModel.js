const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
    constructor(title, price, description, imageUrl, _id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = _id ? new mongodb.ObjectId(_id): null;
        this.userId = userId;
    }

    save() {
        const db = getDB();
        let dbOperation;
        if (this._id) {
            //update the product
            dbOperation = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOperation = db.collection('products').insertOne(this);
        }
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('products')
            .find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDB();
        return db.collection('products')
            .find({_id: new mongodb.ObjectId(prodId)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDB();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then(result => {
                console.log('1 Object deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Product;
