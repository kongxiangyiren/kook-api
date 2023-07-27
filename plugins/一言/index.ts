import KBot, { type Message } from '@src/KBot';
import axios from 'axios';
import genshiTts from 'genshin-tts';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';
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
    if (e.d.channel_type !== 'GROUP' || e.d.type === 255) {
      return;
    }

    const url = 'https://v1.hitokoto.cn/';
    /** 调用接口获取数据 */
    let res = await axios.get(url).catch(err => err);

    if (!res) {
      console.error('[一言] 接口请求失败');

      await KBot.client.Message.create({
        type: 1,
        target_id: e.d.target_id,
        quote: e.d.msg_id,
        content: '一言接口请求失败',
        temp_target_id: e.d.author_id
      });
      return false;
    } else {
      /** 接口结果，json字符串转对象 */
      res = res.data;
      const gen = await genshiTts({
        text: res.hitokoto,
        speaker: '派蒙',
        format: 'wav'
      });
      if (!gen) {
        await KBot.client.Message.create({
          type: 1,
          quote: e.d.msg_id,
          target_id: e.d.target_id,
          content: res.hitokoto,
          temp_target_id: e.d.author_id
        });
        return false;
      }

      if (!KBot.ffmpegPath) {
        await KBot.client.Message.create({
          type: 1,
          quote: e.d.msg_id,
          target_id: e.d.target_id,
          content: res.hitokoto,
          temp_target_id: e.d.author_id
        });
        return false;
      }
      const wavData = new Readable();
      wavData.push(gen);
      wavData.push(null);

      ffmpeg.setFfmpegPath(KBot.ffmpegPath);
      const mp3Path = join(process.cwd(), '/data/一言/一言.mp3');
      mkdirSync(dirname(mp3Path), { recursive: true });
      ffmpeg()
        .input(wavData)
        .inputFormat('wav')
        .toFormat('mp3')
        .output(mp3Path)
        .on('error', async () => {
          console.error('发生错误');
          await KBot.client.Message.create({
            type: 1,
            quote: e.d.msg_id,
            target_id: e.d.target_id,
            content: res.hitokoto,
            temp_target_id: e.d.author_id
          });
          return false;
        })
        .on('end', async () => {
          console.log('转换完成');
          const data = await KBot.client.Assets.create(mp3Path, (res.hitokoto as string) + '.mp4');
          if (data.code !== 0) {
            await KBot.client.Message.create({
              type: 1,
              quote: e.d.msg_id,
              target_id: e.d.target_id,
              content: res.hitokoto,
              temp_target_id: e.d.author_id
            });
            return false;
          }

          // 发送消息
          await KBot.client.Message.create({
            type: 4,
            quote: e.d.msg_id,
            target_id: e.d.target_id,
            content: data.data?.url as string,
            temp_target_id: e.d.author_id
          });
          return true;
        })
        .run();
    }
  }
}

// const data = await KBot.client.Assets.create(gen, '一言.mp3');
// if (data.code !== 0) {
//   await KBot.client.Message.create({
//     type: 1,
//     quote: e.d.msg_id,
//     target_id: e.d.target_id,
//     content: res.hitokoto,
//     temp_target_id: e.d.author_id
//   });
//   return false;
// }
