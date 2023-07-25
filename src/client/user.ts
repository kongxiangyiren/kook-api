import { type AxiosInstance } from 'axios';
import { bot } from '../types';

/** 用户相关接口
 *
 * https://developer.kookapp.cn/doc/http/user
 * */
export class User {
  private readonly axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /** 获取当前用户信息
   *
   * https://developer.kookapp.cn/doc/http/user#获取当前用户信息
   * */
  async me(): Promise<bot> {
    return await this.axios.get('/api/v3/user/me');
  }
}
