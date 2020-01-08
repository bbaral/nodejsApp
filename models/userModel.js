const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, _id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = _id;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        console.log(this);
        const cartProductIndex = this.cart.items.findIndex(cp => {
                return cp.productId.toString() === product._id.toString();
            });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        console.log(updatedCartItems);
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity});
        }

        const updatedCart = {items: updatedCartItems};
        const db = getDB();
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: updatedCart}})
    }

    getCart() {
        const db = getDB();
        const ProductsId = this.cart.items.map(mapper => {
            return mapper.productId;
        });
        return db.collection('products')
            .find({_id: {$in: ProductsId}}).toArray()
            .then(prd => {
                return prd.map(p => {
                    return {...p, quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                })
            })
            .catch(err => console.log(err));
    }

    static findById(userId) {
        const db = getDB();
        return db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;
