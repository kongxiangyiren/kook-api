import { type AxiosInstance } from 'axios';

/** 频道消息相关接口
 *
 * https://developer.kookapp.cn/doc/http/message
 */
export class Message {
  private readonly axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /** 发送频道聊天消息
   *
   * https://developer.kookapp.cn/doc/http/message#发送频道聊天消息
   */
  async create(data: {
    /** 消息类型, 见[type], 不传默认为 1, 代表文本类型。
     *
     * 1:文字消息,
     * 2:图片消息，
     * 3:视频消息，
     * 4:文件消息，
     * 8:音频消息，
     * 9:KMarkdown，
     * 10:card 消息，
     * 255:系统消息,
     * 其它的暂未开放
     *
     * https://www.kookapp.cn/tools/message-builder.html#/card
     */
    type?: 1 | 2 | 3 | 4 | 8 | 9 | 10;
    /** 目标频道 id */
    target_id: string;
    /** 消息内容 */
    content: string;
    /** 回复某条消息的 msgId */
    quote?: string;
    /** nonce, 服务端不做处理, 原样返回 */
    nonce?: string;
    /** 用户 id,如果传了，代表该消息是临时消息，该消息不会存数据库，但是会在频道内只给该用户推送临时消息。用于在频道内针对用户的操作进行单独的回应通知等。 */
    temp_target_id?: string;
  }) {
    return await this.axios.post('/api/v3/message/create', data);
  }
}
