const mongoose = require("mongoose");
const accReportSchema = mongoose.Schema({
        name: String,
        mobile: Number,
        extra: String,
        latitude: String,
        longitude: String,
        date: String,
        photos: [String],
        interview : String,
        injuries: String,
        reason : String,
        speed : String,
        road_conditions: String
   });

module.exports = mongoose.model("accReport", accReportSchema);