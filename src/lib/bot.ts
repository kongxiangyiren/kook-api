import { CreateAPI } from 'kook-api';
import check from './check';
import KBot from '../KBot';
import { createWs } from './createws';
import ffmpegDownload from 'alemon-ffmpeg';

export default class Bot {
  async run() {
    // 检查配置
    const config = await check();

    if (!config) return;

    // 下载ffmpeg
    await ffmpegDownload();

    // 创建 client
    KBot.client = CreateAPI(config.config);
    // 初始化ws
    await createWs();
  }
}
