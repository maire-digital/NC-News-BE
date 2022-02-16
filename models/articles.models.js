const db = require("../db/connection");
const { convertTimestampToDate } = require("../db/helpers/utils");

exports.selectArticleById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ rows: article }) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return article[0];
    });
};
