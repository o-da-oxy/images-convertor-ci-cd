import { NextFunction, Request, Response } from 'express';
import { createReadStream } from 'fs';
import { Storage } from '../../storage/image-info-storage';

export const ImageDownloadController = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id.slice(1, req.params.id.length);
  const storage = Storage.get(id);

  if (!storage || storage.status !== 'success') {
    return next(new Error('ImageDownloadController Error!'));
  }

  const imagePath = storage.inputFilePath;
  const read = createReadStream(imagePath);

  //считать из потока чтения в поток записи
  //readStream.pipe(writeStream);
  return read.pipe(res);
};
