import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../database/models/index';
import logger from '../utils/logger';
import transfer from '../utils/test-token-transfer';
import charity from '../utils/charity-token-utils';


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
      // const role = await Role.findOne({ _id: user.role });
      try {
        console.log(user);
        const account = transfer.createAddress();
        console.log(account);
        user.address = account.address;
        user.pk = account.privateKey;
        const newUser = await User.create(user);
        delete newUser.pk;
        // newUser.role = role;
        // const newUser = user;
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
          
          // send vote token
          try {
            const address = await transfer.transfer(user.address);
            const setup = await transfer.setupVotes(user);
            // const createVotingProfile
            // return user object
            return {
              message: 'User created successfully and 200 vote token sent as a welcome gift already',
              user,
              token,
              refreshToken
            };
          } catch(e) {
            // return user object
            console.log(e);
            return {
              message: 'User created successfully but unable to send token kindly update your address to a valid bsc wallet address',
              user,
              token,
              refreshToken
            };
          }
      } catch (error) {
        // create and throw 500 error
        console.log(error);
        const err = { error: 'and error occured or user already exists' };
        throw err;
      }
    } catch (error) {
      // throw custom 500 error
      console.log(error);
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
    console.log(params);
    try {
      const query = { email: params.email },
        login = await User.findOne(query);
      if(!login) {
        throw new Error('wrong email orr password!');
      }
      if (!bcrypt.compareSync(params.password, login.password)) {
        throw new Error('wrong email or password!');
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
      console.log(error.toString());
      const err = { error: error.toString() };
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
   * @param{Object} user - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
   static async createFundingAccount(user, file) {
    try {
      if(file.proof) {
        let ipfsHash = await ipfs.add(file.proof)
        let hash = ipfsHash[0].hash;
        user.proof = hash;
      }
      user.proof = user.proof || "none";
      const createFunding = await charity.createFundingAccount(user);
      // const setup = await transfer.setupVotes(user);
      console.log(e);
      return {
        message: 'Funding account created successfully.',
      };
    } catch (error) {
      // throw custom 500 error
      console.log(error);
      const err = { error: 'an error occured while trying to retrieve your records' };
      throw err;
    }
  }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async getFundingAccount(fundingAddress) {
      try {
        const funding = await charity.getFundingAccount(fundingAddress);
        return {
          funding
        };
      } catch (error) {
        // throw custom 500 error
        const err = { error: 'an error occured while trying to fetch the funding account' };
        throw err;
      }
    }
  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async voteAccount(voteAddress, fundingAddress, amount) {
      try {
        // const query = { _id: userId };
        const vote = await transfer.vote(address, value);
        const updateVote = await transfer.updateVoteAllowed(address, amount);
        const voteAccount = await charity.voteAccount(fundingAddress, amount, updateVote);
        if(voteAccount.vote_count >= 200) {
          const activated = await charity.activateAccount(fundingAddress);
        }
        const funding = await charity.getFundingAccount(voteAddress, amount);
        return {
          funding
        };
      } catch (error) {
        // throw custom 500 error
        const err = { error: 'an error occured while trying to fetch the funding account' };
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
    /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} params - user query object
   * @return{json} the registered user's detail
   */
     static async resetVotesAllowed(params) {
      try {
        const users = await User.updateMany({}, { 
          $set: { votes_allowed: 10, votes_casted: 0 }
        });
        // return {
        //   users,
        //   count
        // };
        logger.info("sucessfully updated all users votes allowed")
      } catch (error) {
        // throw custom 500 error
        const err = { error: 'an error occured while trying to reset the vote count' };
        logger.error("an error occured while trying to reset vote counts");
        throw err;
      }
    }

    
}
export default userProcessor;
