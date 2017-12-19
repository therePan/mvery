/**
 * Created by huangchao on 2017/11/3.
 */
import React, { Component } from 'react'
import { NavBar, Toast } from 'antd-mobile'
import {connect} from 'react-redux'
import style from './style.less'
import paswordno from '@static/paswordno@3x.png'
import pasword from '@static/pasword@3x.png'
import {changePassword} from '../../actions/auth'
import {login_out} from '../../actions/userStatus'
import store from 'store'
// import LisetItem from '../../components/ListItem'


@connect(state => {
  return {}
})
class ChangePasswprd extends Component {
  state = {
    disable: false,
    oldPassword: null,
    password: null,
    NewPassword: null,
    type1: false,
    type2: false,
    type3: false,
  }

  changeType = type => {
    if(type === 'type1') {this.setState({type1: !this.state.type1})}
    if(type === 'type2') {this.setState({type2: !this.state.type2})}
    if(type === 'type3') {this.setState({type3: !this.state.type3})}
  }

  passworOnchange = () => {
    const oldPassword = this.refs.oldPassword.value
    const password = this.refs.password.value
    const NewPassword = this.refs.NewPassword.value
    if(oldPassword.length > 0) {
      this.setState({
        oldPassword,
      })
    }
    if(password.length > 0) {
      this.setState({
        password,
      })
    }
    if(NewPassword.length > 0) {
      this.setState({
        NewPassword,
      })
    }
    if(oldPassword.length> 0 && password.length > 0 && NewPassword.length > 0) {
      this.setState({
        disable: true,
      })
    }
  }

  handleChange = () => {
    if(this.state.disable) {
      if(this.state.password !== this.state.NewPassword) {
        return Toast.info('两次密码输入不一样', 1)
      }
      if(this.state.oldPassword === this.state.NewPassword) {
        return Toast.info('新密码和就密码不能相同', 1)
      }
      if(this.state.password.length < 6 ){
        return Toast.info('密码格式为6-20个字母或数字', 1)
      }
      changePassword({
        old_password: this.state.oldPassword,
        new_password: this.state.NewPassword,
      }).then((data) => {
        if(data.status) {
          this.props.dispatch(login_out)
          store.remove('m:auth')
          Toast.info('密码修改成功，请重新登录', 1)
          setTimeout(() => {
            this.props.history.replace('/tabs/user')
          }, 1200)
        }
      }).catch((err) => {
        if(err.errCode === 2002) {
          this.props.dispatch(login_out)
          store.remove('m:auth')
          Toast.info(err.errMsg, 1)
          setTimeout(() => {
            this.props.history.replace('/tabs/user')
          }, 1200)
        }
        Toast.info(err.errMsg, 1)
      })
    }
  }

  render() {
    return (
      <div className={style.ChangePasswprdWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >修改密码</NavBar>
        <div className={style.inputBox}>
          <div className={style.inputItem}>
            <input
              onChange={this.passworOnchange}
              ref="oldPassword"
              placeholder="请输入原始密码"
              type={this.state.type1 ? 'text' : 'password'} />
            <div onClick={() => this.changeType('type1')} className={style.changeimg}>
              <img src={this.state.type1 ? pasword : paswordno} alt="" />
            </div>
          </div>
          <div className={style.inputItem}>
            <input
              onChange={this.passworOnchange}
              ref="password"
              placeholder="新密码（6-20个字母或数字）"
              maxLength="20"
              type={this.state.type2 ? 'text' : 'password'} />
            <div onClick={() => this.changeType('type2')} className={style.changeimg}>
              <img src={this.state.type2 ? pasword : paswordno} alt="" />
            </div>
          </div>
          <div className={style.inputItem}>
            <input
              onChange={this.passworOnchange}
              ref="NewPassword"
              placeholder="再次输入新密码"
              maxLength="20"
              type={this.state.type3 ? 'text' : 'password'} />
            <div onClick={() => this.changeType('type3')} className={style.changeimg}>
              <img src={this.state.type3 ? pasword : paswordno} alt="" />
            </div>
          </div>
        </div>
        <div onClick={this.handleChange} className={`${style.btn} ${this.state.disable ? null : style.disable}`}>
          <p>修改</p>
        </div>
      </div>
    )
  }
}

export default ChangePasswprd

