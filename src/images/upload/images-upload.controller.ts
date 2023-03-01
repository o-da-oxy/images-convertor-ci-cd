import { Request, Response } from 'express';
import { ImageInfo, ImageProcessStatus } from '../../storage/image-info';
import { Storage } from '../../storage/image-info-storage';
import { join } from 'node:path';
import { FilesConfig } from '../../config/files-config';
import { ImageTask } from '../../queue/image-task-queue';

export const ImageUploadController = (req: Request, res: Response) => {
  // Один пользователь - один файл за раз
  const file = req.file!;
  const targetFormat = req.body.format!; // целевой формат

  const oldName = file.originalname;
  const newName = file.filename;
  const id = newName?.split('.')[0];
  const newConvertedName = `${id}.${targetFormat}`;
  const inputPath = join(FilesConfig.input, newName);
  const outputPath = join(FilesConfig.output, newConvertedName);
  const processStatus = ImageProcessStatus.NoProcessed;

  // info
  const imageInfo: ImageInfo = {
    id: id,
    oldFileName: oldName,
    newFileName: newName,
    newConvertedFileName: newConvertedName,
    inputFilePath: inputPath,
    outputFilePath: outputPath,
    status: processStatus,
    targetFormat: targetFormat,
  };

  // положить info в хранилище
  Storage.set(id, imageInfo);
  // добавить в очередь (там сконвертировать и изменить статус)
  ImageTask.addObjectToQueue(Storage, Storage.get(id));

  res.send({ storage: Storage.get(id) });
};
