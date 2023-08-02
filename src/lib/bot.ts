import { CreateAPI } from 'kook-api';
import check from './check';
import KBot from '../KBot';
import { createWs } from './createws';
import { downloadFfmpeg } from './tools/ffmpeg';
import { execSync } from 'child_process';
import { dirname } from 'path';
const AddPATH: string[] = [];
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

      if (process.platform === 'linux') {
        console.log('添加运行权限');
        execSync('chmod +x ' + ffmpegPath);
      }
      // 将ffmpeg添加到环境变量
      AddPATH.push(dirname(ffmpegPath));

      // KBot.ffmpegPath = ffmpegPath;
    }

    // 临时添加到环境变量
    const PATH = process.env.PATH as string;
    const splitUp = process.platform === 'win32' ? ';' : ':';
    process.env.PATH = AddPATH.join(splitUp) + splitUp + PATH;
    
    // 创建 client
    KBot.client = CreateAPI(config.config);
    // 初始化ws
    await createWs();
  }
}
