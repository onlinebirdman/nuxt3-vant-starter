export interface ZhongXinAppShareInfo {
  noConvert?: 1
  // 平台，微信好友、微信朋友圈
  platforms?: string[]
  // 类型
  shareType?: string
  // 分享标题
  title?: string
  // 分享描述
  description?: string
  // 分享链接
  webpageUrl?: string
  // 缩略图URL（可选）
  thumbUrl?: string
}

const sdk = 'https://wap.bank.ecitic.com/NMBFOServer/MobileBankWeb/static/js/jssdk.js'
export default class ZhongXinApp {
  static sdk = sdk
  static initailed = false
  static debug = process.env.NODE_ENV !== 'production'
  defaultShareInfo = {
    // 平台，微信好友、微信朋友圈
    platforms: ['Wechat', 'WechatMoments'],
    hideDialog: '1',
    // 类型
    shareType: 'webpage',
    // 分享标题
    title: '分享标题',
    // 分享描述
    description: '分享描述',
    // 分享链接
    // webpageUrl: 'https://go.citicbank.com/6ESm',
    webpageUrl: location.origin + location.pathname,
    // 缩略图URL（可选）
    thumbUrl:
      'https://d5zxbcfunds.cdollar.cn/d5/resource/zxbcfunds/391c67b6-94b9-4916-9956-69f85ad3eabc.png',
  }

  /** 初始化加载sdk */
  static init() {
    if (!ZhongXinApp.initailed) {
      const script = document.createElement('script')
      script.src = ZhongXinApp.sdk
      document.body.appendChild(script)
      ZhongXinApp.initailed = true
    }
  }

  /** 判断是否在零钱+app内 */
  static isInApp() {
    if (window.bridgeReady && window.bank && window.bank.browserPlugin)
      return true

    return false
  }

  /** 唤起分享 */
  static share(shareInfo?: ZhongXinAppShareInfo) {
    return new Promise((resolve, reject) => {
      if (ZhongXinApp.debug) {
        resolve()
      }
      else if (ZhongXinApp.isInApp) {
        window.bank.sharePlugin.share(
          Object.assign({}, ZhongXinApp.defaultShareInfo, shareInfo),
          (result) => {
            resolve(result)
          },
          (error) => {
            reject(error)
          },
        )
      }
      else {
        reject(Error('请在中信app内打开'))
      }
    })
  }

  /** 跳转到幸福号 */
  static goWealthPage(tacode) {
    if (ZhongXinApp.isInApp) {
      window.bank.browserPlugin.openByMenuId(
        {
          menuId: '1006001',
          menuParams: {
            routerName: 'Wealth.Fund.StoreIndex',
            routerType: 'fundStore',
            type: 'fundStoreDetail',
            TACODE: tacode || 'YZX',
          },
          closePage: false,
        },
        () => {},
      )
    }
  }

  /** 我的卡券 */
  static goMyCoupon() {
    if (ZhongXinApp.isInApp) {
      const params = {
        jumpTarget: 'Points.Rights.My.Couponlist',
      }
      window.bank.browserPlugin.openByMenuId(
        {
          menuId: '10080399',
          menuParams: {
            value: encodeURIComponent(JSON.stringify(params)),
          },
          closePage: false,
        },
        () => {},
      )
    }
  }

  /** 实名认证跳转 */
  static goRealNameAuth() {
    if (ZhongXinApp.isInApp) {
      window.bank.browserPlugin.openByMenuId(
        {
          menuId: '10010711',
          menuParams: {
            OPENTYPE: '2',
            ISGUIDEPAGE: '0',
          },
          closePage: false,
        },
        () => {},
      )
    }
  }

  /** 加自选 */
  static addOptional(fundCode: stirng) {
    if (ZhongXinApp.isInApp) {
      window.bank.browserPlugin.openByMenuId(
        {
          menuId: '1004021',
          menuParams: {
            type: 'loadFundTimeBuyFlag',
            PRDCODE: fundCode,
          },
          closePage: false,
        },
        () => {},
      )
    }
  }
}
ZhongXinApp.init()
