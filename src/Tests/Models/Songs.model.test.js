const { Song, sequelize } = require("../../db");

describe("Song model", () => {
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

  it("Should create a valid song", async () => {
    const songData = {
      name: "Example",
      song: "Example.mp3",
      description: "lorem ....",
      artist: "Example",
      genre: "Example",
      image: "Example.jpg",
    };
    try {
      const song = await Song.create(songData);
      expect(song.name).toBe(songData.name);
      expect(song.song).toBe(songData.song);
      expect(song.description).toBe(songData.description);
      expect(song.artist).toBe(songData.artist);
      expect(song.genre).toBe(songData.genre);
      expect(song.image).toBe(songData.image);
    } catch (error) {
      console.error("Error creating song:", error);
    }
  });

  it("Should fail to create a song without required data", async () => {
    const invalidSongData = {
      name: "Example",
      song: "Example.mp3",
    };
    try {
      await Song.create(invalidSongData);
    } catch (error) {
      expect(error).toBeInstanceOf(sequelize.Sequelize.ValidationError);
      expect(error.errors[0].message).toContain(
        "song.description cannot be null" ||
          "song.artist cannot be null" ||
          "song.genre cannot be null" ||
          "song.image cannot be null"
      );
    }
  });
});