const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../db/app");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Get/api/topics", () => {
  test("response with the status of 200 and all the available topics ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.topics.map((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
  test("response with the status of 404 and an apropriate error message", () => {
    return request(app)
      .get("/api/subject")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
});
