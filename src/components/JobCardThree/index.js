/**
 * Created by huangchao on 2017/10/13.
 * 职位组件，用于投递记录
 */
import React from 'react'
import style from '../JobCardTwo/style.less'
import end from '@static/icon_deliver_stop.png'
// import leeter from '@static/leeter@3x.png'

const JobCardThree = (props) => {
  // console.log(props)
  const {
    company_name,
    job_name,
    hot,
    salary,
    time,
    is_stop,
  } = props
  return (
    <div className={style.JobCardTwoWrap}>
      <div className={style.connent}>
        <div className={style.top}>
          <div className={style.left}>
            <div className={style.position}>{job_name}</div>
            {hot ? <div className={style.hot}>热招</div> : null}
          </div>
          <div className={style.salary}>
            {salary}
          </div>
        </div>
        <div className={style.middle}>
          <div className={style.companyName}>
            {company_name}
          </div>
          <div className={style.time}>
            {time}
          </div>
        </div>
        {is_stop ? <div className={style.end}>
            <img src={end} alt="结束" />
          </div> : null}
      </div>
    </div>
  )
}

export default JobCardThree
