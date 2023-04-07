module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

//this middleware is used in case there are missing inputs for the async function of the controllers
// if an error occurs during an asynchronous operation, the error will be thrown outside the normal flow of execution, and the application may crash or behave unexpectedly.
