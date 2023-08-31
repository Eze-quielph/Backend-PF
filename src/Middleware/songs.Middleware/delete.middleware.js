const startValidation = async (req, res, next) => {
  req.errors = [];
  next();
};

const reqValue = (req, res, next) => {
  const { value } = req.body;
  if (value) next();
  else {
    req.errors.push("Value es necesario");
    next();
  }
};

const endValidation = async (req, res, next) => {
  if (req.error.length) {
    res.status(400).json({ error: req.errors });
  } else next();
};

module.exports = [startValidation, reqValue, endValidation];
