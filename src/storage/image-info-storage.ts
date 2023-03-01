import { ImageInfo } from '../storage/image-info';

export class ImageInfoStorage<info> {
  // хранилище объектов ключ-значение <id имя файла, info о файле>
  private storage = new Map<string, info>();

  // достать по id, узнать статус
  get(id: string): info | undefined {
    return this.storage.get(id);
  }

  // добавить в хранилище
  set(id: string | undefined, info: info) {
    if (id) {
      this.storage.set(id, info);
      return this.storage.get(id);
    } else {
      throw new Error('ImageInfoStorage set Error!');
    }
  }

  // обновить статус
  // type Partial<info> - Make all properties in info optional
  update(id: string, info: Partial<info> = {}) {
    const item = this.get(id);

    if (!item) {
      throw new Error('This item does not exist!');
    }

    // ... spread (оператор расширения)
    // копирует все свойства item, а затем явно перезаписывает те, которые в info
    // в объекте это происходит без дублирования свойств
    this.storage.set(id, { ...item, ...info });
  }
}

export const Storage = new ImageInfoStorage<ImageInfo>();
