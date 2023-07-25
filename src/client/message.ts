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

  create(data: { type?: 1 | 2 | 9 | 10; target_id: string }) {
    return this.axios('/api/v3/message/create');
  }
}
