import { NextFunction, Request, Response } from 'express';
import { Storage } from '../../storage/image-info-storage';

export const ImageStatusController = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.slice(1, req.params.id.length);
  const status = Storage.get(id)?.status;

  if (!status) {
    return next(new Error('ImageStatusController Error!'));
  }

  return res.json({ status: status });
};
