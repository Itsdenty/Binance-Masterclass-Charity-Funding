import dotenv from 'dotenv';
import database from '../models';
import permissions from '../../config/permission';

dotenv.config();

database.mongoose.connect(database.mongodbConfig.uri, database.mongodbConfig.options, (err) => {
  if (err) {
    console.log('Mongodb connection error', err);
    process.exit();
  } else {
    console.log('Mongodb connection successful');
    database.User
      .create({
        username: 'coding-muse',
        password: 'superduperpassword1234',
        email: 'dent4real@yahoo.com',
        role: '5b4fafca821cf474ccf0a221',
        address: 'xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36',
        permissions: [permissions.GLOBAL]
      })
      .then((todo) => {
        console.log(todo.toJSON());
        database.mongoose.connection.close();
        process.exit();
      })
      .catch((error) => {
        console.log(error);
        database.mongoose.connection.close();
        process.exit();
      });
  }
});
