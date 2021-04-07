import Transformer from '../../utils/transformer';

const Validator = {};

Validator.create = (req, res, next) => {
  req.checkBody('user.username', 'the name supplied is invalid').isHumanName();;
  req.checkBody('user.email', 'invalid email supplied').isEmailV2();
  req.checkBody('user.address', 'The wallet address must be a valid bep20 wallet address').isValidAddress();
  req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').isPassword();
  req.asyncValidationErrors()
    .then(next)
    .catch(errors => res.status(400).json(Transformer.transformResponse(0,
      Transformer.transformExpressValidationErrors(errors))));
};

Validator.login = (req, res, next) => {
  req.checkBody('user.email', 'invalid email supplied').isEmailV2();
  req.checkBody('user.password', 'password must be at least 6 digits and less than 50 digits').isName();
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

// Validator.delete = (req, res, next) => {
//   req.checkParams('id', 'You supplied and invalid item id').isIdNumber();
//   req.asyncValidationErrors()
//     .then(next)
//     .catch(errors => res.status(400).json(Transformer.transformResponse(0,
//       Transformer.transformExpressValidationErrors(errors), errors)));
// };
module.exports = Validator;
