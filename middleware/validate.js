const { validationResult } = require('express-validator');

function validate(validations) {
    return async (req, res, next) => {
        await runValidations(validations, req);

        const errors = validationResult(req);
        if (errors.isEmpty()) return next();

        return res.status(400).json({ errors: formatErrors(errors.array()) });
    };
}

async function runValidations(validations, req) {
  for (const validator of validations) {
    await validator.run(req);
  }
}

function formatErrors(errorArray) {
  return errorArray.reduce((acc, curr) => {
    acc[curr.path] = curr.msg;
    return acc;
  }, {});
}

module.exports = validate;
