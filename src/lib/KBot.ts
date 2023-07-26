import { type Client, type GetWsParam } from 'kook-api';
import plugin from './plugin';

export default class KBot {
  /**  项目根路径 */
  static ROOT_PATH: string;
  /** config.yaml配置 */
  static config: {
    /** 机器人配置 */
    config: GetWsParam;
  };

  static client: Client;
  static plugin: typeof plugin;
}

KBot.plugin = plugin;
