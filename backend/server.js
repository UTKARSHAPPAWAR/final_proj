const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const db_url = process.env.MONGODB_URI;
const PORTNO = process.env.PORT || 3000;

mongoose.connect(db_url);

const User = require("./models/user");
const Stats = require("./models/stats");
const Talk = require("./models/talks");
const Project = require("./models/projects");
const Paper = require("./models/papers");
const Activity = require("./models/activity");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {                //middleware for verifying jwt
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
});


app.get("/api/getStats", async (req, res) => {
    try {
        const stats = await Stats.find();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/delete', async (req, res) => {
    try {
        const deleteId = req.body.id;
        const selectedTab = req.body.tab;
        let deletedItem;

        switch (selectedTab) {
            case 'Talks':
                deletedItem = await Talk.findByIdAndDelete(deleteId);
                break;
            case 'Projects':
                deletedItem = await Project.findByIdAndDelete(deleteId);
                break;
            case 'Papers':
                deletedItem = await Paper.findByIdAndDelete(deleteId);
                break;
            case 'Activities':
                deletedItem = await Activity.findByIdAndDelete(deleteId);
                break;
            default:
                return res.status(400).json({ message: 'Invalid tab selection' });
        }

        if (!deletedItem) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/api/getActivities', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/saveActivity', async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        await newActivity.save();
        res.status(200).json({ message: 'Activity saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/getPapers', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.status(200).json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/savePaper', async (req, res) => {
    try {
        const newPaper = new Paper(req.body);
        await newPaper.save();
        res.status(200).json({ message: 'Paper saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/getTalks', async (req, res) => {
    try {
        const talks = await Talk.find();
        res.status(200).json(talks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/saveTalk', async (req, res) => {
    try {
        const newTalk = new Talk(req.body);
        await newTalk.save();
        res.status(200).json({ message: 'Talk saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/getProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/saveProject', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(200).json({ message: 'Project saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email.toLowerCase(),
            password: encryptedUserPassword,
        });

        await user.save();

        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid Credentials");
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORTNO, () => {
    console.log("Listening on port: " + PORTNO);
});
