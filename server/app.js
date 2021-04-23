import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import bodyParser from 'body-parser';
import validator from 'express-validator';
import path from 'path';
import routes from './routes/api';
import resetVotes from './reset-vote-allowance';
import multer from 'multer';
import shortid from 'short-id';
import IPFS from 'ipfs-api';
import customValidator from './middlewares/validators/custom-validators';
import customSanitizer from './middlewares/validators/custom-sanitizer';
import formidable from 'express-formidable';
// import IPFS from 'ipfs-http-client';

// const upload = require('multer');


// const shortid = require('short-id')
// const IPFS =require('ipfs-api');
const ipfs = IPFS({ host: 'ipfs.infura.io',
    port: 5001,protocol: 'https' });

// const ipfs = IPFS('https://ipfs.infura.io:5001');

const app = express();
const port = process.env.PORT || '3300';

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors());
app.options('*', cors());
// configure bodyParser
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies
// app.use(formidable());
// app.use(multer().array());

// configure validator
app.use(validator({ customValidators: customValidator, customSanitizers: customSanitizer }));

app.use(express.static('app'));


app.get('/', function(req, res){
  res.redirect('/index.html');
});

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
  // resetVotes();
});

app.post('/upload', multer().single('buffer'), async (req,res)=>{
  let buffer = req.file.buffer
  let name = req.body.name
  let title = req.body.title
  if(buffer && title){
    let ipfsHash = await ipfs.add(buffer)
    let hash = ipfsHash[0].hash;
    res.send(hash);
  }else{
    console.log(buffer, title)
    console.log(req.file);
      res.status(400).json({"status":"Failed", "reason":"wrong input"})
  }
})

app.get('/proof/:hash', async (req,res) => {
  const hash = req.params.hash;
  console.log(hash);
  // let data = await ipfs.get(hash)
  let data = await ipfs.files.get(hash);

// for await (const file of ipfs.get(hash)) {
//   console.log(file.type, file.path)

//   if (!file.content) continue;

//   const content = []
//   // file.content.pipe(res);
//   console.log(file);
//   // res.send(file.content);
//   for await (const chunk of file.content) {
//     content.push(chunk)
//   }

//   console.log(content)
//   res.end(Buffer.from(content, 'base64'));
//   // res.send(content);
// }
  console.log(data);
  // res.json({"status":"success", data: data.content})
  // res.send(data);
  res.end(Buffer.from(data[0].content, 'base64'));
  // data.content.pipe(res);
})
export default app;
