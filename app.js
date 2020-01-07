const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController');
const mongoConnection = require('./util/database').mongoConnect;
const User = require('./models/userModel');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/adminRoute');
const shopRoutes = require('./routes/shopRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5e1389631c9d440000f76698')
        .then(user => {
            req.user = new User(user.name, user.email, user.email, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnection(() => {
    app.listen(3000);
});


