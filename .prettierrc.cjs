/**
 * @type {import('prettier').Config} 
 */
module.exports = {
  printWidth: 100, //超过最大值换行
  tabWidth: 2, //限制tab缩进字节数
  useTabs: false, // true :tab缩进;false :使用空格
  semi: true, //句尾分号
  singleQuote: true, //是否使用单引号代替双引号
  proseWrap: 'preserve', // 指定在 Markdown 文本的换行方式。选项：always──超过 print-width 时换行、 never──不换行、 preserve──不进行任何操作，保持原样
  arrowParens: 'avoid', // (x) => {} 箭头函数仅有一个参数时，是否添加括号 always---总是添加括号 avoid---省略括号
  bracketSpacing: true, // 对象花括号内的两旁添加空格 "{ foo: bar }"
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
//   ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中 默认.prettierignore
  trailingComma: 'none', // 指定添加尾后逗号的方式。选项：none──无尾后逗号、 es5──在 ES5 中有效的尾后逗号（如对象与数组等）、 all──尽可能添加尾后逗号（如函数参数）
  quoteProps: 'consistent' // 指定对象中 key 的引号添加方式。选项： as-needed──只有在需求要的情况下加引号、 consistent──有一个需要引号就给其他都统一加上、 preserve──保留用户输入的引号
};
