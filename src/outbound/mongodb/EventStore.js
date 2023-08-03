import { MongoClient } from "mongodb";

export class EventStore {

  constructor() {
    this.mongoURL = "mongodb://localhost:27017";
    this.dbName = "my_event_store";
    this.collectionName = "events";
  }

  async init() {
    try {
      if (this.client) {
        console.debug("Connection to MongoDB already established.");
        return;
      };
      this.client = await MongoClient.connect(this.mongoURL);
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
      console.debug("Connection to MongoDB established.");
      this.client.on("close", () => {
        console.debug("Connection to MongoDB closed.");
      }).on("error", (err) => {
        console.error("Error connecting to MongoDB:", err);
      });
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }

  async insert(eventType, eventData) {
    const event = {
      type: eventType,
      data: eventData,
      createAt: new Date(),
    };
    try {
      console.debug("Inserting event:", JSON.stringify(event));
      await this.collection.insertOne(event);
      console.debug("Event successfully inserted:", JSON.stringify(event));
    } catch (err) {
      console.error("Error inserting event:", err);
    }
  }

  async deleteAll() {
    try {
      console.debug("Removing events...");
      await this.collection.deleteMany({});
      console.debug("Events removed");
    } catch (err) {
      console.error("Error removing events:", err);
    }
  }

  async getAll() {
    try {
      console.debug("Retrieving events...");
      const events = await this.collection.find({}).toArray();
      console.debug("Events retrieved:", JSON.stringify(events));
      return events;
    } catch (err) {
      console.error("Error retrieving events:", err);
      return [];
    }
  }

  async findByType(eventType) {
    try {
      console.debug("Retrieving events by type...", eventType);
      const events = await this.collection.find({ type: eventType }).toArray();
      console.debug("Events retrieved:", JSON.stringify(events));
      return events;
    } catch (err) {
      console.error("Error retrieving events by event type:" + eventType, err);
      return [];
    }
  }

  async findByTypeLike(eventType) {
    try {
      console.debug("Retrieving events by type like...", eventType);
      const events = await this.collection.find({ type: { $regex: eventType } }).toArray();
      console.debug("Events retrieved:", JSON.stringify(events));
      return events;
    } catch (err) {
      console.error("Error retrieving events by event type like:" + eventType, err);
      return [];
    }
  }

  async closeConnection() {
    await this.client.close();
  }

}