import sharp, { AvailableFormatInfo, FormatEnum } from 'sharp';

export enum ImageProcessStatus {
  NoProcessed = 'noProcessed',
  Processing = 'processing',
  Success = 'success',
  Failure = 'failure',
}

export interface ImageInfo {
  id: string;
  oldFileName: string;
  newFileName: string;
  newConvertedFileName: string;
  inputFilePath: string;
  outputFilePath: string;
  status: ImageProcessStatus;
  targetFormat: string;
}
