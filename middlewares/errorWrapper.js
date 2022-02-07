const errorWrapper = async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (err) {
    next(err);
  }
};

export default errorWrapper;
