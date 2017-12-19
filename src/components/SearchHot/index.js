/**
 * Created by huangchao on 2017/9/21.
 */
import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'
import searchHot from '@static/search_hot@3x.png'

const SearchHot = (props) => {
  return (
    <div className={style.searchHotBox}>
      <div className={style.title}>
        <img className={style.titleImg} src={searchHot} alt="hot" />
        <span>热门搜索</span>
      </div>
      <div className={style.hotItem}>
        <ul>
          {(props.data).map((item, index) => {
            return <li key={index} onClick={() => props.callbackParent(item.word)}>{item.word}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

SearchHot.propTypes = {
  data: PropTypes.array,
}

export default SearchHot
