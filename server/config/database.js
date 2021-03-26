import dotenv from 'dotenv';

dotenv.config();
const Database = {};

Database.mongodb = {
  uri: process.env.NODE_ENV === 'development' ? 'mongodb+srv://cluster0.dsopn.mongodb.net/decentralized-charity-db?retryWrites=true&w=majority' : 'mongodb+srv://cluster0.dsopn.mongodb.net/decentralized-charity-db?retryWrites=true&w=majority',
  options: { useNewUrlParser: true, useUnifiedTopology: true, user: "charity-db-user", pass: "HAIdOP3l0WFMQBGz"},
  optionsDeprecated: {
    db: {
      native_parser: true
    },
    server: {
      poolSize: 5,
      socketOptions: {
        keepAlive: 120 * 1000,
        socketTimeoutMS: 0,
        connectionTimeout: 0
      }
    },
  }
};

module.exports = Database;
