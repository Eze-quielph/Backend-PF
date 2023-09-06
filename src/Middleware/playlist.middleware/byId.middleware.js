const startValidation = (req, res, next) => {
    req.errors = [];
    next()
}

const byIdReq = (req, res, next) =>{
    const {id} = req.params

    if(!id) {
        req.erros.push('Se necesita un ID');
        next()
    }else next()
}

const lengthId = (req, res, next) => {
    const {id} = req.params

    if(id.length < 35){
        req.erros.push('Longitud muy corta');
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
    byIdReq,
    lengthId,
    endValidation
]