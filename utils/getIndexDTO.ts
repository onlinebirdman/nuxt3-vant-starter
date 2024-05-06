import { apiService } from '~/api'

/**
 * 首次调用首页接口时，必须使用code发起
 * 首页接口调用成功后就会有固定的userId，后续都用userId
 */
export default () => {
  // const { value: token } = useURLQuery('token') // 刷新会带奇怪参数
  const token = queryString('token')
  // b650cbb962d825acf953e00e22fc98404a6454716216c80ed7bef0f05239d32c
  // df7ce31d83d84794796446f715617cbc00cde5bbf728abb4f71f858391de9ce7 // err
  // e0103f8e900206ee32335803f42b4f9b7866167337282f67fa5ef0799254bbbf // err
  // bcdfa88a26557ba0fa5c7f06150fd4a29fefce9ed5ef3a7bf6abc5026f2b5d83
  // dbac743022ae86b2d14aefa6fc3416c0fd8c87717ad4791405cdc593a9af1c6c

  const defaultUID = process.env.NODE_ENV === 'development' ? 'b650cbb962d825acf953e00e22fc98404a6454716216c80ed7bef0f05239d32c' : ''
  const uid = apiService.queryHomepage.store.userId || defaultUID
  return {
    userId: uid as string,
    code: uid ? '' : token as string,
  }
}
