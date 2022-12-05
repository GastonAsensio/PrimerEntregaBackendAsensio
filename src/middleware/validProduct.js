const validProduct = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) return res.status(400).send({ err: "This data is required!" });
    next();
  }

  module.exports = validProduct