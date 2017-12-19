/**
 * Created by huangchao on 2017/10/18.
 */

import React, { Component } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import style from './style.less'
import Rectangle from '@static/Rectangle@3x.png'
import logo from '@static/logo.jpg'
import passwordno from '@static/paswordno@3x.png'
import paswordimg from '@static/pasword@3x.png'
import { createForm } from 'rc-form'
// import ThirdPartyLogin from '../../components/ThirdPartyLogin'
import * as auth from '../../actions/auth'

@createForm()
class Login extends Component {
  state = {
    focused: true,
    password: true,
    disabled: false,
  }
  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }
  onUserName = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(value.username && value.password) {
        this.setState({
          disabled: true,
        })
      } else {
        this.setState({
          disabled: false,
        })
      }
    })
  }
  handleLogin = () => {
    const rediact = this.props.location.state && this.props.location.state.rediact
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(!value.username) {
        return Toast.info('请输入用户名', 1)
      }
      if(!value.password) {
        return Toast.info('请输入密码', 1)
      }
      auth.login({platform: 2, ...value}).then(data => {
        if(data) {
          Toast.info('登录成功', 1)
          setTimeout(() => {
            rediact ? this.props.history.replace(rediact) : this.props.history.replace('/tabs/user')
            // this.props.history.go(-1)
          },1200)
        }
      })
        .catch(err => {
          Toast.info(err.errMsg, 1)
        })
    })
  }
  render() {
    // console.log(this.props)
    return (
      <div className={style.LoginWrap}>
        <div className={style.back}>
          <img src={Rectangle} alt="返回" onClick={() => {this.props.history.go(-1)}} />
        </div>
        <div className={style.logon}>
          <img src={logo} alt="logon" />
        </div>
        <div className={style.forms}>
          <div className={style.userName}>
            <div className={style.title}>账号</div>
            <InputItem
              {...this.props.form.getFieldProps('username', {onChange: this.onUserName})}
              className={`${style.inputHei} ${style.name}`}
              clear
              placeholder="手机号/邮箱/用户名"
            />
          </div>
          <div className={style.passwordBox}>
            <div className={style.title}>密码</div>
            <InputItem
              {...this.props.form.getFieldProps('password', {onChange: this.onUserName})}
              className={`${style.inputHei} ${style.name}`}
              clear
              type={this.state.password ? 'password' : 'text'}
              placeholder="请输入登录密码"
            />
            <div className={style.changeType} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
          <Link to="/user/forgetPassword">
            <div className={style.forgetPassword}>忘记密码？</div>
          </Link>
          <div className={style.subBtn} onClick={this.handleLogin}>
            <a className={this.state.disabled ? null : `${style.disabled}`}>登 录</a>
          </div>
          <div className={style.otherLogin}>
            <Link to="/user/logincode">
              <span>验证码登陆</span>
            </Link>
            <Link to="/user/register">
              <span>手机注册</span>
            </Link>
          </div>
        </div>
        {/*<div className={style.bottom}>*/}
          {/*<ThirdPartyLogin />*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default Login
