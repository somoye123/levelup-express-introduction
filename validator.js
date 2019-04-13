/**
 * Express Middleware that validates request body
 * @param requiredFields An array of required fields that we expect to be in the request body
 */
const validator = function(requiredFields) {
  return function(req, res, next) {
    // Check if the request body contains the required fields
    const requestFields = Object.keys(req.body);

    requiredFields.forEach(field => {
      if (!requestFields.includes(field))
        throw new Error(`${field} is required`);
    });

    next();
  };
};

module.exports = validator;
