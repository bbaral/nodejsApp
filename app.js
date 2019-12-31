const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController');
const sequelize = require('./util/database');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/adminRoute');
const shopRoutes = require('./routes/shopRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync()
    .then(result => {
   return User.findByPk(1);
}).then(user => {
    if (!user) {
        User.create({name: 'Bikram', email: 'test@test.com'});
    }
    return user;
})
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
    console.log(err);
});

