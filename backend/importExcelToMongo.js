import dotenv from 'dotenv';
import mongoose from 'mongoose';
import xlsx from 'xlsx';

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define prediction schema
const predictionSchema = new mongoose.Schema({
  zodiac: String,
  degree: String,
  prediction: String
});

// Create Prediction model
const Prediction = mongoose.model('Prediction', predictionSchema);

// Read Excel file
const workbook = xlsx.readFile('./Prediction_Database_for_Root_Ka.xlsx');
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Map Excel data to MongoDB schema
const predictionsData = sheetData.map(row => ({
  zodiac: row.Zodiac,
  degree: row.Degree.toString(),
  prediction: row.Prediction
}));

// Function to insert data into MongoDB
async function insertData() {
  try {
    await Prediction.insertMany(predictionsData);
    console.log("Data inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  }
}

// Run the insert data function
insertData();
