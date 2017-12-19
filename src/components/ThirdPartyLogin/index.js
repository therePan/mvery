/**
 * Created by huangchao on 04/12/2017.
 */
import React from 'react'
import style from './style.less'
import qq from '@static/QQ@3x.png'
// import weixin from '@static/weixin@3x.png'
import weibo from '@static/weibo@3x.png'

const LOGIN_QQ = 'https://graph.qq.com/oauth/show?' +
  'which=Login&' +
  'display=pc&response_type=code&' +
  'state=veryeast&' +
  'client_id=100364120&' +
  'redirect_uri=http%3A%2F%2Fsso.veryeast.cn%2Fuser%2Flogin%3Flogin_type%3Dqq_connect%26appid%3D1%26target%3Dtouch%26redirect%3Dhttp%253A%252F%252Fm.veryeast.cn%252Ftabs%252Fuser'

const LOGIN_WEIBO = 'https://api.weibo.com/oauth2/authorize?' +
  'response_type=code&' +
  'client_id=2248643045&' +
  'redirect_uri=http%3A%2F%2Fsso.veryeast.cn%2Fuser%2Flogin%3Flogin_type%3Dweibo_connect%26target%3Dtouch%26appid%3D1&' +
  'state=veryeast&' +
  'scope=email,friendships_groups_read,friendships_groups_write,statuses_to_me_read,follow_app_official_microblog'

const ThirdPartyLogin = () => {
  return (
    <div className={style.nothing}>
      <div>第三方账号直接登录</div>
      <div className={style.btns}>
        <a href={LOGIN_WEIBO}>
          <img src={weibo} alt="weibo" />
        </a>
        <a href={LOGIN_QQ}>
          <img src={qq} alt="QQ" />
        </a>
      </div>
    </div>
  )
}

export default ThirdPartyLogin
