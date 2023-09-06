const startValidation = (req, res, next) => {
  req.errors = [];
  next();
};

const ReqValidate = (req, res, next) => {
  const { name, description, artist, genre } = req.body;
  const files = req.files;
  console.log(files);
  if (name && description && artist && genre) {
    next();
  } else {
    req.erros.push("Es necesario todos los items");
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
  descriptionValidate,
  artistValidate,
  genreValidate,
  endValidation,
];
