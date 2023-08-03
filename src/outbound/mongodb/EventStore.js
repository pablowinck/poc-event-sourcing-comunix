import { MongoClient } from "mongodb";

export class EventStore {
  constructor() {
    this.mongoURL = "mongodb://localhost:27017";
    this.dbName = "my_event_store";
    this.collectionName = "events";
  }

  async init() {
    try {
      this.client = await MongoClient.connect(this.mongoURL);
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (err) {
      console.error("Erro ao conectar ao MongoDB:", err);
    }
  }

  async insert(eventType, eventData) {
    const event = {
      type: eventType,
      data: eventData,
      createAt: new Date(),
    };
    try {
      await this.collection.insertOne(event);
      console.log("Evento inserido com sucesso:", event);
    } catch (err) {
      console.error("Erro ao inserir evento:", err);
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      console.error("Eventos removidos");
    } catch (err) {
      console.error("Erro ao remover eventos:", err);
    }
  }

  async getAll() {
    try {
      const events = await this.collection.find({}).toArray();
      return events;
    } catch (err) {
      console.error("Erro ao recuperar eventos:", err);
      return [];
    }
  }

  async closeConnection() {
    await this.client.close();
    console.log("Conexão com o MongoDB fechada.");
  }
}
