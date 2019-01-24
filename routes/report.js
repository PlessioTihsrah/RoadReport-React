var express = require("express");
var Router = express.Router();
var accReport = "../models/report"

Router.get("/reports", function(req,res){
    if(req.session.isLoggedIn){
        accReport.find({}, 'id date', function(err, reports){
            if(err){
                res.status(502).json({error: "Something went Wrong"});
            } else {
                res.json(reports);
            }
        })
    } else {
        res.status(401).json({error: "Not Logged In"});
}
})

Router.post("/report", function(req,res){
    var name = req.body.first + ' ' + req.body.last;
    var date = currentDate();
    var report = new accReport({
        name : name,
        mobile : req.body.mobile,
        extra : req.body.extra,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        date : date
    });
    report.save(function(err, rep){
        if(err){
            res.json({message: "error"})
        } else {
            res.json({message: 'success'});
        }
    })
    
})

Router.get("/report/:id", function(req,res){
    if(req.session.isLoggedIn){
        accReport.findById(req.params.id, function(err, report){
            if(err || !report){
                res.status(502).json({error: "Something went Wrong"});
            } else {
                res.json(report);
            }
        })
    } else {
        res.status(401).json({error: "Not Logged In"});
}
})

function currentDate(){
    var date = new Date(Date.now());
    var utc = date.getTime() + date.getTimezoneOffset() * 60000;
    var nd = new Date(utc + (3600000*5.5));
    var date = nd.getDate()+'/'+(nd.getMonth()+1)+'/'+ nd.getFullYear() + ' at ' + nd.getHours() + ":" + nd.getMinutes() + ":" + nd.getSeconds();
    return date;
}

module.exports = Router;