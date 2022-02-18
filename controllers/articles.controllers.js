const {
  selectArticles,
  selectArticleById,
  updateArticleById,
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  selectArticles(sort_by, order, topic)
    .then((articles) => {
      return res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const id = req.params.article_id;
  updateArticleById(id, req.body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
