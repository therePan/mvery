import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'
import MessageCard from '../../components/MessageCard/'
import TalkAbout from '../../components/TalkAbout/'

// @withRouter
class MessageList extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    chatList: PropTypes.array,
    info: PropTypes.object,
  }
  time = 0;
  addZero = (t) => {
    if (t<10 && t>0) {
      let zeroTime = '0' + t.toString()
      return zeroTime;
    } else {
      return t
    }
  }
  getaTime = (theDate) => {
    const dataTime = new Date(theDate)
    const date = (new Date());    //当前时间
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
    const yestday = new Date(today - 24*3600*1000).getTime();
    const toyear = new Date(date.getFullYear(), 0, 0).getTime()
    if (dataTime.getTime() - this.time > 3*60*1000) {
      this.time = dataTime.getTime();
      if (dataTime.getTime() > today) { //判断是否今天
        return this.addZero(dataTime.getHours()) + ":" + this.addZero(dataTime.getMinutes())
      } else if (dataTime.getTime() < yestday){ //判断昨天以前
        if (dataTime.getTime()<toyear) { //判断是否今年
          return dataTime.getFullYear() + '年' + (dataTime.getMonth() + 1) + '月' + dataTime.getDate() + '日 ' + this.addZero(dataTime.getHours()) + ':' + this.addZero(dataTime.getMinutes())
        } else {
          return dataTime.getMonth() + 1 + '月' + dataTime.getDate() + '日 ' + this.addZero(dataTime.getHours()) + ':' + this.addZero(dataTime.getMinutes())
        }
      }
    }else {
      this.time = dataTime.getTime();
      return null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.chatList.length !== nextProps.chatList.length) {
      this.time = 0;
    }
  }
  render() {
    const TimeTips = (props) => {
      return (
        <div className={style.timer}>{
          props.msgTime
        }</div>
      )
    }
    return (  
      <div className={style.content} ref={this.props.getRef} >
        <TalkAbout info={this.props.info}/>
        {
          this.props.chatList.map(
            (elem, index) => {
              return <div key={index}>
                <TimeTips timeNow={true} msgTime={this.getaTime(elem.add_time)}/>
                <MessageCard
                  key={index}
                  contents={elem.content}
                  right={this.props.match.params.id === elem.from_userid ? false : true}
                  {...this.props}
                />
              </div>
            }
          )
        }
      </div>
    )
  }
}

export default MessageList
