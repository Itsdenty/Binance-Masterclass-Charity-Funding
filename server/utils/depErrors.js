class depErrors {
  static dep1() {
    return {
      code: 'DEP_01',
      message: 'The ID is not a number',
      field: 'department_id',
      status: 400,
    };
  }

  static dep2() {
    return {
      code: 'DEP_02',
      message: 'Don\'exist department with this ID',
      field: 'department_id',
      status: 500,
    };
  }
}

export default depErrors;
