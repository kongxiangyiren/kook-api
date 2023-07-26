import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse, stringify } from 'yaml';
import prompts from 'prompts';

// 检查配置
export default async function check() {
  const file = join(process.cwd(), '/config/config.yaml');
  if (existsSync(file)) {
    const config = parse(readFileSync(file, 'utf-8'));

    if (config && config.config && config.config.token) {
      return config;
    }
  }
  console.log('请按提示输入，生成配置文件config.yaml，输入错误【Ctrl+c】结束重来');
  console.log('注册机器人：https://developer.kookapp.cn/app/index');

  let result: prompts.Answers<'token'>;

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'token',
          message: '请输入token: ',
          validate: value => (value !== '' && typeof value === 'string' ? true : '请输入token')
        }
      ],
      {
        onCancel: () => {
          throw new Error('✖' + ' 操作被取消');
        }
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { token } = result;

  const config = {
    config: {
      token,
      compress: 1
    }
  };

  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, stringify(config));
  console.log(`生成配置文件成功`);
  console.log(`其他配置请打开${file}修改`);

  return config;
}
