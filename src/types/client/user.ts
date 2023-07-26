/** 当前用户信息返回参数 */
export interface bot {
  /** 用户的 id */
  id: string;
  /** 用户的名称 */
  username: string;
  /** 用户名的认证数字，用户名正常为：user_name#identify_num */
  identify_num: string;
  /** 当前是否在线 */
  online: boolean;
  /** 当前连接方式 */
  os: string;
  /** 用户的状态, 0 和 1 代表正常，10 代表被封禁 */
  status: number;
  /** 用户的头像的 url 地址 */
  avatar: string;
  /** 用户的横幅的 url 地址 */
  banner: string;
  /** 用户是否为机器人 */
  bot: boolean;
  /** 是否手机号已验证 */
  mobile_verified: boolean;
  /** 手机区号,如中国为 86  */
  mobile_prefix: string;
  /** 用户手机号，带掩码 */
  mobile: string;
  /** invited_count */
  invited_count: number;
}
