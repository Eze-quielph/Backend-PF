const startValidate = (req, res, next) => {
    req.errors = [];
    next();
}

const reqId = (req, res, next) => {
    const { id } = req.params;

    if(!id){
        req.errors.push('Es necesario el ID')
        next()
    }
    next()
}

const lengthId = (req, res, next) => {
    const { id } = req.params;

    if(id.length < 35){
        req.errors.push('El id es muy corto');
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
    reqId,
    lengthId,
    endValidation
]