const db = require("../db/connection");
const { checkIfArticleExists } = require("./articles.models");

exports.selectComments = (id) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1",
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        checkIfArticleExists(id);
      }
      return rows;
    });
};

exports.insertComment = (newComment) => {
  const { username, body } = newComment;
};
