class catErrors {
  static cat1() {
    return {
      code: 'CAT_O1',
      message: ' Don\'t exist category with this ID.',
      field: 'category_id',
      status: 500,
    };
  }
}

export default catErrors;
