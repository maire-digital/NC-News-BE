const { selectComments, insertComment } = require("../models/comments.models");
const { checkIfArticleExists } = require("../models/articles.models");

exports.getArticleCommentsById = (req, res, next) => {
  const id = req.params.article_id;
  Promise.all([selectComments(id), checkIfArticleExists(id)])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  Promise.all([insertComment(id, req.body), checkIfArticleExists(id)])
    .then(([comment]) => {
      console.log(comment);
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
