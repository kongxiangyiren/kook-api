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

  async create(data: { type?: 1 | 2 | 3 | 9 | 10; target_id: string }) {
    return await this.axios('/api/v3/message/create');
  }
}
