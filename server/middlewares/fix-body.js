const fix = {};

fix.upload = (req, res, next) => {
  console.log(req.fields);
  let { description, target_amount, token } = req.fields;
  req.body = {
      description, target_amount, token
  }
  next();
};

module.exports = fix;