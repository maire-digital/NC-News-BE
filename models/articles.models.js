const db = require("../db/connection");

exports.checkIfArticleExists = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then(({ rows }) => {
      if (rows === 0) {
        return Promise.reject({ status: 200, msg: "Article not found" });
      }
    });
};

exports.selectArticles = () => {
  return db
    .query("SELECT * FROM articles ORDER BY created_at desc;")
    .then(({ rows: articles }) => {
      return articles;
    });
};

exports.selectArticleById = (id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.comment_id)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
      [id]
    )
    .then(({ rows: article }) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return article[0];
    });
};

exports.updateArticleById = (id, updates) => {
  const { inc_votes } = updates;
  return db
    .query(
      "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;",
      [id, inc_votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
