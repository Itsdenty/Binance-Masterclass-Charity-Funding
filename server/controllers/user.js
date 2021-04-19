import bcrypt from 'bcrypt';
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
      const createFunding = await processor.createFundingAccount(req.body.user, req.file);
      res.send(transformer.transformResponse(200, createFunding));
    } catch (error) {
      res.status(500).json(transformer.transformResponse(500, error.error));
    }
  }
  static async voteAccount(req, res) {
    const accountAddress = req.params.address;
    const voteAddress = req.decodedToken.address;
    const amount = req.params.amount;
    try {
      const voteAccount = await processor.voteAccount(voteAddress, accountAddress, amount);
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
      const getFunding = await processor.getFundingAccount(req.params.address);
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
