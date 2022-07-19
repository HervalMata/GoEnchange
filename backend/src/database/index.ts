import {createConnection, DataSource} from 'typeorm';
// @ts-ignore
import ormconfig from '../../ormconfig.json';

export const dataSource = new DataSource({ ...ormconfig});
dataSource.initialize()
  .then(() => console.log('Data Source has been initialized successfully!!!'))
  .catch((err) => console.log('Error during Data Source initialization!!!', err));

createConnection();
