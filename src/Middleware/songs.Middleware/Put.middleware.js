const { validationResult, check } = require("express-validator");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const validatePutRequest = [
  check(["name", "description", "artist", "genre"]).custom((value, { req }) => {
    const atLeastOneFieldExists = Object.values(req.body).some(
      (fieldValue) => !!fieldValue
    );
    if (!atLeastOneFieldExists) {
      throw new Error("Al menos un campo es requerido.");
    }
    return true;
  }),

  check("file").custom((value, { req }) => {
    console.log(req.file);
    if (!req.file.path) {
      throw new Error("Debe proporcionar una imagen.");
    }
    return true;
  }),
];

const validatePutMiddleware = (req, res, next) => {
  Promise.all(validatePutRequest.map((validation) => validation.run(req))).then(
    () => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  );
};

module.exports = validatePutMiddleware;
