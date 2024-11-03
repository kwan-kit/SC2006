require('dotenv').config();
const { MongoClient } = require('mongodb');

class RunReportDashboard {
    constructor() {
        // MongoDB connection URL and Database Name
        this.url = process.env.MONGODB_URI; 
        this.dbName = 'RunReports';
        this.client = new MongoClient(this.url);
        this.db = null;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db(this.dbName);
        } catch (err) {
            console.error('MongoDB connection error:', err);
        }
    }
    runReportSchema = {
        userName: String,
        date: String,
        time: String,
        targetTime: {
            hours: String,
            minutes: String,
            seconds: String,
        },
        movingTime: {
            hours: String,
            minutes: String,
            seconds: String,
        },
        distance: String,
        elevationGain: String,
        rating: Number,
        stars: Number,
        mapData: [[Number]], // Array of coordinate pairs [longitude, latitude]
        createdAt: Date,
    };
    
    async submitReport(stats) {
        try {
            const runReport = {
                userName: "ryan",
                date: stats.date,
                time: stats.time,
                targetTime: stats.targetTime,
                movingTime: stats.movingTime,
                distance: stats.distance,
                elevationGain: stats.elevationGain,
                rating: stats.rating,
                stars: stats.stars,
                mapData: stats.mapData, // coordinates array to be saved
                createdAt: new Date().toISOString(),
              };              
    
            const result = await this.db.collection('RunReports').insertOne(runReport);
            console.log('Run report submitted:', result.insertedId);
        } catch (err) {
            console.error('Error submitting run report:', err);
        }
    }

    async getReportsByUser(userName) {
        try {
            const reports = await this.db.collection('RunReports').find({ userName }).toArray(); 
            return reports;
        } catch (err) {
            console.error('Error fetching run reports:', err);
            throw err; 
        }
    }
    

    async close() {
        await this.client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = RunReportDashboard;
