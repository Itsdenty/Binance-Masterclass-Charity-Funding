class serverErrors {
  static ser1(status, error, field) {
    return {
      code: 'SER_01',
      message: error,
      field,
      status,
    };
  }

  static ser2(status, error, field) {
    return {
      code: 'SER_02',
      message: error,
      field,
      status,
    };
  }
}

export default serverErrors;
