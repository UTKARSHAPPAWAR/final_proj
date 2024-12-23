const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:false
    },
    linkedinPosts: {
        type:[String],
        required: false,
    },
    twitterArticles: {
        type:[String],
        required: false,
    },
    newsPaperArticles: {
        type:[String],
        required: false,
    },
    projects: {
        type:[String],
        required: false,
    },
    papers: {
        type:[String],
        required: false,
    },
    netZeroIITKStatus: {
        type:String,
        required: false,
    },
    netZeroArmyCanttStatus: {
        type:String,
        required: false,
    },
    outreachActivities: {
        type:[String],
        required: false,
    },
    funding1: {
        type:[String],
        required: false,
    },
    funding2: {
        type:[String],
        required: false,
    },
    funding3: {
        type:[String],
        required: false,
    },
    talks: {
        type:[String],
        required: false,
    },
    linkedinFollowers: {
        type: Number,
        required: false,
    },
    twitterFollowers: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model("stats", StatsSchema);