class serverErrors {
  static aut1() {
    return {
      code: 'AUT_O1',
      message: 'Authorization code is empty',
      field: 'USER-KEY',
      status: 403,
    };
  }

  static aut2() {
    return {
      code: 'AUT_O2',
      message: 'Access Unauthorized',
      field: 'USER-KEY',
      status: 401,
    };
  }
}

export default serverErrors;
