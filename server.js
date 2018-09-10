const app = require('./app');
const debug = require('debug');
const db = require('./models');

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    debug(`App listening on PORT ${PORT}`);
  });
});
