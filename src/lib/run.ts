import KBot from './KBot';
import WebSocket from 'ws';
import { unzipSync } from 'zlib';
import Init from './init';

// 记录重试次数
let retry = 0;
let init = false;
export async function run(): Promise<any> {
  if (retry > 10) {
    console.error('[Error]', '超过最大重试次数');
    process.exit();
  }
  // 获取ws 地址
  const gateway = await KBot.client.Gateway().catch(err => {
    console.error(err);
  });

  if (gateway && gateway.data && gateway.data.url) {
    const ws = new WebSocket(gateway.data.url);
    // ws 开启
    ws.on('open', async () => {
      retry = 0;
      KBot.client.config.resume = undefined;
      console.log('[client]', '链接成功');

      // 第一次时加载插件
      if (!init) {
        // 获取机器人信息
        KBot.client.bot = await KBot.client.User.me();
        console.info(`[登录] :机器人[${KBot.client.bot.username}]已经准备就绪，可以开始使用`);

        // 加载插件配置
        await new Init().load();
        init = true;
      }
    });

    // ws 返回消息
    ws.on('message', async (data: ArrayBuffer | string) => {
      data =
        KBot.client.config.compress === 0
          ? (data as string)
          : unzipSync(data as ArrayBuffer).toString();
      const msg = JSON.parse(data);
      if (msg.d.sessionId) KBot.client.config.sessionId = msg.d.sessionId;
      if (msg.sn) KBot.client.config.sn = msg.sn;

      //  返回消息处理
      await new Init().dealMsg(msg);
    });

    // ws 关闭
    ws.on('close', async () => {
      KBot.client.config.resume = 1;
      return await run();
    });
  } else {
    retry++;
    return await run();
  }
}
