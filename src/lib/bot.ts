import { CreateAPI } from 'kook-api';
import check from './check';
import KBot from '../KBot';
import { createWs } from './createws';
import { downloadFfmpeg } from './tools/ffmpeg';

export default class Bot {
  async run() {
    // 检查配置
    const config = await check();

    if (!config) return;

    // 下载ffmpeg
    const ffmpegPath = await downloadFfmpeg();
    if (!ffmpegPath) {
      console.log('ffmpeg下载失败');
    } else {
      console.log('ffmpeg下载成功');
      KBot.ffmpegPath = ffmpegPath;
    }

    // 创建 client
    KBot.client = CreateAPI(config.config);
    // 初始化ws
    await createWs();
  }
}
