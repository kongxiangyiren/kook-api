import KBot from '../../src/lib/KBot';
import axios from 'axios';
import { type Message } from '../../src/types';
import { basename } from 'path';
export default class extends KBot.plugin {
  constructor() {
    super([
      {
        reg: '^/原神壁纸$',
        fnc: '原神壁纸',
        priority: 5000,
        describe: '原神壁纸'
      }
    ]);
  }

  async 原神壁纸(e: Message) {
    // 频道消息
    if (e.d.channel_type !== 'GROUP') {
      return;
    }

    const res = await axios
      .get('https://api.dujin.org/pic/yuanshen/', { responseType: 'arraybuffer' })
      .catch(err => err);

    if (!res) {
      return;
    }

    const data = await KBot.client.Assets.create(res.data, basename(res.request.path));
    if (data.code !== 0) {
      await KBot.client.Message.create({
        type: 1,
        target_id: e.d.target_id,
        quote: e.d.msg_id,
        content: '上传文件失败',
        temp_target_id: e.d.author_id
      });
      return false;
    }

    // 发送消息
    await KBot.client.Message.create({
      type: 2,
      //   quote: e.d.msg_id,
      target_id: e.d.target_id,
      content: data.data?.url as string,
      temp_target_id: e.d.author_id
    });
    return true;
  }
}
