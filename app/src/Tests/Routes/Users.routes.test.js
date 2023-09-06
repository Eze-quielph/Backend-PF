const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

describe("Users routes", () => {
  describe("GET /users", () => {
    it("Should return an array of users", async () => {
      const response = await request.get("/users");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});