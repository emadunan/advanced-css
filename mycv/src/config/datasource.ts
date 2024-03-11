import { Report } from '../reports/reports.entity';
import { User } from '../users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log('RUNNING__ENV: ', process.env.NODE_ENV);

export const dbdatasource: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  entities: ['**/*.entity.js'],
  migrations: ['**/migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbdatasource, {});
    break;

  case 'production':
    Object.assign(dbdatasource, {});
    break;

  case 'test':
    Object.assign(dbdatasource, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;

  default:
    throw new Error('unknown environment');
}

const dataSource = new DataSource(dbdatasource as DataSourceOptions);
export default dataSource;
