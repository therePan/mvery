/**
 * Created by huangchao on 2017/11/2.
 */
import React from 'react'
import style from './style.less'
import nothingImg from '@static/icon_feedback_im.png'

const Nothing = (props) => {
  const {font} = props
  return (
    <div className={style.nothing}>
      <img src={nothingImg} alt="" />
      <span>{font || '什么都没有'}</span>
    </div>
  )
}

export default Nothing
