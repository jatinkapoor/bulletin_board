module.exports = {
  "optionsDev": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "hello123",
    "database": "bulletin_board"
  },
  "optionsProd": {
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_PORT),
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
  }
}