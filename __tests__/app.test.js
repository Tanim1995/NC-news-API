const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../db/app");
const endpoints = require("../endpoints.json");
const { removeComments } = require("../models/comments-model");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("Get/api/topics", () => {
  test("response with the status of 200 and array of all the available topics ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBeGreaterThan(0);

        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});
describe("General invalid url test", () => {
  test("response with the status of 404 and an apropriate error message", () => {
    return request(app)
      .get("/api/subject")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
});
describe("GET/api", () => {
  test("response with the status of 200 and an object with all endpoints and there details", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});
describe("GET/api/articles/:article_id", () => {
  test("response with the status of 200 and an article object", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toBeDefined();
        expect(body.article).toMatchObject({
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
  test("response with the status of 404 and an appropriate error message if id number does not exist", () => {
    return request(app)
      .get("/api/articles/50")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
  test("response with the status of 400 and an appropriate error message if invalid path is given", () => {
    return request(app)
      .get("/api/articles/notanumber")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad Request");
      });
  });
  test("response with the status of 200 and array of all the available articles sorted from descending order with comment count attached ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        expect(body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
        body.articles.forEach((article) => {
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
  test("response with the status of 200 and array of all the available articles sorted by order and sort_by given ", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        expect(body.articles).toBeSortedBy("title");
        body.articles.forEach((article) => {
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
  test("response with the status of 400 and an appropriate error message if sort_by catergory does not exist", () => {
    return request(app)
      .get("/api/articles?sort_by=titles")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad Request");
      });
  });
  test("response with the status of 400 and an appropriate error message if order catergory does not exist", () => {
    return request(app)
      .get("/api/articles?order=decending")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad Request");
      });
  });
  test("response with the status of 200 and array of all the available comments for the given article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments).toBeSortedBy("created_at", {
          descending: true,
        });
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            article_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
            body: expect.any(String),
          });
        });
      });
  });
  test("response with the status of 404 and an appropriate error message if invalid id is used", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
  test("response with the status of 400 and an appropriate error message if parameter id is not an id ", () => {
    return request(app)
      .get("/api/articles/notAnId/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad Request");
      });
  });
  test("get 201 response with a new posted comment", () => {
    const newComment = {
      userName: "lurker",
      body: "Good work on the article",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toBe("Good work on the article");
      });
  });

  test("response with the status of 404 and an appropriate error message if invalid username is given", () => {
    const newComment = {
      userName: "Tanim",
      body: "Good work on the article",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
  test("response with the status of 404 and an appropriate error message if  article id  is not within range", () => {
    const newComment = {
      username: "lurker",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });

  test("response with the status of 200 and an updated  article object", () => {
    const update = { inc_votes: 1 };
    const articleId = 4;

    return request(app)
      .patch("/api/articles/4")
      .send(update)
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0]).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
        expect(body.article[0].votes).toBe(1);
        expect(body.article[0].article_id).toBe(articleId);
      });
  });
});
test("response with the status of 400 with apropriate response if update object is empty ", () => {
  const update = {};

  return request(app)
    .patch("/api/articles/4")
    .send(update)
    .expect(400)
    .then((res) => {
      expect(res.body.message).toBe("Bad Request");
    });
});
test("response with the status of 400 with apropriate response if update object is invalid type of information ", () => {
  const update = { inc_votes: "words" };

  return request(app)
    .patch("/api/articles/4")
    .send(update)
    .expect(400)
    .then((res) => {
      expect(res.body.message).toBe("Bad Request");
    });
});
test(" response with 204 and deletes the comment", () => {
  const commentIdToDelete = 1;

  return request(app)
    .delete(`/api/comments/${commentIdToDelete}`)
    .expect(204)
    .then(() => {
      return removeComments(commentIdToDelete).then((result) => {
        expect(result.rowCount).toBe(0);
      });
    });
});

describe("users endpoint ", () => {
  test("response with the status of 200 and array of all the available users ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOf(Array);
        expect(body.users.length).toBeGreaterThan(0);

        body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("response with the status of 404 and an appropriate error message if wrong endpoint name is used ", () => {
    return request(app)
      .get("/api/userssss")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
});
test("response with the status of 200 and array of all the available articles sorted by order and sort_by given ", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {

        
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBeGreaterThan(0);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            
          });
          expect(article.topic).toBe("cats");
        });
      });
  });
  test("response with the status of 404 and an appropriate error message if the topic doesn't exist ", () => {
    return request(app)
      .get("/api/articles?topic=fish")
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Not Found");
      });
  });
  test("response with the status of 400 and an appropriate error message if the topic doesn't exist ", () => {
    return request(app)
      .get("/api/articles?topic=9999")
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Bad Request");
      });
  });