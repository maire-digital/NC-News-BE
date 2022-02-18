const db = require("../db/connection");

exports.checkIfArticleExists = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    });
};

exports.selectArticles = (sort_by = "created_at", order = "desc", topic) => {
  const acceptToSortBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];
  const acceptToOrder = ["asc", "desc"];
  const acceptAsTopic = ["mitch", "cats", "paper"];

  if (!acceptToSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (!acceptToOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  if (topic && !acceptAsTopic.includes(topic)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let inputQuery = `SELECT author, title, article_id, topic, created_at, votes FROM articles `;

  const queryValues = [];
  if (topic) {
    queryValues.push(topic);
    inputQuery += `WHERE topic = $1 `;
  }

  inputQuery += `ORDER BY ${sort_by} ${order};`;

  return db.query(inputQuery, queryValues).then(({ rows: articles }) => {
    if (articles.length === 0) {
      return Promise.reject({ status: 200, msg: "Articles not found" });
    }
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
