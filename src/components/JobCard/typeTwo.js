/**
 * Created by huangchao on 07/12/2017.
 * 职位卡片 适用于除了首页意外所有职位展示
 */
import React from 'react'
import F from '../../helper/tool'
import style from './style.less'
// import { Card } from 'antd-mobile'


const JobCard = (props) => {
  const data = props.data || {}
  return <div className={style.JobCardTwoWrap}>
    <div className={style.top}>
      <div className={style.left}>
        <div className={style.position}>{data.job_name}</div>
        {data.is_urgent === '1'
          ? <div className={style.hot}>热招</div> : null }
      </div>
    </div>
    <div className={style.middle}>
      <div className={style.companyName}>
        {data.company_name}
      </div>
      <div className={style.salary}>
        {data.salary}
      </div>
    </div>
    <div className={style.footerBox}>
      <div>
        {data.work_place || data.job_area}
      </div>
      <div className={style.time}>
        {F.procesTime(data.update_time)}
      </div>
    </div>
  </div>
}

export default JobCard
