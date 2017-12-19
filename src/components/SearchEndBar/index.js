/**
 * Created by huangchao on 2017/10/25.
 */
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import angleDown from '@static/angleDown@3x.png'
import search from '@static/usearch@3x.png'

const SearchEndBar = (props) => {
  const {
    goBack = function() {},
    keyword,
    number,
  } = props
  return (
    <div className={style.SearchEndBarWrap}>
      <div onClick={() => (goBack())} className={style.left}>
        <img src={angleDown} alt="返回" />
      </div>
      <div onClick={() => (goBack())} className={`${style.right} ${style.leftConnent}`}>
        <div className={style.conleft}>
          <div className={style.img}>
            <img src={search} alt="放大镜"/>
          </div>
          <div className={style.keyWord}>{keyword}</div>
        </div>
        <div className={style.conright}>
          <div>
            {number}个职位
          </div>
        </div>
      </div>
    </div>
  )
}
SearchEndBar.propTypes = {
  keyword: PropTypes.string,
  goBack: PropTypes.func,
}
export default SearchEndBar
