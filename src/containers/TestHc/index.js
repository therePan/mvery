/**
 * Created by huangchao on 2017/9/21.
 */

import React, { Component } from 'react'
import SearchHot from '../../components/SearchHot'
import SearchHistory from '../../components/SearchHistory'
import SearchClassify from '../../components/SearchClassify'
import MySearchBar from '../../components/SearchBar'
import resume from '@static/resume@3x.png'
// import compant from '@static/company@3x.png'
// import welfare from '@static/welfare@3x.png'
let searchClassify = {
  position: ['酒店餐厅管理', '酒店经理酒店', '五星级酒店前台'],
  company: ['东方大酒店', '杭州大酒店', '北京大酒店'],
  welfare: ['酒店供应', '酒店前台'],
}
class TestHc extends Component {
  touchHot = (item) => {
    console.log(item)
  }
  touchSearchItem = (d) => {
    console.log(d)
  }
  item = () => {
    return ['五险 1 金', '五险 2 金', '五险 3 金', '体检', '包吃住']
  }
  search = (val) => {
    console.log(val)
  }
  render() {
    return (
      <div>
        <h3>搜索框</h3>
        <MySearchBar
          callback={this.search}
          cityName="北京"
          showCity="true"
          defaultValue="" // 输入框的默认值
          placeholder="请输入职位或者公司"
        />
        <h3>热门搜索</h3>
        <SearchHot data={this.item()} callbackParent={this.touchHot} />
        <h3>历史记录</h3>
        <SearchHistory />
        <h3>关键字搜索下拉菜单</h3>
        <SearchClassify
          title="职位"
          src={resume}
          data={searchClassify.position.slice(0, 3)}
          callback={this.touchSearchItem}
        />
      </div>
    )
  }
}

export default TestHc

// <SearchClassify
// title="企业"
// src={compant}
// data={searchClassify.company.slice(0, 3)}
// callback={this.touchSearchItem}
// />
// <SearchClassify
//   title="福利"
//   src={welfare}
//   data={searchClassify.welfare.slice(0, 3)}
//   callback={this.touchSearchItem}
// />
