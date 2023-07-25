import axios, { type AxiosInstance } from 'axios';
import { type bot, type GetWsParam } from '../types';
import { Message } from './message';
import { User } from './user';

export class Client {
  /** 初始化axios 私有 */
  private readonly axios: AxiosInstance;
  /** 机器人配置信息 */
  config: GetWsParam;
  /** 频道消息 */
  Message: Message;
  /** 用户相关接口 */
  User: User;
  /** 当前用户参数 */
  bot: bot;

  constructor(config: GetWsParam) {
    this.config = config;
    this.axios = axios.create({
      baseURL: 'https://www.kookapp.cn',
      headers: {
        Authorization: `Bot ${this.config.token}`
      }
    });
    this.axios.interceptors.response.use(
      config => {
        return config.data;
      },
      err => {
        if (err.response && err.response.data) return err.response.data;
        return err.toString();
      }
    );
    this.User = new User(this.axios);
    this.Message = new Message(this.axios);
  }

  /** 获取网关连接地址
   *
   * https://developer.kookapp.cn/doc/http/gateway#获取网关连接地址 */
  async Gateway(): Promise<{ code: number; message: string; data?: { url: string } }> {
    return await this.axios.get('/api/v3/gateway/index', {
      params: {
        compress: this.config.compress ?? 1,
        resume: this.config.resume,
        sn: this.config.resume ? this.config.sn : undefined,
        sessionId: this.config.resume ? this.config.sessionId : undefined
      }
    });
  }
}

/** 创建api */
export function CreateAPI(config: GetWsParam) {
  return new Client(config);
}
