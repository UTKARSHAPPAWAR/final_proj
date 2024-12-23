const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    speaker: String,
    link: String,
});

module.exports = mongoose.model("papers", PaperSchema);