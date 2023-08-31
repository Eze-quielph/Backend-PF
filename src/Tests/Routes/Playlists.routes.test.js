const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

describe("Playlists routes", () => {
  describe("GET /playlists", () => {
    it("Should return an array of playlists", async () => {
      const response = await request.get("/playlists");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});