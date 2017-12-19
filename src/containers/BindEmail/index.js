/**
 * Created by huangchao on 2017/11/3.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import { NavBar, Toast, Modal } from 'antd-mobile'
import F from '../../helper/tool'
import {handleBindEmail} from '../../actions/auth'

// import LisetItem from '../../components/ListItem'
// import { NavBar, Toast } from 'antd-mobile'

@connect(state => {
  return {
    auth: state.auth,
  }
})
class BindEmail extends Component {

  state = {
    disabled: false,
    email: '',
  }

  emailOnchange = () => {
    const email = this.refs.email.value
    if(email.length > 0) {
      this.setState({
        disabled: true,
        email,
      })
    }
  }
// 781945110@qq.com
  bindEmail = () => {
    if(this.state.disabled) {
      const email = this.state.email
      if(F.changeEmail(email)) {
        handleBindEmail({
          email,
          return_type: 'json',
        }).then((data) => {
          // console.log(data.flag)
          if(data.flag === 1022) {
            return Toast.info('邮箱已经存在', 1)
          }
          if(data.email_info) {
           return Modal.alert('绑定成功', `我们已经确认您的身份，并给您的邮箱${email}发送了邮件，请登录邮箱进行绑定`, [{
              text: '确定', onPress: () => {},
            }])
          }
        })
          .catch((err) => {
            return Toast.info(err.errMsg, 1)
          })
      } else {
        Toast.info('请输入正确的邮箱', 1)
      }

    }
  }

  render() {
    const {email} = this.props.auth
    return (
      <div className={style.bindEmailWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >绑定邮箱</NavBar>
        <div className={style.inputBox}>
          {
            email ?
              <div className={style.top}>
                <p>当前绑定邮箱</p>
                <p className={style.email}>{email}</p>
              </div>
              : null
          }
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input onChange={this.emailOnchange} ref="email" placeholder="请输入邮箱" type="text" />
            </div>
          </div>
        </div>
        <div onClick={this.bindEmail} className={`${style.btn} ${this.state.disabled ? null : style.disable}`}>
          <p>绑定</p>
        </div>
      </div>
    )
  }
}

export default BindEmail