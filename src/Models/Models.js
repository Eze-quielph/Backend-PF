const User = require("./Users.model");
const Song = require("./Songs.model");
const Playlist = require("./Playlists.model");
const Payment = require("./Payment.model");

User.belongsToMany(Song, { through: "user_song" });
Song.belongsTo(User, { through: "user_song" });
User.belongsToMany(Playlist, { through: "playlist_user" });
Playlist.belongsTo(User, { through: "playlist_user" });
Song.belongsToMany(Playlist, { through: "song_playlist" });
Playlist.belongsToMany(Song, { through: "song_playlist" });
Payment.belongsToMany(User, { through: "Payment_User" });

module.exports = {
  User,
  Song,
  Playlist,
  Payment,
};
