import moment from 'moment';
// import permissions from '../../config/permission';
import web3 from "web3";

// const WAValidator = require('@swyftx/api-crypto-address-validator')

// const valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'litecoin', 'testnet')

// if (valid) {
//   console.log('This is a valid address')
// } else {
//   console.log('Address INVALID')
// }

const CustomValidators = {};

CustomValidators.isValidAddress = (input) => web3.utils.isAddress(input);

CustomValidators.isGT = (input, num) => num > input;

CustomValidators.isGTE = (input, num) => num >= input;

CustomValidators.isLT = (input, num) => num < input;

CustomValidators.isLTE = (input, num) => num <= input;

CustomValidators.isEqual = (input, val) => {
  if (!input) return false;

  return val === input;
};

CustomValidators.isPassword = (input) => input && input.length >=6 && input.length <=50;

CustomValidators.isLengthEqual = (input, val) => {
  if (!input) return false;

  return input.length === val;
};

CustomValidators.isMinLen = (input, val) => {
  if (!input) return false;

  return input.length >= val;
};

CustomValidators.isMaxLen = (input, val) => {
  if (!input) return false;

  return input.length <= val;
};

CustomValidators.isGender = (input) => {
  try {
    input = input.toString().toUpperCase();
  } catch (e) {
    return false;
  }

  return ['MALE', 'FEMALE'].includes(input);
};

CustomValidators.isHouseAddress = (input) => {
  if (typeof input !== 'string') return false;

  if (input.length < 2 || input.length > 100) return false;

  return /^([a-zA-Z#,.\d\s])*$/.test(input);
};

CustomValidators.isBVN = input => /^(2)([0-9]{10})$/.test(input);

CustomValidators.isNigerianMobile = input => /^(0)*(\d{10})$/.test(input);

CustomValidators.isUserType = input => /^([a-zA-Z\d\-])*$/.test(input);

CustomValidators.isName = input => /[\w\s\—\-]{3,50}/.test(input);

CustomValidators.isMessage = input => /[\w\s\—\-]{3,200}/.test(input);

CustomValidators.isProductCode = input => /[A-Z]{3}/.test(input);

CustomValidators.isIdType = (input) => {
  if (input.length < 2 || input.length > 50) return false;

  return /^([a-zA-Z#\-\\\/\d])*$/.test(input);
};

CustomValidators.isOccupation = (input) => {
  if (input.length < 2 || input.length > 50) return false;

  return /[a-zA-Z\d\s]/.test(input);
};

CustomValidators.isHumanName = (input) => {
  if (typeof input !== 'string') return false;

  if (input.length < 2 || input.length > 50) return false;

  return /^([a-zA-Z,.\d\s\-])*$/.test(input);
};


// CustomValidators.isPermission = input => permissions.includes(input);

CustomValidators.isEmailV2 = (email) => {
  const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  return re.test(email);
};

CustomValidators.isDateV2 = input => moment(input).isValid();

CustomValidators.isNumber = input => /^-?[\d.]+(?:e-?\d+)?$/.test(input);

CustomValidators.isArray = input => Array.isArray(input);

module.exports = CustomValidators;
