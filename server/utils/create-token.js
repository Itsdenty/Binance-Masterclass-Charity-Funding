import jwt from 'jsonwebtoken';

/**
 *
 *
 * @class createToken
 */
class createToken {
  /**
   * @description Method to generate authentication token
   * @param {Object} user
   * @param {string} secretKey
   * @return {String} returns token
   */
  static token(user, secretKey) {
    const authToken = jwt.sign(
      user, secretKey,
      { expiresIn: '24h' },
    );

    return authToken;
  }
}

export default createToken;
