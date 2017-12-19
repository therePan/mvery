import React from 'react'
import style from './style.less'

const ComInfor = (props) => {
  const data = props.company
  // console.log(props)
  return (
    <div className={style.content}>
      <div className={style.title}>{data.company_name}</div>
      <ul>
        <div>
          <li className={style.first}>{data.industry || "未知"}</li>
          <li className={style.second}>{data.company_size || "未知"}</li>
        </div>
        <li className={style.third}>{data.company_nature || "未知"}</li>
        <li className={style.fourth}>{data.star_level || "未知"}</li>
      </ul>
    </div>
  )
}

export default ComInfor
