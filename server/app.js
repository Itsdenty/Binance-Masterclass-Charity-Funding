import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import path from 'path';
import routes from './routes/api';

const app = express();
const port = process.env.PORT || '3300';

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors());
app.options('*', cors());
// configure bodyParser
app.use(bodyParser.json());

// configure validator
app.use(validator());

// configure swagger-ui
app.use('/api-docs', express.static(
  path.join(__dirname, '../server/public'),
));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
// use the defined routes
app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err);
  if (err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send((500, err));
  }
});


app.listen(port || 3000, () => {
  console.log(`Started on port ${port}`);
});

export default app;
