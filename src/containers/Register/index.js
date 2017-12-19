/**
 * Created by huangchao on 2017/9/27.
 */
import React, { Component } from 'react'
import { InputItem, Toast } from 'antd-mobile'
import style from './style.less'
import Rectangle from '@static/Rectangle@3x.png'
import passwordno from '@static/paswordno@3x.png'
import paswordimg from '@static/pasword@3x.png'
import { createForm } from 'rc-form'
import F from '../../helper/tool'
import {captcha} from '../../actions/auth'
import {mobile, register} from '../../actions/auth'

@createForm()
class Register extends Component {
  state = {
    focused: true,
    password: true,
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
      // console.log(value)
      if(value.number && value.imgCode && value.massageCode && value.newPassword) {
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
      index: 60,
      disableCode: true,
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
          sms_type: 2,
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
          } else if(data.flag === 5012) {
            Toast.info('号码已注册', 1)
          } else {
            this.changeImg()
            Toast.info('验证码错误', 1)
          }
        })
      }
    })
  }

  onRegister = () => {
    if(this.state.disabled) {
      this.props.form.validateFields((err, value) => {
        if(err) return
        if(value.newPassword.length < 6 || value.newPassword.length > 20){
          return Toast.info('密码格式为6-20位字母或数字', 1)
        }
        // console.log(value)
        register({
          username: value.number,
          mobile: value.number,
          code: value.massageCode,
          password: value.newPassword,
          register_type: 'mobile_register',
          user_type: 2,
        }).then(data => {
          if(data.status) {
            Toast.info('注册成功', 1)
            setTimeout(() => {
             this.props.history.replace('/tabs/user') // 跳转到微简历页面，这里先跳到简历页面
            }, 1200)
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
    const { getFieldProps } = this.props.form;
    return (
      <div className={style.RegisterWrap}>
        <div className={style.back} onClick={() => {this.props.history.go(-1)}}>
          <img src={Rectangle} alt="返回" />
        </div>
        <div className={style.title}>手机号注册</div>
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
              placeholder="短信验证码"
            />
            <div
              onClick={this.getCode}
              className={`${style.massage} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
          <div className={style.passwordCode}>
            <InputItem
              {...getFieldProps('newPassword', {onChange: this.onPhoneNumber})}
              className={`${style.inputHei} ${style.passwordLeft}`}
              type={this.state.password ? 'password' : 'text'}
              clear
              placeholder="请输入6-20个字母或数字的密码"
            />
            <div className={style.password} onClick={this.changePasswordType}>
              <img src={this.state.password ? passwordno : paswordimg} alt="显示" />
            </div>
          </div>
        </div>
        <div onClick={this.onRegister} className={style.subBtn}>
          <a className={this.state.disabled ? null : `${style.disabled}`}>注 册</a>
        </div>
      </div>
    )
  }
}

export default Register
