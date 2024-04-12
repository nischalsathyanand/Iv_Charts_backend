const express = require("express");
const mongoose = require("mongoose");
const Script = require("./models/scriptSchema");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:1234",
  credentials: true,
};
app.use(cors(corsOptions));

const uri =
  "mongodb+srv://nischalsathyanand:nischal123@cluster0.06igqyd.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Create and save the script object here, after ensuring database connection
    const scriptData = {
      nifty: [
        {
          timestamp: "02-01-2023",
          implied_volatility: "15.09",
          average: "15.09",
        },
        {
          timestamp: "03-01-2023",
          implied_volatility: "13.62",
          average: "14.355",
        },
        {
          timestamp: "02-01-2023",
          implied_volatility: "15.09",
          average: "15.09",
        },
        {
          timestamp: "03-01-2023",
          implied_volatility: "13.62",
          average: "14.355",
        },
        {
          timestamp: "04-01-2023",
          implied_volatility: "16.16",
          average: "14.95666667",
        },
        {
          timestamp: "06-01-2023",
          implied_volatility: "12.18",
          average: "14.2625",
        },
      ],
      tcs: [
        {
          timestamp: "02-0-205",
          implied_volatility: "100",
          average: "100.09",
        },
        {
          timestamp: "4-01-2023",
          implied_volatility: "134.62",
          average: "144.3455",
        },
      ],
      hdfc: [
        {
          timestamp: "08-01-2023",
          implied_volatility: "15.09",
          average: "15.09",
        },
        {
          timestamp: "23-01-2023",
          implied_volatility: "132.62",
          average: "142.355",
        },
      ],
      banknifty: [
        {
          timestamp: "12-01-2023",
          implied_volatility: "145.09",
          average: "145.09",
        },
        {
          timestamp: "23-01-2023",
          implied_volatility: "133.62",
          average: "134.355",
        },
      ],
    };

    // Save script data
    /*try {
      const savedScript = await Script.create({ scripts: scriptData });
      console.log("Data saved successfully:", savedScript);
    } catch (error) {
      console.error("Error saving data:", error);
    }*/
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", function (req, res) {
  res.send("Hello");
});

/// Endpoint to get all script data
app.get("/api/getscript", async (req, res) => {
  try {
    const scriptData = await Script.findOne({});
    res.json(scriptData);
  } catch (err) {
    console.error("Error fetching script data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get script data by name
app.get("/api/getscriptbyname", async (req, res) => {
  try {
    const name = req.query.name;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Script name parameter is required" });
    }

    const scriptData = await Script.findOne({});
    if (!scriptData) {
      return res.status(404).json({ error: "Script data not found" });
    }

    const script = scriptData.scripts.get(name);
    if (!script) {
      return res
        .status(404)
        .json({ error: `Script data for ${name} not found` });
    }

    res.json(script);
  } catch (err) {
    console.error("Error fetching script data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}...`);
});
