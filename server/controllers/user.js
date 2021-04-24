import fs from 'fs';
import transformer from '../utils/transformer';
import processor from '../processors/user'; // for user database interaction

/**
 *
 *
 * @class userController
 */
class userController {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {json} createUser response
   */
  static async createUser(req, res) {
    // const hashPassword = bcrypt.hashSync(req.body.user.password, 10);
    const email = req.body.user.email.trim().toLowerCase();
    req.body.user.email = email;
    // req.body.user.password = hashPassword;
    try {
      const createUser = await processor.createUser(req.body.user);
      res.send(transformer.transformResponse(200, createUser));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {json} createFundingAccount response
   */
   static async createFundingAccount(req, res) {
    try {
      req.body.user_id = req.decodedToken._id;
      console.log(req.file);
      // var tmp_path = req.file.path;
      // // set where the file should actually exists - in this case it is in the "images" directory
      // var target_path = 'server/public/uploads/' + req.file.originalname;
      // // move the file from the temporary location to the intended location
      // await fs.rename(tmp_path, target_path);
      // await fs.unlink(tmp_path);
      const createFunding = await processor.createFundingAccount(req);
      res.send(transformer.transformResponse(200, createFunding));
    } catch (error) {
      console.log(error);
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }
  static async voteAccount(req, res) {
    const accountAddress = req.params.address;
    const voteAddress = req.decodedToken.address;
    const amount = req.params.amount;
    try {
      const voteAccount = await processor.voteAccount(voteAddress, accountAddress, amount, req.decodedToken._id);
      res.send(transformer.transformResponse(200, voteAccount));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
   static async getFundingAccount(req, res) {
    try {
      const getFunding = await processor.getFundingAccount(req.params.id);
      res.send(transformer.transformResponse(200, getFunding));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
   static async getVotes(req, res) {
    try {
      const getVotes = await processor.getVotes(req.params.id);
      res.send(transformer.transformResponse(200, getVotes));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

    /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
     static async getUserVotes(req, res) {
      try {
        const getVotes = await processor.getUserVotes(req.decodedToken.address);
        res.send(transformer.transformResponse(200, getVotes));
      } catch (error) {
        console.log(error);
        res.status(500).json(transformer.transformResponse(500, error.error));
      }
    }
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
   static async getFundingAccounts(req, res) {
    try {
      const getFundings = await processor.getFundingAccounts();
      res.send(transformer.transformResponse(200, getFundings));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

    /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
     static async getUserBalance(req, res) {
      try {
        const getBalance = await processor.getUserBalance(req.decodedToken.address);
        res.send(transformer.transformResponse(200, getBalance));
      } catch (error) {
        res.status(500).json(transformer.transformResponse(500, error.error));
      }
    }

    /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
     static async getVoteProfile(req, res) {
      try {
        const getVote = await processor.getVoteProfile(req.decodedToken);
        res.send(transformer.transformResponse(200, getVote));
      } catch (error) {
        res.status(500).json(transformer.transformResponse(500, error.error));
      }
    }

      /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {json} createUser response
   */
  static async swapToken(req, res) {
    // const hashPassword = bcrypt.hashSync(req.body.user.password, 10);
    // const email = req.body.user.email.trim().toLowerCase();
    // req.body.user.email = email;
    // req.body.user.password = hashPassword;
    console.log(req.decodedToken);
    try {
      const swap = await processor.swapToken(req.body.user, req.decodedToken);
      res.send(transformer.transformResponse(200, swap));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }
  
        /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {json} createUser response
   */
    static async withdrawBnb(req, res) {
    // const hashPassword = bcrypt.hashSync(req.body.user.password, 10);
    // const email = req.body.user.email.trim().toLowerCase();
    // req.body.user.email = email;
    // req.body.user.password = hashPassword;
    console.log(req.decodedToken);
    try {
      const withdraw = await processor.withdrawBnb(req.body.user, req.decodedToken);
      res.send(transformer.transformResponse(200, withdraw));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  
        /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {json} createUser response
   */
         static async fundAccount(req, res) {
          // const hashPassword = bcrypt.hashSync(req.body.user.password, 10);
          // const email = req.body.user.email.trim().toLowerCase();
          // req.body.user.email = email;
          // req.body.user.password = hashPassword;
          console.log(req.decodedToken);
          try {
            const withdraw = await processor.fundAccount(req.body.user, req.decodedToken);
            res.send(transformer.transformResponse(200, withdraw));
          } catch (error) {
            res.status(500).json(transformer.transformResponse(500, error.error));
          }
        }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} loginUser
   */
  static async userLogin(req, res) {
    try {
      const loginUser = await processor.userLogin(req.body.user);
      res.send(transformer.transformResponse(200, loginUser));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} updated
   */
  static async userUpdate(req, res) {
    try {
      const updated = await processor.userUpdate(req.params.id, req.body.user);
      res.send(transformer.transformResponse(200, updated));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} users
   */
  // static async getUsers(req, res) {
  //   try {
  //     const page = !req.query.page ? 1 : parseInt(req.query.page, 10),
  //       limit = !req.query.limit ? 6 : parseInt(req.query.limit, 10),
  //       skip = (page - 1) * limit;

  //     const query = {
  //       limit,
  //       skip,
  //     };
  //     const users = await processor.getUsers(query);
  //     res.send(transformer.transformResponse(200, users));
  //   } catch (error) {
  //     res.status(500).json(transformer.transformResponse(500, error.error));
  //   }
  // }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} user
   */
  static async getById(req, res) {
    try {
      const user = await processor.userUpdate(req.params.id);
      res.send(transformer.transformResponse(200, user));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} roles
   */
  // static async getRoles(req, res) {
  //   try {
  //     const roles = await processor.getRoles();
  //     res.send(transformer.transformResponse(200, roles));
  //   } catch (error) {
  //     res.status(500).json(transformer.transformResponse(500, error.error));
  //   }
  // }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof userController
   * @returns {*} deleted
   */
  // static async deleteUser(req, res) {
  //   try {
  //     const deleted = await processor.deleteUser(req.params.id);
  //     res.send(transformer.transformResponse(200, deleted));
  //   } catch (error) {
  //     res.status(500).json(transformer.transformResponse(500, error.error));
  //   }
  // }
}
export default userController;
