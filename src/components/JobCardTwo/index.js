/**
 * Created by huangchao on 2017/10/13.
 * 职位组件，用于投递记录
 */
import React from 'react'
import style from './style.less'
import chat from '@static/chat@3x.png'
import end from '@static/icon_deliver_stop.png'


const  showType = (type, clickable, remindCallback, job_id, company_id) => {
  if(type === 1) {
    if(clickable === 1) {
      return <div onClick={(e) => remindCallback(e, job_id, company_id)} className={`${style.best} ${style.remind}`}>
        提醒企业
      </div>
    }
    return <div className={`${style.best} ${style.remind} ${style.hasremind}`}>
      已提醒
    </div>
  }
  if( type === 2) {
    return <div className={`${style.best}`}>
      【已查看】
    </div>
  }
  if(type === 3) {
    return <div className={`${style.best}`}>
      【面试邀约】
    </div>
  }
  if(type === 4) {
    return <div className={`${style.best}`}>
      【不合适】
    </div>
  }
}
const JobCardTwo = (props) => {
  const {chartCallback,
    remindCallback,
    company_name,
    job_name,
    hot,
    salary,
    time,
    is_allow_contact,
    job_id,
    is_stop,
    type,
    clickable,
    company_id,
  } = props
  // console.log(props)
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
        <div className={style.footerBox}>
          {is_allow_contact ? is_stop ? null :
              <div onClick={(e) => chartCallback(e, job_id, company_id)} className={style.chat}>
                <img src={chat} alt="聊天" />
                <span>沟通</span>
              </div> : null
          }
          {showType(type, clickable, remindCallback, job_id, company_id)}
        </div>
        {is_stop ? <div className={style.end}>
            <img src={end} alt="结束" />
          </div> : null}
      </div>
    </div>
  )
}

export default JobCardTwo
