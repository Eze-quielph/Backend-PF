const startValidate = (req, res, next) => {
    req.errors = [];
    next();
  };
  
  const byId = (req, res, next) => {
    const {id} = req.params
  
    if(id) next()
    else{
      req.errors.push("si o si debe mandar un id");
      next();
    }
  }
  
  const byIdLength = (req, res, next) => {
    const {id} = req.params
  
    if(id && id.length > 30) next()
    else{
      req.errors.push("su id es muy corto");
      next();
    }
  }
  
  const putValidate = (req, res, next) => {
    const { username, password, email } = req.body;
    const file = req.file;
    if (username || password || email || file) next();
    else {
      req.errors.push("si o si debe mandar un campo");
      next();
    }
  };
  
  const usernameValidate = (req, res, next) => {
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
    if (email && email.length < 20) {
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
  
 
  
  const endValidate = (req, res, next) => {
    if (req.errors.length) {
      return res.status(400).json({ errors: req.errors });
    } else {
      next();
    }
  };
  
  module.exports = [
    byId,
    byIdLength,
    startValidate,
    putValidate,
    usernameValidate,
    emailValidate,
    emailFormatValidate,
    passwordValidate,
    endValidate,
  ];
  