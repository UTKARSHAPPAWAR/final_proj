const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    link: String,
});

module.exports = mongoose.model("activities", ActivitySchema);