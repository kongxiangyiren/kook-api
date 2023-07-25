import WebSocket from 'ws';
import { CreateAPI } from './client';
import { unzipSync } from 'zlib';
import { cpSync, existsSync } from 'fs';
import { join } from 'path';

const configPath = join(process.cwd(), '/config/config.js');
if (!existsSync(configPath) || !require(configPath).token) {
  if (!existsSync(configPath)) cpSync(join(__dirname, '../template/config.js'), configPath, { recursive: true });
  console.log(`请先配置${configPath}的token`);
  process.exit();
}

const client = CreateAPI(require(configPath));

// 获取机器人信息
client.User.me().then(res => (client.bot = res));

let retry = 0;
async function run(): Promise<any> {
  if (retry > 10) {
    console.error('[Error]', '超过最大重试次数');
    process.exit();
  }
  const gateway = await client.Gateway().catch(err => console.error(err));

  if (gateway && gateway.data && gateway.data.url) {
    const ws = new WebSocket(gateway.data.url);
    ws.on('open', () => {
      retry = 0;
      client.config.resume = undefined;
      console.log('[client]', '链接成功');
    });

    ws.on('message', (data: ArrayBuffer | string) => {
      data = client.config.compress === 0 ? (data as string) : unzipSync(data as ArrayBuffer).toString();
      const msg = JSON.parse(data);
      if (msg.d.sessionId) client.config.sessionId = msg.d.sessionId;
      if (msg.sn) client.config.sn = msg.sn;

      //  返回消息处理
    });

    ws.on('close', async () => {
      client.config.resume = 1;
      return await run();
    });
  } else {
    retry++;
    return await run();
  }
}

run();
