import mongoose from 'mongoose';
import bluebird from 'bluebird';
import DBConfig from '../../config/database';
import Role from './role';
import User from './user';
mongoose.Promise = bluebird;
let conn1;
console.log(DBConfig.mongodb.uri);
if (process.env.NODE_ENV === 'production') conn1 = mongoose.createConnection(DBConfig.mongodb.uri, DBConfig.mongodb.options);
else conn1 = mongoose.createConnection(DBConfig.mongodb.uri, DBConfig.mongodb.options);
conn1.once('open', () => {
  console.log('db connection open');
});
const UserModel = User(mongoose, conn1),
  RoleModel = Role(mongoose, conn1);
const database = {
  User: UserModel,
  Role: RoleModel,
  mongoose,
  mongodbConfig: DBConfig.mongodb
};
export default database;