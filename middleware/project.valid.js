module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }

  try {
    const body = req.body;

    if (Number.isInteger(Number(body.id)) && !!body.id) {
      return next();
    }

    throw new Error("Не верный формат id");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
