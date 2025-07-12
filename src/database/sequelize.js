import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// it works i guess
const dbPath = config.env === 'test'
  ? path.resolve(__dirname, config.database.test)
  : path.resolve(__dirname, config.database.path);
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: config.log,
});

export default sequelize;