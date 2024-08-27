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
      return request(app)
        .get("/api")
        .expect(200)
    });
    test("/api responds with an object of all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((data) => {
          const parsedEndpointsData = JSON.parse(data.text)
          expect(typeof parsedEndpointsData).toBe("object")
          expect(parsedEndpointsData).toEqual(endpoints)
        });
    });
  });
});
