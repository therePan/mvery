/**
 * Created by huangchao on 2017/11/2.
 */

import React from 'react'
import style from './style.less'
import icNews from '@static/ic_news.png'
import icMsgNews from '@static/ic_msg_news.png'
import icHr from '@static/ic_hr.png'
import icMsgHr from '@static/ic__msg_hr.png'

const showImg = (type, isRead) => {
  if(type === 1) {
    if(isRead === '1') return icNews
    return icMsgNews
  }
  if(type === 2) {
    if(isRead === '1') return icHr
    return icMsgHr
  }
}

const MessageItem = (props) => {
  const {
    sender,
    is_read,
    date,
    type,
    subject,
  } = props
  return (
    <div className={style.MessageItemWrap}>
      <div className={style.connent}>
        <div className={style.titleImg}>
          <img src={showImg(type, is_read)} alt="img" />
        </div>
        <div className={style.rightConnent}>
          <div className={style.rightTop}>
            {subject}
          </div>
          <div className={style.rightMiddle}>
            <div className={style.letft}>{sender}</div>
            <div className={style.right}>{date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem

