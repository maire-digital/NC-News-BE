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
});
