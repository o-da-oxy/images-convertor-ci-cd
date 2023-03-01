import { ImageInfo, ImageProcessStatus } from '../storage/image-info';
import sharp from 'sharp';
import { ImageInfoStorage, Storage } from '../storage/image-info-storage';

const ImageTaskQueue = () => {
  const queueImageInfo = new Map<string, ImageInfo>();

  const convert = () => {
    setTimeout(async () => {
      // достать 3 ключа из Map (Всего может обрабатываться не более трех документов за раз)
      const imageInfoArray = Array.from(queueImageInfo.keys()).slice(0, 2);
      for (const queueImageInfoKey of imageInfoArray) {
        // по этим ключам доставать объекты ImageInfo
        const imageInfo = queueImageInfo.get(queueImageInfoKey)!;
        // конвертировать и поменять статус
        try {
          if (imageInfo.targetFormat === 'webp') {
            await sharp(imageInfo.inputFilePath).webp().toFile(imageInfo.outputFilePath);
            Storage.update(imageInfo?.id, { status: ImageProcessStatus.Success });
          } else if (imageInfo.targetFormat === 'jpeg') {
            await sharp(imageInfo.inputFilePath).jpeg().toFile(imageInfo.outputFilePath);
            Storage.update(imageInfo?.id, { status: ImageProcessStatus.Success });
          } else if (imageInfo.targetFormat === 'png') {
            await sharp(imageInfo.inputFilePath).png().toFile(imageInfo.outputFilePath);
            Storage.update(imageInfo?.id, { status: ImageProcessStatus.Success });
          }
        } catch {
          Storage.update(imageInfo?.id, { status: ImageProcessStatus.Failure });
          console.log('ImageTaskQueue convert Error!');
        }
        // удалять эти ключи из Map
        queueImageInfo.delete(queueImageInfoKey);
      }
      convert();
    }, 500);
  };

  convert();

  return {
    addObjectToQueue: (storage: ImageInfoStorage<ImageInfo>, imageInfo: ImageInfo | undefined) => {
      console.log(queueImageInfo.size);
      if (imageInfo?.id) {
        queueImageInfo.set(imageInfo?.id, imageInfo);
        Storage.update(imageInfo?.id, { status: ImageProcessStatus.Processing });
      }
    },
  };
};

export const ImageTask = ImageTaskQueue();
