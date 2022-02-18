const {
  selectComments,
  insertComment,
  deleteCommentById,
  checkIfCommentExists,
} = require("../models/comments.models");
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
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeCommentById = (req, res, next) => {
  const id = req.params.comment_id;
  Promise.all([checkIfCommentExists(id), deleteCommentById(id)])
    .then(([comment]) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
