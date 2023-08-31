const { Playlist, sequelize } = require("../../db");

describe("Playlist model", () => {
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a valid playlist", async () => {
    const playlistData = {
      name: "Example",
      description: "Example",
    };
    try {
      const playlist = await Playlist.create(playlistData);
      expect(playlist.name).toBe(playlistData.name);
      expect(playlist.description).toBe(playlistData.description);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  });

  it("Should fail to create a playlist without required data", async () => {
    const invalidPlaylistData = {
      name: "Example",
    };
    try {
      await Playlist.create(invalidPlaylistData);
    } catch (error) {
      expect(error).toBeInstanceOf(sequelize.Sequelize.ValidationError);
      expect(error.errors[0].message).toContain("description cannot be null");
    }
  });
});