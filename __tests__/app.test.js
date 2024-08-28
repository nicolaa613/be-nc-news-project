const testData = require("../db/data/test-data/index");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const request = require("supertest");
const endpoints = require("../endpoints.json");

//what do we want out of our endpoints??

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("NC News API testing", () => {
  describe("GET /api/topics - will get all topics in the database", () => {
    test("/api/topics responds with a 200 status code", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("an array of topic objects, with the correct properties, is returned", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const topics = body.rows;
          expect(Array.isArray(topics)).toBe(true);
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
    test("a 404 status code and an error message is sent when an invalid address is requested", () => {
      return request(app)
        .get("/api/banana")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            "This is a bad request, endpoint not found!"
          );
        });
    });
  });
  describe("GET /api - will retrieve information on all of the available API endpoints", () => {
    test("/api responds with a 200 status", () => {
      return request(app).get("/api").expect(200);
    });
    test("/api responds with an object of all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((data) => {
          const parsedEndpointsData = JSON.parse(data.text);
          expect(typeof parsedEndpointsData).toBe("object");
          expect(parsedEndpointsData).toEqual(endpoints);
        });
    });
  });
  describe("GET /api/articles/:article_id - will retrieve an article by its requested id", () => {
    test("/api/articles/:article_id will return a 200 status code and an article with the correct properties, when a valid article_id is requested", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          const article = response.body;
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
    });
    test("/api/articles/:article_id will return a 400 status code and error message when the request is invalid", () => {
      return request(app)
        .get("/api/articles/cherries")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe(
            "This is a bad request, endpoint not found!"
          );
        });
    });
    test("/api/articles/:article_id returns a 404 status code and error message when the request is valid but doesn't exist", () => {
      return request(app)
        .get("/api/articles/700")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Article doesn't exist!");
        });
    });
  });
  describe("GET /api/articles - will retrieve all articles in the database", () => {
    test("respsonds with a 200 status code and an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          //I've manually checked comment_count, run a test potentially
          const articles = body.rows;
          expect(Array.isArray(articles)).toBe(true);
          articles.forEach((article) => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        });
    });
    test("the articles are sorted by date in descending order - newest to oldest", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const articles = body.rows
        expect(articles).toBeSortedBy('created_at', {descending: true})
      })
    })
    test("none of the articles have a body property", () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const articles = body.rows
        articles.forEach((article) => {
          expect(article).not.toHaveProperty('body')
        })
      })
    })
    test("a 404 status code and an error message is sent when an invalid address is requested", () => {
      return request(app)
        .get("/api/article")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            "This is a bad request, endpoint not found!"
          );
        });
    });
  });
});
