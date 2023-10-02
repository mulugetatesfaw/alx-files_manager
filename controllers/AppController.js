const redisClient = require('../utils/redis');
const db = require('../utils/db');

const AppController = {
  getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = db.isAlive();

    if (redisAlive && dbAlive) {
      return res.status(200).json({ redis: true, db: true });
    } else {
      return res.status(500).json({ redis: false, db: false });
    }
  },

  getStats(req, res) {
    const usersCount = db.getUsersCount();
    const filesCount = db.getFilesCount();

    return res.status(200).json({ users: usersCount, files: filesCount });
  },
};

module.exports = AppController;
