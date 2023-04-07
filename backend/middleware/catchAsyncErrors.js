module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

//this middleware is used in case there are missing inputs for the async function of the controllers
