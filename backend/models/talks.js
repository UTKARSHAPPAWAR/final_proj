const mongoose = require("mongoose");

const TalkSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    speaker: String,
    link: String,
});

module.exports = mongoose.model("talks", TalkSchema);