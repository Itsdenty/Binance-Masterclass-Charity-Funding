import dotenv from 'dotenv';
import database from '../models';
import permissions from '../../config/permission';

dotenv.config();

console.log(process.env.NODE_ENV);
database.mongoose.connect(database.mongodbConfig.uri, database.mongodbConfig.options, (err) => {
  if (err) {
    console.log('Mongodb connection error', err);
    process.exit();
  } else {
    console.log('Mongodb connection successful');
    (async () => {
      try {
        const roles = await database.Role
          .insertMany([
            {
              name: 'super_admin',
              display_name: 'Super Admin',
              description: 'The role for The over all admin',
              permissions: [permissions.GLOBAL],
            },
            {
              name: 'admin',
              display_name: 'Admin',
              description: 'The role for admin with restricted access',
              permissions: [permissions.GLOBAL_USER,
                permissions.GLOBAL_VAN, permissions.GLOBAL_VAN_REQUEST]
            },
            {
              name: 'user',
              display_name: 'User',
              description: 'The role for end users',
              permissions: [permissions.READ_USER, permissions.WRITE_USER,
                permissions.READ_VAN, permissions.READ_VAN_REQUEST, permissions.READ_VAN_REQUEST],
            },
            {
              name: 'agent',
              display_name: 'Agent',
              description: 'The role for vanbox agents',
              permissions: [permissions.READ_USER, permissions.WRITE_USER,
                permissions.READ_VAN, permissions.READ_VAN_REQUEST, permissions.READ_VAN_REQUEST],
            },
            {
              name: 'driver',
              display_name: 'Cashier',
              description: 'The role for the platform van drivers',
              permissions: [permissions.READ_USER, permissions.WRITE_DRIVER,
                permissions.READ_VAN, permissions.UPDATE_VAN],
            }
          ]);
        console.log('successfully seeded roles');
        database.mongoose.connection.close();
        process.exit();
      } catch (error) {
        console.log(error);
        database.mongoose.connection.close();
        process.exit();
      }
    })();
    // .then((docs) => {
    //   console.log(docs);
    //   database.mongoose.connection.close();
    //   process.exit();
    // })
    // .catch((error) => {
    //   console.log(error.message);
    //   database.mongoose.connection.close();
    //   process.exit();
    // });
  }
});
