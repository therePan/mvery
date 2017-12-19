import React from 'react'
import style from './style.less'
import { Link } from 'react-router-dom'
import headimg from '@static/headimg@3x.png'

class ConnectCard extends React.Component {

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

    if(dataTime.getTime() < today && yestday <= dataTime.getTime()) { //判断是否昨天
      return "昨天"
    } else if (dataTime.getTime() > today) { //判断是否今天
      return this.addZero(dataTime.getHours()) + ":" + this.addZero(dataTime.getMinutes()) 
    } else if (dataTime.getTime() < yestday){ //判断昨天以前
      if (dataTime.getTime()<toyear) { //判断是否今年
        return dataTime.getFullYear() + '年' + (dataTime.getMonth() + 1) + '月' + dataTime.getDate() + '日'
      } else {
        return dataTime.getMonth() + 1 + '月' + dataTime.getDate() + '日'
      }
    }
  }
  render() {
    return (
      <Link className={style.content} to={`/chat/${this.props.msgList.userid}`}>
        <div className={style.left}>
          <img src={this.props.msgList.photo || headimg}/>
        </div>
        <div className={style.right}>
          <div className={style.connectTo}>
            <div className={style.name}>{this.props.msgList.name}</div>
            <div className={style.infor}>{this.props.msgList.content}</div>
          </div>
          <div className={style.connectDay}>{this.getaTime(this.props.msgList.add_time)}</div>
        </div>
      </Link>
    )
  }
}

export default ConnectCard
