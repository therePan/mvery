/**
 * Created by huangchao on 2017/11/1.
 * 仅用于收藏的职位ITEM
 */

import React from 'react'
import style from './style.less'
// import text from '@static/icon_feedback_im.png'

const CollectPostItem = (props) => {
  const {company_name, is_stop, job_name, job_area, favorite_date} = props
  return (
    <div className={style.CollectPostItemWrap}>
      <div className={style.JobCardTwoWrap}>
        <div className={style.top}>
          <div className={style.left}>
            {is_stop ? <div className={style.hot}>已结束</div> : null }
            <div className={style.position}>{job_name}</div>
          </div>
          <div className={style.salary}>
            {/* 面议 */}
          </div>
        </div>
        <div className={style.middle}>
          <div className={style.companyName}>
            {company_name}
          </div>
          <div className={style.time}>
            {/* 2017-30-20 */}
          </div>
        </div>
        <div className={style.footerBox}>
          <div className={style.footerLeft}>
            {job_area}
          </div>
          <div className={style.footerRight}>
            <span>{favorite_date.split(' ')[0]}</span>收藏
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectPostItem
