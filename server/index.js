const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// const CONNECTION_URL = "mongodb+srv://tnr414:%23475Wish@cluster0.csqsv4m.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`listening to PORT : ${PORT}`)))
    .catch((error => console.error(error)))


