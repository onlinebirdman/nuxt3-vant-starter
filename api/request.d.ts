// 更新Request类以接受两个泛型参数：Req为请求参数类型，Res为响应类型
export class MyRequest<Req, Res> {
  /** 请求地址 */
  public url: string;

  /** 请求方法 */
  public method: string;

  /** 响应缓存 */
  public store: Res;
  
  /** 请求逻辑 */
  request(requestData?: Req, options?: RequestOptions): Promise<Res>
  
  /** http请求工具函数：用于发起http请求 */
  private fetch(url: string, options: RequestOptions): Promise<Res>

  /** 缓存具体实现 */
  private setStore(store: Res): void
}

// 定义apiService的类型，具体化Request的泛型参数
/** 通用的HTTP请求选项：可参考axios或者fetch的官方文档 */
export interface HttpOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: {
    [key: string]: string;
  };
  body?: {
    [key: string]: string;
  };
}
/** 拓展的请求参数，用于封装复杂的请求逻辑，例如
 * 请求时带上loading
 * 请求重试次数
 * ...etc */
export interface RequestOptions extends HttpOptions {
  hideLoading?: boolean;
}