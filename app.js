const express = require("express");
const cors = require('cors');
const { getEndpointsJson } = require("./controllers/endpoints.controllers");
const { getTopics } = require("./controllers/topics.controllers");
const {
  handleCustoms,
  handle500s,
  handlePsqlErrors,
} = require("./controllers/error.controllers");
const {
  getArticles,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getArticleCommentsById,
  postComment,
  removeCommentById,
} = require("./controllers/comments.controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", getEndpointsJson);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleCommentsById);
app.patch("/api/articles/:article_id", patchArticleById);
app.post("/api/articles/:article_id/comments", postComment);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", removeCommentById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use(handlePsqlErrors);
app.use(handleCustoms);
app.use(handle500s);

module.exports = app;
