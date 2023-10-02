const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    const collection = this.client.db().collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async nbFiles() {
    const collection = this.client.db().collection('files');
    const count = await collection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
