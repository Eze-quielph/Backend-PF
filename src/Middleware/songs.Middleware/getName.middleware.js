const { query, validationResult } = require('express-validator');

const handleValidationError = (errors) => {
  const errorMessages = [];
  errors.forEach((error) => {
    errorMessages.push(error.msg);
  });
  return errorMessages;
};

const validateInputMiddleware = [
    query('name')
    .custom((value, { req }) => {
      if (!value) {
        throw new Error('Debe proporcionar un nombre');
      }
      return true;
    })
    .trim()
    .isLength({ min: 1 }).withMessage('Name debe tener al menos 3 caracteres')
    .isString().withMessage('Name debe ser un string'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = handleValidationError(errors.array());
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  }
];

module.exports = validateInputMiddleware;
