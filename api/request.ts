import { BaseRequest } from '~/utils/BaseRequest'

export const BASE_URL = {
  development: 'https://hwtest2.cdollar.cn/dollar-test-south-seeding/middle',
  production: 'https://hwtest2.cdollar.cn/dollar-test-south-seeding/middle',
}[process.env.NODE_ENV]

export const fullURL = (url: string) => `${BASE_URL}${url}`

export class MyRequest<E, T> extends BaseRequest<E, T> {
  // 重写 httpClient
  private async httpClient<T>(url: string, options?: any):Promise<T> {
    const res = await $fetch<defs.ResponseVO<T>>(BASE_URL + url, options)
      if (res.errCode !== 'e0000') {
        console.warn('fetch error', res)
        ElMessage.error(res.errMessage)
        return Promise.reject(res)
      }
      return res.body
  }
}
