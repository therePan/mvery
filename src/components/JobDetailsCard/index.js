import React from 'react'
import { Card } from 'antd-mobile'
import style from './style.less'
import area from '../../static/area@3x.png'
import experience from '../../static/experience@3x.png'
import education from '../../static/education@3x.png'
import jobType from '../../static/jobType@3x.png'
import F from '../../helper/tool'

const JobDetailsCard = (props) => {
  const data = props.position || {}
  const datalabel = props.position.company_detail || {}
  const age = data.conditions ? `${data.conditions}岁` : '年龄不限'
  return (
    <Card className={style.jobCard}>
      <Card.Header
        className={style.cardHeader}
        title={
          <div style={{color: '#333333'}}>{data.job_name}</div>
        }
        extra={<span className={style.salary}>{data.salary}</span>}
      />
      <Card.Body className={style.cardCenter}>
        <div className={style.inner}>
          <div className={style.left}>
            <ul className={style.mustBeCon}>
              <li style={{background: `url(${area}) no-repeat left center/0.24rem`}}>{data.work_place}</li>
              <li style={{background: `url(${experience}) no-repeat left center/0.28rem`}}>{data.exp}</li>
              <li style={{background: `url(${education}) no-repeat left center/0.28rem`}}>{data.education}</li>
              <li style={{background: `url(${jobType}) no-repeat left center/0.28rem`}}>{data.nature}</li>
            </ul>
            <div className={style.otherNeed}>招{data.recruit_num || '若干'}人/{data.room_board}/{age}</div>
          </div>
          <div className={style.right}>{F.procesTime(data.update_time)}</div>
        </div>
        <ul className={style.welfare}>
          {(datalabel.label || []).map((data, index) => {
            return <li key={index}>{data}</li>
          })}
        </ul>
      </Card.Body >
    </Card>
  )
}
export default JobDetailsCard
