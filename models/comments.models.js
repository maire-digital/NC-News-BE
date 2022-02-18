const db = require("../db/connection");
const { checkIfArticleExists } = require("./articles.models");

exports.selectComments = (id) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1",
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertComment = (id, newComment) => {
  const { username, body } = newComment;
  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3)RETURNING *;",
      [id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
