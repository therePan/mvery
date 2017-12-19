/**
 * Created by huangchao on 2017/9/22.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import search from '@static/search@3x.png'
import rectangle from '@static/Rectangle@3x.png'

class SearchClassify extends Component {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array,
    callback: PropTypes.func,
  }
  callback = () => { // 当点击'查看更多'的时候，返回关键词
    let keyword = this.props.keyWord
    let scope = this.props.scope
    this.props.callback({
      keyword,
      scope,
    })
  }

  replaceFont = (d) => {
    let searchis = this.props.keyWord
    let result = []
    let split = d.split(new RegExp(searchis, 'g'))
    split.forEach((item, index) => {
      result.push(item)
      if (index < split.length - 1) {
        result.push(<span key={index} className={style.active}>{searchis}</span>)
      }
    })
    return result
  }
  render() {
    let {src, title, data = [], callback, scope} = this.props
    return (
      <div className={style.SearchClassify}>
        <div className={style.titleBox}>
          <img className={style.img} src={src} alt="img" />
          <span>{title}</span>
        </div>
        <div className={style.item}>
          <ul>
            {
              data.map((d, i) => (
                <li key={i} onClick={() => callback({keyword:d, scope:scope})}>
                  <img className={style.searchImg} src={search} alt="search" />
                  <span className={style.name}>{this.replaceFont(d)}</span>
                </li>
              ))
            }
          </ul>
          {
            data.length === 3
            ? <div className={style.more} onClick={this.callback}>
              <div className={style.font}>
                <img className={style.searchImg} src={search} alt="search" />
                <span className={style.name}>查看更多</span>
              </div>
              <div>
                <img className={style.rectangle} src={rectangle} alt="rectangle" />
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default SearchClassify
