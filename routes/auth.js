var express = require("express");
var bcrypt = require("bcrypt");
var Router = express.Router();
var accUser = require("../models/users.js");

Router.get("/info", function(req, res){
    if(req.session.user){
        res.json({
            isLoggedIn: true,
            user: {
                id: req.session.user._id,
                email: req.session.user.email
            }
        })
    } else {
        res.json({
            isLoggedIn: false,
            user: {}
        })
    };
})

Router.post("/login", function(req,res){
    accUser.findOne({email: req.body.email}, function(err, user){
        if(!user || err){
            res.json({
                status: "error",
                message: "Wrong Email"
            });
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err || !result){
                    res.json({
                         status: "error",
                        message: "Wrong Password"
                })
                } else {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    res.json({
                         status: "success",
                         user: {
                             id: user._id,
                             email: user.email
                         }
                    })
                }
            })
        }
    })
})

Router.post("/logout", function(req,res){
    req.session.destroy()
    res.json({message: "ok"});
})

module.exports = Router;