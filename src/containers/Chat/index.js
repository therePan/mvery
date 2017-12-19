import React from 'react'
import { NavBar, Toast, Modal } from 'antd-mobile'
import PropTypes from 'prop-types'
import style from './style.less'
import SendMessage from '../../components/SendMessage/'
import MessageList from '../MessageList'
import { pipeline } from '../../helper/fetching'
import values from 'object.values'

class Chat extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  }
  scrollHeight = 0
  scrollP = false
  state = {
    info:{},
    chatList: [],
    index: 0,
    head:'',
    login: true,
  }
  sendMes = (mes) => {
    let regs = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    if (regs.test(mes)) {
      Toast.info('该版本不允许输入表情包',1.5)
    } else if(/^\s*$/.test(mes)){
      Toast.info('输入不允许为空',1.5)
    }else {
      pipeline(':ve.mobile.interface/user/chatSend',{
        to_userid: this.props.match.params.id,
        content: mes,
      })
      this.scrollP = false
    }
  } 

  getMes = (page = 0) => {
    pipeline(':ve.mobile.interface/user/chatList',{
      to_userid: this.props.match.params.id,
      limit: 20,
      index: page,
    }).then( 
      data => {
        if(data.status === 1) {
          let list = [...this.state.chatList, ...data.data.list] || []
          let listId = {};
          const listIndex = list.length ? list[0].id : 0;
          [...list].forEach((elem, index) => {
            listId[elem.id] = elem
          })
          let chatList = values(listId)
          this.setState({
            info: data.data.info,
            chatList: chatList,
            index: listIndex,
          })
        } else {
          if (data.errCode === 2002 && this.state.login) {
            this.setState({
              login: false,
            })
            Modal.alert('', '请先登录', [
              { text: '稍后', style: 'default' },
              { text: '登录', onPress: () => this.props.history.push('/user/login', {rediact: this.props.location.pathname}) },
            ])
          }
        }
      }
    )
  } 
  getHeadPhoto = () => {
    pipeline(':ve.mobile.interface/user/status',{   
    }).then(
      data => {
        if (data.status ===1) {
          this.setState({
            head: data.data.avatar,
          })
        }
      }
    )
  }

  scrollPage = () => {
    let scrollTop = this.msglist.scrollTop
    
    if (scrollTop===0) {
      this.getMes(this.state.index)
      this.scrollP = true
    }
  }

  scrollBto = (height) => {
    this.msglist.scrollTop = height || this.msglist.scrollHeight
  }

  componentDidMount() {
    this.getHeadPhoto()
    this.timer = setInterval(() => {
      this.getMes()
    },1000)
  }


  componentDidUpdate(prevProps, prevState) {
    this.msglist.addEventListener('scroll', this.scrollPage)
    if(prevState.chatList.length === 0 || !this.scrollP) {
      this.scrollBto()
    } else {
      if (this.state.chatList.length !==prevState.chatList.length) {
        let overHeight = this.msglist.scrollHeight - this.scrollHeight
        this.scrollHeight = this.msglist.scrollHeight
        this.scrollBto(overHeight)
      }
    }
  }

  componentWillUnmount() {
    this.msglist.removeEventListener('scroll', this.scrollPage);
    clearInterval(this.timer)
  }
  
  render() {
    return (
      <div className={style.chatCon} >
        <div className={style.headBar}>
          <NavBar
            mode="dark"
            onLeftClick={() => {this.props.history.push('/tabs/massage')}}
          >{this.state.info.company_name}</NavBar>
        </div>
        <MessageList 
          chatList={this.state.chatList}
          head = {this.state.head}
          info={this.state.info} 
          {...this.props} 
          getRef={(e)=>{ this.msglist = e}}
          // style={{height: "calc(~'100%-2rem')"}}
          style={{background:'red'}}
        />
        <div className={style.inputCon} ref={(e)=>{ this.sendCon = e}}>
          <SendMessage send={(msg) => {this.sendMes(msg)}} scrollBto = {() => {this.scrollBto()}}/>
        </div>
      </div>
    )
  }
}

export default Chat
