import { type AxiosInstance } from 'axios';
import FormData from 'form-data'; // 安装axios就有
import { type PathLike, createReadStream, existsSync } from 'fs';
import { basename } from 'path';
import { Readable } from 'stream';
/** 媒体模块|上传文件
 *
 * https://developer.kookapp.cn/doc/http/asset
 */
export class Assets {
  private readonly axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /** 上传媒体文件
   *
   * 网络图片、视频、文件需要先上传到服务器才能发送
   *
   * code:0 成功 其他失败
   *
   * https://developer.kookapp.cn/doc/http/asset#上传媒体文件
   */
  async create(
    /** file 可以是文件的绝对路径或者 Buffer */
    file: PathLike | Buffer,
    /** 上传后的文件名称 如果是文件路径就读取 ，默认为 file.bin */
    name: string = 'file.bin'
  ): Promise<{
    code: number;
    message: string;
    data?: {
      url: string;
    };
  }> {
    let picData;
    if (typeof file === 'string') {
      if (!existsSync(file)) {
        throw Error(file + '文件不存在');
      }
      if (name === 'file.bin') {
        name = basename(file);
      }
      picData = createReadStream(file);
    } else {
      picData = new Readable();
      picData.push(file);
      picData.push(null);
    }
    const formdata = new FormData();
    formdata.append('file', picData, name);
    return await this.axios.post('/api/v3/asset/create', formdata, {
      headers: {
        'Content-Type': formdata.getHeaders()['content-type']
      }
    });
  }
}
