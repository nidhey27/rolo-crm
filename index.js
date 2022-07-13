const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config();

const _PORT = process.env.PORT || 3000;

app.use(morgan('combined', { stream: logger.stream }));

var corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(upload.array('filetoupload'));

const db = require('./models');
db.sequelize.sync({ alter: true });

app.get('/', async (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: 'Rolo CRM API',
    author: 'Nidhey Indurkar',
    github: 'https://github.com/nidhey27',
  });
});

require("./routes/admin.routes")(app);

// require('./routes/customer.routes')(app);
// require('./routes/sales.routes')(app);
// require('./routes/inventory.routes')(app);
// require('./routes/admin.routes')(app);

app.listen(_PORT, () => {
  logger.info(`App is UP and Running at PORT: ${require('os').hostname()}:${_PORT}`);
});
