const mongoose = require("mongoose");

const accUserSchema = mongoose.Schema({
        email: String,
        username: String,
        password: String,
        type: String
   });

module.export = mongoose.model("accUser", accUserSchema);