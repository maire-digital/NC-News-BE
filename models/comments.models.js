const db = require("../db/connection");

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

exports.deleteCommentById = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkIfCommentExists = (id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    });
};
