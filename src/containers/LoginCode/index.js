/**
 * Created by huangchao on 2017/10/18.
 */

import React, { Component } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import style from './style.less'
import Rectangle from '@static/Rectangle@3x.png'
import F from '../../helper/tool'
import { createForm } from 'rc-form'
import {captcha} from '../../actions/auth'
// import ThirdPartyLogin from '../../components/ThirdPartyLogin'
import {mobile, loginCode} from '../../actions/auth'

@createForm()
class LoginCode extends Component {
  state = {
    url: '',
    focused: true,
    password: true,
    disabled: false,
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
  }
  changePasswordType = () => {
    this.setState({
      password: !this.state.password,
    })
  }

  changeImg = () => {
    captcha().then(data => {
      this.setState({
        url: data.url,
      })
    })
  }

  onPhoneNumber = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(value.number && value.imgCode && value.massageCode) {
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

  Clear = () => {
    this.setState({
      disableCode: true,
      index: 60,
      tipFont: '获取验证码',
    })
    clearInterval(this.timer)
  }

  getCode = () => {
    this.props.form.validateFields((err, value) => {
      if(err) return
      if(!F.changePhoneNumber(value.number)) return  Toast.info('请输入正确的手机号码' ,1)
      if(!value.imgCode) return Toast.info('请输入图形验证码' ,1)
      if (this.state.disableCode){
        mobile({
          mobile: value.number,
          captcha: value.imgCode,
          sms_type: 7,
        }).then((data) => {
          if(data.flag === 0) {
            this.setState({
              disableCode: false,
            })
            this.timer = setInterval(() => {

              if(this.state.index <= 0) {
                return this.Clear()
              }

              this.setState({
                index: this.state.index -1,
                tipFont: `${this.state.index -1}秒后重新获取`,
              })

            }, 999)
          } else {
            captcha().then(data => {
              this.setState({
                url: data.url,
              })
            })
            Toast.info('验证码错误', 1)
          }
        })
      }
    })
  }

  login = () => {
    if(this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if(err) return
        // console.log(value)
        loginCode({
          username: value.number,
          password: value.massageCode,
          platform: 2,
        }).then(data => {
         // console.log(data)
          if(data) {
            Toast.info('登录成功', 1)
            setTimeout(() => {
              this.props.history.replace('/tabs/user')
              // this.props.history.go(-1)
            },1200)
          }
        })
          .catch(err => {
          Toast.info(err.errMsg, 1)
        })
      })
    }
  }

  componentDidMount() {
    captcha().then(data => {
      this.setState({
        url: data.url,
      })
    })
  }

  componentWillUnmount() {
    this.timer && this.Clear()
  }

  render() {
    const { getFieldProps } = this.props.form
    // console.log(this.props)
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={() => {this.props.history.go(-1)}}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>验证码登录</div>
        <div className={style.forms}>
          <InputItem
            {...getFieldProps('number', {onChange: this.onPhoneNumber})}
            className={style.inputHei}
            clear
            placeholder="手机号"
            maxLength="11"
          />
          <div className={style.pictureCode}>
            <InputItem
              {...getFieldProps('imgCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.picLeft}`}
              clear
              placeholder="验证码"
            />
            <div onClick={this.changeImg} className={style.picture}>
              <img src={this.state.url} alt="图片验证码" />
            </div>
          </div>
          <div className={style.massageCode}>
            <InputItem
              {...getFieldProps('massageCode', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.massageLeft}`}
              clear
              placeholder="请输入获取验证码"
            />
            <div onClick={this.getCode}
                 className={`${style.massage} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.login} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>登 录</a>
        </div>
        {/*<div className={style.bottom}>*/}
          {/*<ThirdPartyLogin />*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default LoginCode
