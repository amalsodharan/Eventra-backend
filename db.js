import { Sequelize, Op } from 'sequelize';
import dotenv from 'dotenv';
import eventModel from './modules/eventModel.js';
import userModel from './modules/userModule.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: { decimalNumbers: true },
    logging: false,
  }
);

const Event = eventModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

const Models = { Event, User, Op };

const connection = {};

export default async function connectDB() {
  if (connection.isConnected) {
    console.log('=> Using existing connection.');
    return Models;
  }

  await sequelize.sync();
  await sequelize.authenticate();
  connection.isConnected = true;
  console.log('=> Created a new connection.');
  return Models;
}
