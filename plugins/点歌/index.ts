import KBot, { type Message } from '@src/KBot';
import axios from 'axios';
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
    if (e.d.channel_type !== 'GROUP' || e.d.type === 255) {
      return;
    }

    const msg = e.d.content
      .replace(`(met)${KBot.client.bot.id}(met)`, '')
      .replace('/点歌', '')
      .trim();

    const res = await axios
      .get(`http://ovoa.cc/api/QQmusic.php`, {
        params: {
          msg,
          n: 1,
          type: 'json'
        },
        timeout: 10000
      })
      .catch(err => err);

    if (!res || !res.data || res.data.code !== 200) {
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
              title: res.data.data.songname,
              src: res.data.data.src,
              cover: res.data.data.cover
            }
          ]
        }
      ]),
      temp_target_id: e.d.author_id
    });
    return true;
  }
}
