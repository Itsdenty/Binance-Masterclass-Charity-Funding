import Transformer from '../../utils/transformer';

const Validator = {};

Validator.create = (req, res, next) => {
  req.checkBody('user.username', 'the name supplied is invalid').isHumanName();;
  req.checkBody('user.email', 'invalid email supplied').isEmailV2();
  // req.checkBody('user.address', 'The wallet address must be a valid bep20 wallet address').isValidAddress();
  req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').isPassword();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};

Validator.login = (req, res, next) => {
  req.checkBody('user.email', 'invalid email supplied').isEmailV2();
  req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').isPassword();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};


Validator.funding = (req, res, next) => {
  req.checkBody('description', 'description cannot be empty').isMinLen(100);
  req.checkBody('target_amount', 'target_amount must be a number').isNumber();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};
// Validator.update = (req, res, next) => {
//   req.checkParams('id', 'You supplied and invalid user id').isIdNumber();
//   req.checkBody('user.username', 'the name supplied is invalid').optional().isName();
//   req.checkBody('user.email', 'invalid email supplied').optional().isEmailV2();
//   req.checkBody('user.phone_number', 'The phone number must be equal to 11 digits').optional().isLengthEqual(11);
//   req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').optional().isName();
//   req.checkBody('user.role', 'invalid role was supplied').optional().isIdNumber();
//   req.checkBody('user.permissions', 'permission must be an array').optional().isPermission();
//   req.asyncValidationErrors()
//     .then(next)
//     .catch(errors => res.status(400).json(Transformer.transformResponse(0,
//       Transformer.transformExpressValidationErrors(errors))));
// };

Validator.get = (req, res, next) => {
  req.checkParams('address', 'You supplied an invalid user address').isIdNumber();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors), errors)));
};

Validator.swap = (req, res, next) => {
  req.checkBody('user.value1', 'value invalid').isNumber();
  req.checkBody('user.token1', 'token symbol invalid').isLengthEqual(3);
  req.checkBody('user.token2', 'value invalid').isLengthEqual(3);
  req.checkBody('user.value2', 'token symbol invalid').isNumber();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};

Validator.withdrawal = (req, res, next) => {
  req.checkBody('user.amount', 'withdrawal amount is invalid').isNumber();
  req.checkBody('user.address', 'The wallet address must be a valid bep20 wallet address').isValidAddress();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};

Validator.fundAccount = (req, res, next) => {
  req.checkBody('user.amount', 'withdrawal amount is invalid').isNumber();
  req.checkBody('user.address', 'The wallet address must be a valid bep20 wallet address').isValidAddress();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};
// Validator.delete = (req, res, next) => {
//   req.checkParams('id', 'You supplied and invalid item id').isIdNumber();
//   req.asyncValidationErrors()
//     .then(next)
//     .catch(errors => res.status(400).json(Transformer.transformResponse(0,
//       Transformer.transformExpressValidationErrors(errors), errors)));
// };
module.exports = Validator;
