const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const router = require('./router/routes');
const errorHandler = require('./middlewares/ErrorHandler');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://future-domain.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message }) => {
        return `[${level}] ${message} `;
      }),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
  }),
);

app.use(router);
app.use(errorHandler);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message }) => {
        return `[${level}] ${message}`;
      }),
    ),
  }),
);

app.listen(port, () => {
  console.log(
    `Server running with ${process.env.NODE_ENV} mode on port ${port}`,
  );
});

module.exports = app;
