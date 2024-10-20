const { MongoClient } = require('mongodb');

class Database {
    constructor(collectionName, dbName) {
        const uri = 'mongodb+srv://rahul:Password123@cluster0.6l81s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        this.client = new MongoClient(uri);
        this.collectionName = collectionName;
        this.dbName = dbName;
        this.connected = false;
    }

    async connect() {
        if (!this.connected) {
            await this.client.connect();
            console.log(`Connected to database: ${this.dbName}, collection: ${this.collectionName}`);
            this.collection = this.client.db(this.dbName).collection(this.collectionName);
            this.connected = true;

            // Debug: Log all documents in the collection
            const allDocs = await this.collection.find({}).toArray();
            console.log('All documents in collection:', JSON.stringify(allDocs, null, 2));
        }
    }

    async getTargetPlan(activityLevel) {
        try {
            await this.connect();
            console.log(`Searching for activity level: ${activityLevel}`);
            
            let result = await this.collection.findOne({ activityLevel: activityLevel });
            
            if (!result) {
                result = await this.collection.findOne({
                activityLevel: { $regex: new RegExp('^' + activityLevel + '$', 'i') }
            });
            }

            console.log('Query result:', result);
            
            if (!result) {
                console.log(`No training plan found for activity level: ${activityLevel}`);
                return null;
            }
            
            return result;
        } catch (error) {
            console.error("Error fetching target plan:", error);
            throw error;
        }
    }

    async recordDetails(document) {
        try {
            const collection = this.db.collection(this.collectionName);
            const result = await collection.insertOne(document);
            console.log(`Document inserted with _id: ${result.insertedId}`);
            return result;
        } catch (error) {
            console.error('Error in recordDetails:', error);
            throw error;
        }
    }
}

module.exports = Database;//checkpoint 2