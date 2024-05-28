const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../db/app");
const endpoints = require("../endpoints.json")

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Get/api/topics", () => {
  test("response with the status of 200 and array of all the available topics ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBeGreaterThan(0)
        
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });

  
});
describe('General invalid url test', () => {
    test("response with the status of 404 and an apropriate error message", () => {
    return request(app)
      .get("/api/subject")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });

});
describe('GET/api', () => {
    test("response with the status of 200 and an object with all endpoints and there details", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual(endpoints)
        
      });
  });
});
