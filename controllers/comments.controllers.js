const { selectComments } = require("../models/comments.models");

exports.getArticleCommentsById = (req, res, next) => {
  const id = req.params.article_id;
  selectComments(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
