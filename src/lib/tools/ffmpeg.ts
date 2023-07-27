import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { arch } from 'os';
import { dirname, join } from 'path';

export async function downloadFfmpeg(): Promise<string | false> {
  return await new Promise((resolve, reject) => {
    const ffmpegPath =
      process.platform === 'win32'
        ? join(process.cwd(), '/environment/ffmpeg.exe')
        : join(process.cwd(), '/environment/ffmpeg');
    if (existsSync(ffmpegPath)) {
      resolve(ffmpegPath);
      return;
    }
    console.log('开始下载ffmpeg');
    mkdirSync(dirname(ffmpegPath), { recursive: true });
    axios
      .get(
        `https://cdn.npmmirror.com/binaries/ffmpeg-static/b6.0/ffmpeg-${
          process.platform
        }-${arch()}`,
        {
          responseType: 'arraybuffer'
        }
      )
      .then(res => {
        if (!res || !res.data) {
          resolve(false);
          return;
        }

        writeFileSync(ffmpegPath, res.data);
        resolve(ffmpegPath);
      })
      .catch(() => {
        resolve(false);
      });
  });
}
