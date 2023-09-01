const startValidate = (req, res, next) => {
    req.errors = [];
    next();
}

const reqName = (req, res, next) => {
    const { username } = req.params;

    if(!username){
        req.errors.push('Es necesario el ma,e')
        next()
    }
    next()
}

const lengthName = (req, res, next) => {
    const { username } = req.query;

    if(username.length < 3){
        req.errors.push('El name es muy corto');
        next()
    }
    next()
}

const endValidation = async (req, res, next) => {
    if (req.errors.length) {
      res.status(400).json({ error: req.errors });
    } else next();
  };

module.exports = [
    startValidate,
    reqName,
    lengthName,
    endValidation
]