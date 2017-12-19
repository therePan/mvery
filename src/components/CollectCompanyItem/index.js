/**
 * Created by huangchao on 2017/10/31.
 * 仅用于收藏的ITEM
 */

import React from 'react'
import style from './style.less'
import text from '@static/icon_feedback_im.png'

const CollectCompanyItem = (props) => {
  const {company_logo, company_name, followed_date, jobs_num, myfollowed_job_new } = props
  return (
    <div className={style.CollectCompanyItemWrap}>
      <div className={style.innerContent}>
        <div className={style.leftContent}>
          <img src={company_logo || text} alt="logo" />
          {myfollowed_job_new ? <div className={style.drop} /> : null }
        </div>
        <div className={style.rightContent}>
          <div className={style.top}>
            {company_name}
          </div>
          <div className={style.middle}>
            <div className={style.middLeft}>
              <span>{jobs_num}个</span>在找职位
            </div>
            <div className={style.middRight}>
              {followed_date.split(' ')[0]}关注
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectCompanyItem
