const startValidation = (req, res, next) => {
    req.errors = [];
    next();
  };
  
  const ReqValidate = (req, res, next) => {
    const { username, password, email} = req.body;

    if (username && password && email) {
      next();
    } else {
      req.erros.push("Es necesario todos los items");
    }
  };
  
  const nameValidate = (req, res, next) => {
    const { username } = req.body;
    if (username && username.length < 2) {
      req.errors.push("username debe ser mayor a 3");
      next();
    } else {
      next();
    }
  };

  const emailValidate = (req, res, next) => {
    const { email } = req.body;
    if (email && email.length < 5) {
      req.errors.push("email debe ser mayor a 5 caracteres");
      next();
    } else {
      next();
    }
  };

  const emailFormatValidate = (req, res, next) => {
    const { email } = req.body;
    if (email && !email.includes('@')) {
      req.errors.push("email debe ser example@example.com");
      next();
    } else {
      next();
    }
  };
  
  const passwordValidate = (req, res, next) => {
    const { password } = req.body;
    if (password && password.length < 5) {
      req.errors.push("password debe ser mayor a 5");
      next();
    } else {
      next();
    }
  };
  
  
  const endValidation = (req, res, next) => {
    if (req.errors.length) {
      res.status(400).json({ errors: req.errors });
    } else {
      next();
    }
  };
  
  module.exports = [
    startValidation,
    ReqValidate,
    nameValidate,
    passwordValidate,
    emailValidate,
    emailFormatValidate,
    endValidation,
  ];
  