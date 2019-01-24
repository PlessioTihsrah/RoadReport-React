const express = require("express"),
        app = express(),
        mongoose = require("mongoose"),
        session = require("express-session"),
        bodyParser = require("body-parser"),
        dbstore = require("connect-mongodb-session")(session),
        path = require("path"),
        reportRoutes = require("./routes/report"),
        authRoutes = require("./routes/auth");
        
    mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
    var store = new dbstore({
         uri: process.env.DATABASEURL,
         collection: process.env.COLLECTION
        });
        
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
        })
    )
    
app.use(bodyParser.urlencoded({extended: true}));

app.use(authRoutes);
app.use(reportRoutes);
app.use(express.static('build'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.listen(process.env.PORT, process.env.IP);