import express from 'express';
import { ImageUploadController } from './upload/images-upload.controller';
import { ImageDownloadController } from './download/images-download.controller';
import { ImageStatusController } from './status/images-status.controller';
import { ImageMiddleware } from './upload/images-upload.middleware';
import { ImageUploadValidator } from './upload/images-upload.validator';

const routes = express.Router();

routes.post('/upload', ImageMiddleware, ImageUploadValidator, ImageUploadController);
routes.get('/download:id', ImageDownloadController);
routes.get('/status:id', ImageStatusController);

export { routes };
