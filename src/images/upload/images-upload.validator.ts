import { NextFunction, Request, Response } from 'express';

const SUPPORTED_FORMATS: string[] = ['webp', 'jpeg', 'png'];

export const ImageUploadValidator = (req: Request, res: Response, next: NextFunction) => {
  const { format } = req.body;

  if (SUPPORTED_FORMATS.includes(format)) {
    return next();
  }

  const error = new Error('ImageUploadValidator: Unsupported format for convert');
  res.json({ errorMessage: error.message });
};
