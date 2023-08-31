const startValidation = (req, res, next) => {
    req.errors = [];
    next()
}

const reqName = (req, res, next) => {
    const {name} = req.query

    if(!name){
        req.erros.push('Name es requerido')
        next()
    }else next()
}

const lengthName = (req, res, next) => {
    const {name} = req.query;

    if(name.length < 3){
        req.errors.push('name debe ser minimo tres caracteres')
        next()
    }else next()
}

const endValidation = (req, res, next) => {
    if(req.errors.length){
        res.status(400).json({errors: req.errors})
    }else {
        next()
    }
}

module.exports = [
    startValidation, 
    reqName,
    lengthName,
    endValidation
]