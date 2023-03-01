import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { FilesConfig } from '../../config/files-config';
import path from 'node:path';
import { nanoid } from 'nanoid';

const MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
// Максимальный размер 1-го документа не более 50mb
const MAX_FILE_SIZE = 52428800;

//хранилище
const fileStorage = multer.diskStorage({
  //путь куда положить несконвертированный файл из body запроса
  destination: (req, file, callback) => {
    return callback(null, FilesConfig.input);
  },
  //новое имя файла
  filename: (req, file, callback) => {
    //extname (extension name) возвращает extension name c точкой
    const extName = path.extname(file.originalname);
    const id = nanoid();
    const fileName = `${id}${extName}`;
    return callback(null, fileName);
  },
});

//если это картинка - пропускаем, если не картинка - нет
//MIME (Multipurpose Internet Mail Extensions) type
const fileTypeFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Unsupported MIME type'));
  }
};

/*
dest или storage:	Где хранить файлы
fileFilter:	Функция для контроля того, какие файлы принимаются
limits:	Ограничения загружаемых данных
preservePath:	Сохраняйте полный путь к файлам, а не только базовое имя
*/
export const MulterConfig: multer.Options = {
  storage: fileStorage,
  fileFilter: fileTypeFilter,
  limits: { fileSize: MAX_FILE_SIZE },
};

// Для каждого клиента, сервер одновременно может обрабатываться не более чем 1 документ
//загрузить одну картинку через postman с ключом 'image'
export const ImageMiddleware = multer(MulterConfig).single('image');
