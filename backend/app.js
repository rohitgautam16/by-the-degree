import dotenv from "dotenv";
import { connect, Schema, model } from "mongoose";
import express, { json } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';


dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../frontend/build')));


app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/build', 'index.html'));
});

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.use(json());

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  place: { type: String, required: true },
});

const predictionSchema = new Schema({
  zodiac: String,
  degree: String,
  prediction: String,
});

const User = model("User", userSchema);
const Prediction = model("Prediction", predictionSchema);


app.get("/prediction", async (req, res) => {
  try {
    const predictions = await Prediction.find({});
    const dropdownData = predictions.map((pred) => ({
      zodiac: pred.zodiac,
      degree: pred.degree,
    }));
    res.json(dropdownData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch predictions" });
  }
});


app.post("/prediction", async (req, res) => {
  const { zodiac, degree } = req.body;

  if (!zodiac || !degree) {
    return res.status(400).json({ error: "Zodiac and degree are required." });
  }

  try {
    const prediction = await Prediction.findOne({
      zodiac: new RegExp(`^${zodiac}$`, "i"),
      degree,
    });

    if (!prediction) {
      return res
        .status(404)
        .json({ error: "No prediction found for the selected zodiac and degree." });
    }

    res.json({ prediction: prediction.prediction });
  } catch (error) {
    res.status(500).json({ error: "Error fetching prediction" });
  }
});


app.post("/users", async (req, res) => {
  const { name, email, date, time, place } = req.body;

  if (!name || !email || !date || !time || !place) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = new User({ name, email, date, time, place });
    await newUser.save();
    res.status(201).json({ message: "User data saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error saving user data" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Zodiac Predictions API!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
