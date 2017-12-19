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
      <div className={style.salary}>
        {data.salary}
      </div>
    </div>
    <div className={style.middle}>
      <div className={style.companyName}>
        {data.company_name}
      </div>
      <div className={style.time}>
        {F.procesTime(data.update_time)}
      </div>
    </div>
    <div className={style.footerBox}>
      {data.work_place || data.job_area}
    </div>
  </div>
}
export default JobCard

/*
 <Card className={style.jobCard}>
 <Card.Header
 className={style.cardHeader}
 title={
 <div className={style.cardTiele}>
 {data.job_name}
 {data.is_urgent === '1'
 ? <span className={style.hot}>热招</span> : null }
 </div>
 }
 extra={<span className={style.salary}></span>}
 />
 <Card.Body className={style.cardCenter}>
 <div className={style.inner}>
 <div className={style.hotelName}>{data.company_name}</div>
 <div className={style.dataTime}>{F.procesTime(data.update_time)}</div>
 </div>
 </Card.Body >
 <Card.Footer
 className={style.cardFooter}
 content={data.work_place || data.job_area}
 />
 </Card>
*/
