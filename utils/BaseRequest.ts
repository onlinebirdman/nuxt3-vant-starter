import { defineStore } from 'pinia'
/**
 * 前后端接口请求的中间层，通过这一层与后端接口通讯
 * T: 响应体类型
 * E: 请求体类型
 */
export class BaseRequest<E, T> {
  private method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  private url: string
  private options: any = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  public get store(): T {
    return this.useResponseStore().value
  }

  constructor(url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET') {
    this.url = url
    this.method = method
    this.options.method = method

    this.useResponseStore = defineStore(`${method}:${url}`, () => {
      const value = useSessionStorage<T>(`${method}:${url}`)
      const setValue = (newValue: T) => {
        value.value = newValue
      }
      return {
        value,
        setValue,
      }
    })
  }

  /** 请求前的payload处理 */
  
  public async request(payload?: E, options?: any): Promise<T> {
    this.payloadAnalysis(payload)
    const { showLoading, closeLoading } = useLoading()
    if (!options?.hideLoading)
      showLoading()

    try {
      const res = await this.httpClient<T>(
        this.url,
        this.options,
      )
      this.setStore(res)
      return res
    }
    catch (error) {
      console.warn('request error:', error)
      return new Promise((resolve) => {
        options?.onError?.(error, resolve)
      })
    }
    finally {
      if (!options?.hideLoading)
        closeLoading()
    }
  }

  private async httpClient<T>(url: string, options: any): Promise<T> {
    // 使用原生fetch发起请求
    if (typeof options.body === 'object')
      options.body = JSON.stringify(options.body)
    const res = await window.fetch(url, options)
    const data = await res.json()
    return data
  }

  private payloadAnalysis(payload: E) {
    if (payload instanceof FormData)
      this.options.body = payload
    else if (this.method === 'POST' || this.method === 'PUT')
      this.options.body = payload
    else
      this.options.params = payload
  }

  private setStore(value: T) {
    const store = this.useResponseStore()
    store.setValue(value)
  }
}
