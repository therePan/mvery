/**
 * Created by huangchao on 2017/10/11.
 */
import React from 'react'
import style from './style.less'
import JobCard from '../../components/JobCard/typeTwo'

const RestPosition = (props) => {
  let {src, title, data} = props
  let list = data || []
  // console.log(list)
  return (
    <div className={style.RestPositionWrap}>
      <div className={style.title}>
        <img className={style.titleImg} src={src} alt="图片" />
        <span>{title}</span>
      </div>
      {list.map((d, i) => {
        return <div key={i} className={style.listItem} onClick={()=>{props.callback(d.job_id, d.c_userid)}}>
          <JobCard data={d} />
        </div>
      })}
    </div>
  )
}
export default RestPosition
