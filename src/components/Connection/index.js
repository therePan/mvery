import React from 'react'
import style from './style.less'

const Connection = (props) => {
  // console.log(props)
  const data = props.company
  return (
    <div className={style.content}>
      <div className={style.title}>联系方式</div>
      <ul>
        <li>联系人：{data.contact_name}</li>
        <li>手机：<a href={`${data.contact_phone}`}>{data.contact_phone}</a></li>
        <li>邮箱：<a>{data.contact_email}</a></li>
        <li>地址：{data.address}</li>
      </ul>
    </div>
  )
}

export default Connection
