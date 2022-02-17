const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("app", () => {
  describe("GET - /api/topics", () => {
    test("Status 200 - responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
        });
    });
    test("Status 200 - each topic object has slug and description properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
    test("Status 404, responds with path not found for incorrect path", () => {
      return request(app)
        .get("/api/not-a-path")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Path not found");
        });
    });
  });
  describe("GET - /api/articles/:article:id", () => {
    test("Status 200 - responds with single matching article object", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            author: "icellusedkars",
            title: "Sony Vaio; or, The Laptop",
            article_id: 2,
            body: expect.any(String),
            topic: "mitch",
            created_at: expect.any(String),
            votes: 0,
          });
        });
    });
    test("Status 404 - responds with error for resource that does not exist", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article not found");
        });
    });

    test("Status 400 - responds with error when passed bad article_id", () => {
      return request(app)
        .get("/api/articles/not-an-article")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });
  describe("PATCH - /api/articles/:article_id", () => {
    test("Status 200 - responds with updated article", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/2")
        .send(articleUpdates)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            author: "icellusedkars",
            title: "Sony Vaio; or, The Laptop",
            article_id: 2,
            body: expect.any(String),
            topic: "mitch",
            created_at: expect.any(String),
            votes: 1,
          });
        });
    });
    test("Status 400 - responds with error when passed bad request body", () => {
      const articleUpdates = {
        inc_votes: "Not valid increment",
      };
      return request(app)
        .patch("/api/articles/2")
        .send(articleUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("Status 400 - responds with error when passed empty request body", () => {
      const articleUpdates = {};
      return request(app)
        .patch("/api/articles/2")
        .send(articleUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request, cannot be null");
        });
    });
  });
  describe("GET /api/users", () => {
    test("Status 200 - responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(4);
        });
    });
    test("Status 200 - each user object has username property", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/articles", () => {
    test("Status 200 - responds with an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toHaveLength(12);
        });
    });
    test("Status 200 - each article object contains expected properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(article).toEqual({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            });
          });
        });
    });
    test("Status 200 - articles are sorted by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
  describe("GET /api/articles/:article:id (comment count feature", () => {
    test("Status 200 - responds with article with comment_count property", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual(
            expect.objectContaining({ comment_count: expect.any(Number) })
          );
        });
    });
  });
});
