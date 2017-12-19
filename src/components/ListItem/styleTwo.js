/**
 * Created by huangchao on 2017/9/25.
 */
// 用于list列表的单个元素 (更多设置里面的)
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less' //
import AngleRight from '@static/Rectangle@3x.png'

const ListItem = (props) => {
  let {underline, titleleft, righttitle, rightcontant, rightangle} = props
  return (
    <div className={style.ListItemWrap} style={{paddingRight: '0.46rem'}}>
      <div className={`${style.itemContant} ${underline === 'true' ? style.Line : null}`} style={{paddingRight: '0'}}>
        <div className={style.leftBox}>
          {titleleft}
        </div>
        <div className={style.rightBox}>
          <div className={style.rightTitle}>
            { righttitle ? `${righttitle}：` : null}
            <span>
              {rightcontant}
            </span>
          </div>
          {rightangle === 'false'
            ? null
            : <div className={style.RightAngle}>
              <img src={AngleRight} alt="img" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  underline: PropTypes.string,
  titleleft: PropTypes.string,
  righttitle: PropTypes.string,
  rightangle: PropTypes.string,
}

export default ListItem
