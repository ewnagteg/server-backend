import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';

import { fileURLToPath, pathToFileURL } from 'url'; // ← fix here


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'dev.db', // todo fix this to use sequelize config + env file
});

const umzug = new Umzug({
  migrations: {
    glob: 'src/migrations/*.js',
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
const [, , command] = process.argv;

if (command === 'down') {
    console.log('Rolling back latest migration...');
    await umzug.down();
} else {
    const migrations = await umzug.pending();
    console.log('Pending migrations:', migrations.map(m => m.name));
    console.log('Running migrations...');
    await umzug.up();
}