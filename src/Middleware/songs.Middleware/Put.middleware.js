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
  const { name, description, artist, genre } = req.body;
  const file = req.file;
  if (name || description || artist || genre || file) next();
  else {
    req.errors.push("si o si debe mandar un campo");
    next();
  }
};

const nameValidate = (req, res, next) => {
  const { name } = req.body;
  if (name && name.length < 2) {
    req.errors.push("Name debe ser mayor a 3");
    next();
  } else {
    next();
  }
};

const descriptionValidate = (req, res, next) => {
  const { description } = req.body;
  if (description && description.length < 20) {
    req.errors.push("description debe ser mayor a 20 caracteres");
    next();
  } else {
    next();
  }
};

const artistValidate = (req, res, next) => {
  const { artist } = req.body;
  if (artist && artist.length < 3) {
    req.errors.push("artirst debe ser mayor a 3");
    next();
  } else {
    next();
  }
};

const genreValidate = (req, res, next) => {
  const { genre } = req.body;
  if (genre && genre.length < 2) {
    req.errors.push("artirst debe ser mayor a 2");
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
  nameValidate,
  descriptionValidate,
  artistValidate,
  genreValidate,
  endValidate,
];
