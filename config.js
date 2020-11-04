const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  port: process.env.PORT || 4200,
  tmdb_api_key: process.env.TMDB_API_KEY,
  firebase_api: process.env.FIREBASE_API_KEY
}