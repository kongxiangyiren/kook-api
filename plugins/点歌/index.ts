import KBot from '../../src/lib/KBot';
import axios from 'axios';
import { type Message } from '../../src/types';
export default class extends KBot.plugin {
  constructor() {
    super([
      {
        reg: '^/点歌(.*)$',
        fnc: '点歌',
        priority: 5000,
        describe: '点歌'
      }
    ]);
  }

  async 点歌(e: Message) {
    // 频道消息
    if (e.d.channel_type !== 'GROUP') {
      return;
    }

    const msg = e.d.content
      .replace(`(met)${KBot.client.bot.id}(met)`, '')
      .replace('/点歌', '')
      .trim();

    const res = await axios.get(`https://api.f4team.cn/API/QQ_Music_new/`, {
      params: {
        msg,
        n: 1,
        //  音质，14：母带，11：无损，8：hq，4：标准，其余自测 一共有1-14
        br: 7
      }
    });

    if (!res || res.data.code !== 1) {
      await KBot.client.Message.create({
        type: 1,
        target_id: e.d.target_id,
        quote: e.d.msg_id,
        content: '点歌接口错误',
        temp_target_id: e.d.author_id
      });
      return false;
    }

    await KBot.client.Message.create({
      type: 10,
      target_id: e.d.target_id,
      // quote: e.d.msg_id,
      content: JSON.stringify([
        {
          type: 'card',
          theme: 'secondary',
          size: 'lg',
          modules: [
            {
              type: 'audio',
              title: res.data.data.song,
              src: res.data.data.music,
              cover: res.data.data.picture
            }
          ]
        }
      ]),
      temp_target_id: e.d.author_id
    });
    return true;
  }
}
