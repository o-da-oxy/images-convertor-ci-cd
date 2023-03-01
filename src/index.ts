import express from 'express';
import morgan from 'morgan';
import { routes } from './routes/app.router';
import { FilesConfig } from '../src/config/files-config';
import { existsSync, mkdirSync } from 'fs';
const logger = morgan('dev');
const helmet = require('helmet'); //безопасность

require('dotenv').config();

if (!existsSync(FilesConfig.output)) {
  mkdirSync(FilesConfig.output);
}
if (!existsSync(FilesConfig.input)) {
  mkdirSync(FilesConfig.input);
}

const app = express();

app.use(helmet());
app.use(logger);
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
