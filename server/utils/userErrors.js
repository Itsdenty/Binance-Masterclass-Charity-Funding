class UserErrors {
  static usr1(field, status) {
    return {
      code: 'USR_01',
      message: `${field} is/are invalid`,
      field,
      status,
    };
  }

  static usr2(field, status, message) {
    return {
      code: 'USR_02',
      message,
      field,
      status,
    };
  }

  static usr8(field, status, message) {
    return {
      code: 'USR_08',
      message,
      field,
      status,
    };
  }

  static usr6(field, status, message) {
    return {
      code: 'USR_06',
      message: 'this is an invalid phone number',
      field,
      status,
    };
  }

  static usr4(field, status, message) {
    return {
      code: 'USR_04',
      message,
      field,
      status,
    };
  }

  static usr7(field, status, message) {
    return {
      code: 'USR_07',
      message: 'The Shipping Region ID is not number',
      field,
      status,
    };
  }
}

export default UserErrors;
