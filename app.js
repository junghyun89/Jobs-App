const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config();
const jobsRouter = require('./routes/jobs');
const authRouter = require('./routes/auth');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //

app.use('/', jobsRouter);
app.use('/', authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Server is listening on port ${app.get('port')}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
