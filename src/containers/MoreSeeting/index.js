/**
 * Created by huangchao on 2017/9/27.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import LisetItem from '../../components/ListItem/styleTwo'
import style from './style.less'
import { NavBar, Toast } from 'antd-mobile'
import * as auth from '../../actions/auth'
import {login_out} from '../../actions/userStatus'
import { Link } from 'react-router-dom'

@connect(state => {
  return {}
})
class MoreSeeting extends Component {

  loginOut = () => {
    auth.logout().then(data => {
      if(data) {
        Toast.info('退出成功', 1)
        this.props.dispatch(login_out)
        setTimeout(() => {
          this.props.history.go(-1)
        },1200)
      }
    })
      .catch(err => {
        Toast.info(err.errMsg, 1)
      })
  }

  render() {
    return (
      <div className={style.MoreSeetingWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >更多设置</NavBar>
        <div className={style.modification}>
          <Link to="/user/changePassword">
            <LisetItem titleleft="修改密码" underline="true" />
          </Link>
          <Link to="/user/bindPhone">
            <LisetItem titleleft="绑定手机" underline="true" />
          </Link>
          <Link to="/user/bindEmail">
            <LisetItem titleleft="绑定邮箱" underline="false" />
          </Link>
        </div>
        <div className={style.aboutous}>
          <Link to="/feedback">
            <LisetItem titleleft="意见反馈" underline="true" />
          </Link>
          <Link to="/aboutous">
            <LisetItem titleleft="关于我们" underline="false" />
          </Link>
        </div>
        <div onClick={this.loginOut} className={style.loginOut}>
          退出登录
        </div>
      </div>
    )
  }
}

export default MoreSeeting
