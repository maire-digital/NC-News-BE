exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "Bad request" });
  else if (err.code === "23502")
    res.status(400).send({ msg: "Bad request, cannot be null" });
  else if (err.code === "23503") {
    if (err.constraint === "comments_article_id_fkey") {
      res.status(404).send({ msg: "Article not found" });
    } else res.status(400).send({ msg: "Bad request" });
  } else next(err);
};

exports.handleCustoms = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handle500s = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
};
