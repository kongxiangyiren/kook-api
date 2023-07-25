/** 机器人配置信息 */
export interface GetWsParam {
  /** 机器人token */
  token: string;
  /** 下发数据是否压缩，默认为1,代表压缩 */
  compress?: 1 | 0;
  /** 如果需要重连，请在连接 gateway 时加入 resume=1 */
  resume?: 1;
  /** 重连时sn */
  sn?: number;
  /** 重连时sessionId */
  sessionId?: string;
}
