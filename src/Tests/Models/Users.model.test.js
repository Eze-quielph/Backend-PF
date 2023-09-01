const { User, sequelize } = require("../../db");

describe("User model", () => {
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

  it("Should create a valid user", async () => {
    const userData = {
      username: "pedrito",
      password: "pedrito123",
      email: "pedrito123@example.com",
    };
    try {
      const user = await User.create(userData);
      expect(user.username).toBe(userData.username);
      expect(user.password).toBe(userData.password);
      expect(user.email).toBe(userData.email);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  it("Should fail to create a user without required data", async () => {
    const invalidUserData = {
      username: "pedrito",
      password: "pedrito123",
    };
    try {
      await User.create(invalidUserData);
    } catch (error) {
      expect(error).toBeInstanceOf(sequelize.Sequelize.ValidationError);
      expect(error.errors[0].message).toContain("email cannot be null");
    }
  });
});