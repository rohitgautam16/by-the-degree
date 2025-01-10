require('dotenv').config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));


const predictionSchema = new mongoose.Schema({
    zodiac: String,
    degree: String,
    prediction: String
});

const Prediction = mongoose.model('Prediction', predictionSchema);


const workbook = xlsx.readFile('./Prediction_Database_for_Root_Ka.xlsx'); 
const sheetName = workbook.SheetNames[0]; 
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);


const predictionsData = sheetData.map(row => ({
    zodiac: row.Zodiac,      
    degree: row.Degree.toString(),  
    prediction: row.Prediction   
}));


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

insertData();
