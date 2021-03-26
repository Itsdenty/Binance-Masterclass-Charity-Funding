/* eslint-disable no-else-return */
import userErrors from './userErrors';
import depErrors from './depErrors';
import logger from './logger';

const transformer = {};
transformer.transformExpressValidationErrors = (errors) => {
  let msgs = '';
  let usr1;
  let usr8;
  let usr6;
  let dep1;
  let usr2 = '';
  if (!Array.isArray(errors)) return msgs;
  logger.error({ errors });
  errors.forEach((item) => {
    if (item.param === 'email' || item.param === 'password') {
      usr1 = usr1 ? `${usr1} & ${item.param}` : item.param;
    } else if (item.param === 'shipping_region_id') {
      usr8 = 'shipping_region_id';
      msgs = item.msg;
    } else if (item.param === 'day_phone' || item.param === 'eve_phone' || item.param === 'mob_phone') {
      usr6 = item.param;
      msgs = item.msg;
    } else if (item.param === 'department_id') {
      dep1 = item.param;
    } else if (!usr2.includes(item.param)) {
      usr2 += ` ${item.param} |`;
      msgs += ` ${item.msg} |`;
    }
  });

  if (usr1) {
    return userErrors.usr1(usr1, 400);
  } else if (usr8) {
    return userErrors.usr8(usr8, 400, msgs);
  } else if (usr6) {
    return userErrors.usr6(usr6, 400, msgs);
  } else if (dep1) {
    return depErrors.dep1();
  }
  return userErrors.usr2(usr2, 400, msgs);
};

export default transformer;
