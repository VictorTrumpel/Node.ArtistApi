import { UploadedFile } from 'express-fileupload';
import { ApiError, IApiError } from '../../../error/ApiError';
import path from 'path';

const ALLOWABLE_EXT = ['.jpg', '.png'];

export const songImgValid = (
  songImg: UploadedFile | UploadedFile[] | null
): {
  songImg: UploadedFile | null;
  err: IApiError | null;
} => {
  if (!songImg) {
    return {
      songImg: null,
      err: ApiError.internal('songImg: не добавлен файл')
    };
  }

  if (songImg instanceof Array) {
    return {
      songImg: null,
      err: ApiError.internal(
        'songImg: Добавлено несколько файлов, но требуется один'
      )
    };
  }

  const extname = path.extname(songImg.name);

  if (!~ALLOWABLE_EXT.indexOf(extname)) {
    return {
      songImg: null,
      err: ApiError.internal(
        `songImg: Допустимые расширения файла: ${ALLOWABLE_EXT.join(', ')}`
      )
    };
  }

  return { songImg, err: null };
};
