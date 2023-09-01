import { type AxiosInstance } from 'axios';
import FormData from 'form-data'; // 安装axios就有
import { createReadStream, existsSync } from 'fs';
import { basename } from 'path';
import { Readable, isReadable } from 'stream';
import * as fileType from 'file-type';
import { Buffer } from 'buffer';
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
    file: string | Buffer | Readable,
    /** 上传后的文件名称 如果没有会自动获取文件后缀名，默认为 file.bin */
    name: string = 'file.bin'
  ): Promise<
    | {
        code: number;
        message: string;
        data?: {
          url: string;
        };
      }
    | false
  > {
    let picData;
    if (typeof file === 'string') {
      if (!existsSync(file)) {
        return false;
      }
      if (name === 'file.bin') {
        name = basename(file);
      }
      picData = createReadStream(file);
    } else if (Buffer.isBuffer(file)) {
      if (name === 'file.bin') {
        const filext = await fileType.fromBuffer(file);
        if (!filext || !filext.ext) {
          return false;
        }
        name = `file.` + (filext.ext as string);
      }
      picData = new Readable();
      picData.push(file);
      picData.push(null);
    } else if (isReadable(file)) {
      if (name === 'file.bin') {
        const filext = await fileType.fromStream(file);
        if (!filext || !filext.ext) {
          return false;
        }
        name = 'file.' + (filext.ext as string);
      }
      picData = file;
    } else {
      return false;
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
