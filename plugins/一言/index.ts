import KBot from '../../src/lib/KBot';
import axios from 'axios';
import { type Message } from '../../src/types';
export default class extends KBot.plugin {
  constructor() {
    super([
      {
        reg: '^/一言$',
        fnc: 'hitokoto',
        priority: 5000,
        describe: '一言'
      }
    ]);
  }

  async hitokoto(e: Message) {
    // 频道消息
    if (e.d.channel_type !== 'GROUP') {
      return;
    }

    const url = 'https://v1.hitokoto.cn/';
    /** 调用接口获取数据 */
    let res = await axios.get(url).catch(err => err);
    /** 判断接口是否请求成功 */
    let message: any = {};
    if (!res) {
      console.error('[一言] 接口请求失败');

      message = {
        type: 1,
        target_id: e.d.target_id,
        quote: e.d.msg_id,
        content: '一言接口请求失败',
        temp_target_id: e.d.author_id
      };
    } else {
      /** 接口结果，json字符串转对象 */
      res = res.data;

      message = {
        type: 1,
        quote: e.d.msg_id,
        target_id: e.d.target_id,
        content: res.hitokoto,
        temp_target_id: e.d.author_id
      };
    }

    // 发送消息
    await KBot.client.Message.create(message);
    return true;
  }
}
