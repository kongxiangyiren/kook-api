export default class plugin {
  rules:
    | Array<{
        /** 插件规则触发的正则表达式 没有为 noCheck */
        reg: string;
        /** 插件规则调用的方法 */
        fnc: string;
        /** 优先级，数字越小等级越高 */
        priority: number;
        /** 插件规则描述 */
        describe /** 插件规则调用的方法 */ : string;
      }>
    | undefined;

  constructor(
    /** 插件触发规则 */
    rules?: Array<{
      /** 插件规则触发的正则表达式 没有为 noCheck */
      reg: string;
      /** 插件规则调用的方法 */
      fnc: string;
      /** 优先级，数字越小等级越高 */
      priority: number;
      /** 插件规则描述 */
      describe: string;
    }>
  ) {
    this.rules = rules;
  }
}
