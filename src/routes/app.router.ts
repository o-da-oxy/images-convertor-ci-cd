import express from 'express';
import { routes as imagesRoutes } from '../images/images.router';
import { healthCheckController } from '../base-controllers/health-check.controller';
import { notFoundController } from '../base-controllers/not-found.controller';

const routes = express.Router();

routes.use('/images', imagesRoutes);
routes.use('/health', healthCheckController);
routes.use('*', notFoundController);

export { routes };
