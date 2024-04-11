const express = require("express");
const path = require("path");
import cors from "cors";

const app = express();
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://nischalsathyanand:nischal123@cluster0.06igqyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const Nifty = require("./models/nifty");
app.use(cors());

const niftyData = [
  { date: "02-01-2023", impliedVolatility: 15.09, average: 15.09 },
  { date: "03-01-2023", impliedVolatility: 13.62, average: 14.355 },
  { date: "04-01-2023", impliedVolatility: 16.16, average: 14.95666667 },
];
/*Nifty.insertMany(niftyData)
  .then((docs) => {
    console.log("Data inserted successfully:", docs);
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
  });
  */

app.get("/", function (req, res) {
  res.send("Hello");
});

app.get("/api/getname", async (req, res) => {
  try {
    // Fetch data from MongoDB using the model
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: "Name parameter is required" });
    }

    const niftyData = await Nifty.find();

    // Return the fetched data as a response
    res.json(niftyData);
  } catch (err) {
    // Handle errors
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
