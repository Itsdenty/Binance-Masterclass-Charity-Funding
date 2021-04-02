import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../database/models/index';

const { Role } = database,
  { User } = database;
/**
 * @description - Describes the Users of the app, their creation, their editing e.t.c.
 */
class userProcessor {
  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} user - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
  static async createUser(user) {
    try {
      // retrieve the user role
      const role = await Role.findOne({ _id: user.role });
      try {
        const newUser = await User.create(user);
        newUser.role = role;

        // create token
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
            data: newUser
          }, process.env.SECRET),

          // create refresh token
          refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 128),
            data: newUser
          }, process.env.REFRESH_TOKEN_SECRET);

        // return user object
        return {
          message: 'User created successfully',
          user,
          token,
          refreshToken
        };
      } catch (error) {
        // create and throw 500 error
        const err = { error: 'and error occured or user already exists' };
        throw err;
      }
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to retrieve your records' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} params - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
  static async userLogin(params) {
    try {
      const query = { email: params.email },
        login = await User.findOne(query).populate('role')
          .sort({ created_at: 'descending' });
      if (!bcrypt.compareSync(params.password, login.password)) {
        throw new Error('wrong password!');
      }
      const newUser = {
          _id: { login },
          name: login.username,
          email: { login },
          role: { login },
          phone_number: { login }
        },

        token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
          data: newUser
        }, process.env.SECRET),

        refreshToken = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 128),
          data: newUser
        }, process.env.REFRESH_TOKEN_SECRET),

        response = {
          user: newUser,
          message: 'login successful',
          token,
          refreshToken
        };
      return response;
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to log you in' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @param{Object} user - user object
   * @return{json} the registered user's detail
   */
  static async userUpdate(userId, user) {
    try {
      const updated = await User.findOneAndUpdate({ _id: userId }, user, { upsert: true });
      return {
        id: updated._id,
        message: 'User information successfully updated'
      };
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to update the user' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} params - user query object
   * @return{json} the registered user's detail
   */
  static async getUsers(params) {
    try {
      const users = await User.find({})
          .populate('role')
          .limit(params.limit)
          .skip(params.skip)
          .sort({ created_at: 'descending' }),
        count = await User.count({});
      return {
        users,
        count
      };
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to update the user' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
  static async getById(userId) {
    try {
      const query = { _id: userId };
      const user = await User.findOne(query).populate('role');
      return {
        user
      };
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to update the user' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
  static async delete(userId) {
    try {
      const query = { _id: userId };
      const user = await User.remove(query);
      return {
        id: userId,
        message: 'User sucessfully removed'
      };
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to update the user' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @return{json} the registered user's detail
   */
  static async getRoles() {
    try {
      const query = {};
      const roles = await Role.find(query);
      return {
        roles
      };
    } catch (error) {
      // throw custom 500 error
      const err = { error: 'an error occured while trying to update the user' };
      throw err;
    }
  }
}

export default userProcessor;
