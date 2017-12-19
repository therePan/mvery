/**
 * Created by huangchao on 2017/11/3.
 */
import React, { Component } from 'react'
import { NavBar, Toast } from 'antd-mobile'
import style from './style.less'
import {connect} from 'react-redux'
import {captcha} from '../../actions/auth'
import F from '../../helper/tool'
import {mobile, bindMobile} from '../../actions/auth'
// import {bindMobile} from '../../actions/moreSeeting'
// import LisetItem from '../../components/ListItem'
// import { NavBar, Toast } from 'antd-mobile'

@connect(state => {
  return {
    auth: state.auth,
  }
})
class BindMoblePhone extends Component {

  state = {
    url: '',
    disable:false,
    mobile: null,
    imgCode: null,
    code: null,
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
    defaultPhone: '',
  }

  changeImg = () => {
    captcha().then(data => {
      this.setState({
        url: data.url,
      })
    })
  }

  onChange = () => {
    const mobile = this.refs.mobile.value
    const imgCode = this.refs.imgCode.value
    const code = this.refs.code.value
    if(mobile.length> 0 && imgCode.length > 0 && code.length > 0) {
      // console.log(mobile, imgCode, code)
      this.setState({
        disable: true,
      })
    }
    this.setState({
      mobile,
      imgCode,
      code,
    })
  }

  Clear = () => {
    this.setState({
      disableCode: true,
      tipFont: '获取验证码',
    })
    clearInterval(this.timer)
  }

  getCode = () => {
    if(!F.changePhoneNumber(this.state.mobile)) return  Toast.info('请输入正确的手机号码' ,1)
    if(!this.state.imgCode) return Toast.info('请输入图形验证码' ,1)
    if (this.state.disableCode){
      mobile({
        mobile: this.state.mobile,
        captcha: this.state.imgCode,
        sms_type: 3,
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
          Toast.info('号码已经存在', 1)
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
  }

  bindPhone = () => {
    if(this.state.disable) {
      bindMobile({
        smsType: 3,
        mobile: this.state.mobile,
        code: this.state.code,
      }).then(data => {
        // console.log(data)
        if(data) {
          Toast.info('绑定成功', 1)
          setTimeout(() => {
            this.props.history.go(-1)
          }, 1200)
        }
      })
        .catch(err => {
          Toast.info(err.errMsg, 1)
         // console.log(err)
        })
    }
  }

  componentDidMount() {
    console.log(this.props.auth.phone)
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
    return (
      <div className={style.BindMoblePhoneWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >绑定手机</NavBar>
        <div className={style.inputBox}>
          <div className={style.inputItem}>
            <input onChange={this.onChange} maxLength="11" ref="mobile" placeholder="请输入手机号码" type="text" />
          </div>
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input onChange={this.onChange}  ref="imgCode" placeholder="请输入图形验证码" type="text" />
            </div>
            <div onClick={this.changeImg} className={style.clickBox}>
              <img src={this.state.url} alt="img" />
            </div>
          </div>
          <div className={style.userItem}>
            <div className={style.inputItem}>
              <input onChange={this.onChange}  ref="code" placeholder="请输入手机验证码" type="text" />
            </div>
            <div onClick={this.getCode}
                 className={`${style.clickBox} ${this.state.disableCode ? null : style.disabledCode}`}>
              {this.state.tipFont}
            </div>
          </div>
        </div>
        <div onClick={this.bindPhone} className={`${style.btn} ${this.state.disable ? null : style.disable}`}>
          <p>绑定</p>
        </div>
      </div>
    )
  }
}

export default BindMoblePhone

