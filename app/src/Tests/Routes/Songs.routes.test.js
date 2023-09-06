const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

describe("Songs routes", () => {
  describe("GET /song", () => {
    it("Should return an array of songs", async () => {
      const response = await request.get("/song");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /song/name", () => {
    it("Should return an array of songs that contain the specified string in their names", async () => {
      const songName = "es";
      const response = await request.get(`/song/name?name=${songName}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.result)).toBe(true);
      response.body.result.forEach((songs) => {
        expect(songs.name.toLowerCase()).toContain(songName.toLowerCase());
      });
    });
  });
});