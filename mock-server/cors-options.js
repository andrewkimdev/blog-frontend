const corsOptions = {
  origin: 'http://localhost:4200',  // replace with your application's URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;
