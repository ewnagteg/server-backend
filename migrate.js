import './src/config/loadEnv.js';
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './src/config/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.env!="TEST"?config.database.path:config.database.test,
});

const [, , command, seed] = process.argv;
let glob = 'src/migrations/*.js';
if (seed) {
    glob = 'src/seeders/*.js';
}

const umzug = new Umzug({
  migrations: {
    glob: glob,
    resolve: ({ name, path }) => ({
      name,
      up: async () => {
        const mod = await import(pathToFileURL(path));
        return mod.up(sequelize.getQueryInterface(), Sequelize);
      },
      down: async () => {
        const mod = await import(pathToFileURL(path));
        return mod.down(sequelize.getQueryInterface(), Sequelize);
      },
    }),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

if (command === 'down') {
    console.log('Rolling back latest migration...');
    await umzug.down();
} else {
    const migrations = await umzug.pending();
    console.log('Pending migrations:', migrations.map(m => m.name));
    console.log('Running migrations...');
    await umzug.up();
}