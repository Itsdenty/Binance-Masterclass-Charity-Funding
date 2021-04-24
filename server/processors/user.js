import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import database from '../database/models/index';
import logger from '../utils/logger';
import transfer from '../utils/test-token-transfer';
import charity from '../utils/charity-token-utils';
import bscUtil from '../utils/bscscan';
import bscFunctions from '../utils/bscscan';
import IPFS from 'ipfs-api';
import funding from '../database/models/funding';
import fs from 'fs';


const { Role } = database,
  { Funding } = database,
  { User } = database;

const ipfs = IPFS({ host: 'ipfs.infura.io',
  port: 5001,protocol: 'https' });
const voteContractAddress = '0x7d417d0Bb17bE24000b8c738C17154FC145C97EF';

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
            const address = await transfer.transfer(user.address, 200);
            const setup = await transfer.setupVotes(user);
            // const createVotingProfile
            // return user object
            return {
              message: 'User created successfully and 200 vote token sent as a welcome gift already',
              newUser,
              token,
              refreshToken
            };
          } catch(e) {
            // return user object
            console.log(e);
            return {
              message: 'User created successfully but unable to send token kindly update your address to a valid bsc wallet address',
              newUser,
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
          _id: login._id,
          name: login.username,
          email: login.email,
          address: login.address
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
   static async createFundingAccount(req) {
    try {
      const user = req.body;
      if(req.file) {
        // var tmp_path = req.file.path;
        // // set where the file should actually exists - in this case it is in the "images" directory
        // var target_path = 'server/public/uploads/' + req.file.originalname;
        // // move the file from the temporary location to the intended location
        // await fs.rename(tmp_path, target_path);
        // await fs.unlink(tmp_path);
        let ipfsHash = await ipfs.add(req.file.buffer);
        let hash = ipfsHash[0].hash;
        user.proof = hash;
      }

      user.proof = user.proof || "none";
      const fundingAddress = transfer.createAddress();
      user.address = fundingAddress.address;
      user.pk = fundingAddress.privateKey;
      user.user = user.user_id;
      const payload = {
        fundAddress: user.address,
        target_amount: user.target_amount,
        description: user.description,
        proof: user.proof
      };
      const fundingAccount = await Funding.create(user);
      const createFunding = await charity.createFundingAccount(payload);
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
     static async getFundingAccount(fundingId) {
      try {
        // const funding = await charity.getFundingAccount(fundingAddress);
        const funding = await Funding.findOne({_id: fundingId})
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
   static async getFundingAccounts() {
    try {
      const funding = await Funding.find({});
      return {
        funding
      };
    } catch (error) {
      // throw custom 500 error
      console.log(error);
      const err = { error: 'an error occured while trying to fetch the funding account' };
      throw err;
    }
  }

    /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async getVotes(_id) {
      try {
        const funding = await Funding.findOne({_id});
        return {
          votes: funding.votes
        };
      } catch (error) {
        // throw custom 500 error
        console.log(error);
        const err = { error: 'an error occured while trying to fetch the votes' };
        throw err;
      }
    }
    /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async getUserVotes(address) {
      try {
        console.log(address);
        const userVotes = await bscFunctions.getTransactions(address, voteContractAddress);
        return {
          votes: userVotes
        };
      } catch (error) {
        // throw custom 500 error
        console.log(error);
        const err = { error: 'an error occured while trying to fetch the votes' };
        throw err;
      }
    }
    /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async getUserBalance(fundingAddress) {
      try {
        const charityBalance = await charity.getBalance(fundingAddress);
        const voteBalance = await transfer.getBalance(fundingAddress);
        const bnbBalance = await bscUtil.getBalance(fundingAddress);
        return {
           charityBalance,
           voteBalance,
           bnbBalance
        };
      } catch (error) {
        // throw custom 500 error
        const err = { error: 'an error occured while trying to fetch the user balance' };
        throw err;
      }
    }

        /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
         static async getVoteProfile(user) {
          try {
            console.log(user);
            // const setup = await transfer.setupVotes(user);
            const voteDetail = await transfer.getVoteProfile(user.address);
            return voteDetail;
          } catch (error) {
            // throw custom 500 error
            console.log(error);
            const err = { error: 'an error occured while trying to fetch the user balance' };
            throw err;
          }
        }
  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} userId - user id to be updated
   * @return{json} the registered user's detail
   */
     static async voteAccount(voteAddress, fundingAddress, amount, user_id) {
      try {
        // const query = { _id: userId };
        const query = { address: voteAddress };
        const user = await User.findOne(query);
        const vote = await transfer.vote(user, amount);
        console.log("vote",vote)
        const updateVote = await transfer.updateVoteAllowed(voteAddress, amount);
        const updateUser = await User.findOneAndUpdate({_id: user_id}, { $inc: { vote_casted: amount }});
        const voteAccount = await charity.voteAccount(fundingAddress, amount, vote);
        const updateFunding = await Funding.findOneAndUpdate({address: fundingAddress}, {$inc: { vote_count: amount }, $push: { votes: vote }});
        const funding = await charity.getFundingAccount(voteAddress, amount);
        if(funding.vote_count >= 200) {
          const activated = await charity.activateAccount(fundingAddress);
          const activateFunding = await Funding.findOneAndUpdate({address: fundingAddress}, {$set: {is_activated: true}})
        }
        // const funding = await charity.getFundingAccount(voteAddress, amount);
        return {
          message: "Voting successful"
        };
      } catch (error) {
        // throw custom 500 error
        console.log(error);
        const err = { error: 'an error occured while trying to fund account' };
        throw err;
      }
    }

  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} user - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
   static async swapToken(data, usr) {
    try {
      console.log("data", data);
      const query = { email: usr.email };
      const user = await User.findOne(query);
      // console.log(user);
      const {pk, address} = user;
      if(data.token1 === "BNB" && data.token2 === "CHT" ) {
        console.log(1);
        const sendBNB = await charity.sendBNB(user, data.value1);
        const sendCharity = await charity.transfer(address, data.value2)
      }
      else if(data.token1 === "CHT" && data.token2 === "BNB") {
        console.log(2);
        const sendCharity = await charity.transferFrom(user, data.value1);
        const sendBNB = await charity.sellBNB(address, data.value2);
      }
      else if (data.token1 === "CHT" && data.token2 === "VCT") {
        console.log(3);
        const sendCharity = await charity.transferFrom(user, data.value1);
        const sendVCT = await transfer.transfer(address, data.value2);
      }
      // const createFunding = await charity.createFundingAccount(user);
      // const setup = await transfer.setupVotes(user);
      return {
        message: 'Token swapped successfully.',
      };
    } catch (error) {
      // throw custom 500 error
      console.log(error);
      const err = { error: 'an error occured while trying to swap your tokens' };
      throw err;
    }
  }


   /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} user - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
    static async withdrawBnb(data, usr) {
      try {
        console.log("data", data);
        const query = { email: usr.email };
        const user = await User.findOne(query);
        // console.log(user);
        const {pk, address} = user;
          const withdrawBNB = await charity.withdrawBNB(user, data.address, data.amount);
        // const createFunding = await charity.createFundingAccount(user);
        // const setup = await transfer.setupVotes(user);
        return {
          message: 'BNB withdrawn successfully.',
        };
      } catch (error) {
        // throw custom 500 error
        console.log(error);
        const err = { error: 'an error occured while trying to swap your tokens' };
        throw err;
      }
    }

   /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} user - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
    static async fundAccount(data, usr) {
      try {
        console.log("data", data);
        const query = { email: usr.email };
        const user = await User.findOne(query);
        // console.log(user);
        const {pk, address} = user;
          // const withdrawBNB = await charity.withdrawBNB(user, data.address, data.amount);
          const sendCharity = await charity.transferFrom(user, data.address, data.amount);
        // const createFunding = await charity.createFundingAccount(user);
        // const setup = await transfer.setupVotes(user);
        return {
          message: 'account funded successfully.',
        };
      } catch (error) {
        // throw custom 500 error
        console.log(error);
        const err = { error: 'an error occured while trying to swap your tokens' };
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
