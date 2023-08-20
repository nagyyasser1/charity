const commitSessionMiddleware = async (req, res, next) => {
  try {
    await req.session.commitTransaction();
  } catch (error) {
    await req.session.abortTransaction();
    next(error);
  } finally {
    req.session.endSession();
  }
  next();
};

module.exports = commitSessionMiddleware;
