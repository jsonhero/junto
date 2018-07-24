import config from 'config';
import bodyParser from 'body-parser';
import Express from 'express';
import http from 'http';
import mongoose from 'mongoose'
import cors from 'cors'

const app = new Express();

const PORT = config.get('port');

const dbURI = config.get('database.uri')
mongoose.connect(dbURI, (err) => {
  if (err) console.log('Database failed to connect:', err)
  else console.log('Database connected')
})

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

import api from './api'

app.use('/', api)


const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
})
