import { CreateAPI } from 'kook-api';
import check from './check';
import KBot from './KBot';
import { run as Run } from './run';

export default class Bot {
  constructor(config: { ROOT_PATH: string }) {
    KBot.ROOT_PATH = config.ROOT_PATH;
  }

  async run() {
    // 检查配置
    KBot.config = await check();

    if (!KBot.config) return;

    // 创建 client
    KBot.client = CreateAPI(KBot.config.config);
    // 初始化ws
    await Run();
  }
}
