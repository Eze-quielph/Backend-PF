const startValidation = (req, res, next) => {
    req.errors = [];
    next()
}

const reqValidate = (req, res, next) => {
    const {name} = req.body

    if(!name){
        req.errors.push('Name es requerido');
        next()
    }else {
        next()
    }
}

const lengthName = (req, res, next) => {
    const {name} = req.body

    if(name.length < 3){
        req.errors.push('Name debe ser minimo de 3 caracteres');
        next()
    }else {
        next()
    }
}

const reqValidateDescription = (req, res, next) => {
    const {description} = req.body

    if(!description){
        req.errors.push('description es requerido');
        next()
    }else {
        next()
    }
}

const lengthDescription = (req, res, next) => {
    const {description} = req.body

    if(description.length < 10){
        req.errors.push('description debe ser minimo de 10 caracteres');
        next()
    }else {
        next()
    }
}

const endValidation = (req, res, next) => {
    if(req.errors.length) {
        return res.status(400).json({error: req.errors})
    }else{
        next()
    }
}

module.exports = [
    startValidation,
    reqValidate,
    lengthName,
    reqValidateDescription,
    lengthDescription,
    endValidation
]