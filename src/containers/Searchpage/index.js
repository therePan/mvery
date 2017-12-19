/**
 * Created by huangchao on 2017/9/30.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import MySearchBar from '../../components/SearchBar'
import SearchClassify from '../../components/SearchClassify'
import {getSearchTips} from '../../actions/search'
import SearchHot from '../../components/SearchHot'
import SearchHistory from '../../components/SearchHistory'
import F from '../../helper/tool'
import resume from '@static/sresume@3x.png'
import qiye from '@static/scompany@3x.png'
import welfares from '@static/sfuli@3x.png'
import style from './style.less'
import {getSearchHot} from '../../actions/search'
// import PropTypes from 'prop-types'

@connect(state => {
  return {
    hot: state.search.hot,
    tips: state.search.tips,
  }
})
class SearchPage extends Component {
  static propTypes = {
  }

  state = {
    stareSearch: false,
  }

  change=(keyWord) => {
    this.setState({
      stareSearch: true,
      keyWord: keyWord,
    })
    this.props.dispatch(getSearchTips({
      keyword: keyWord,
      count: 3,
    }))
  }

  Cancel = () => {
    this.props.history.go(-1)
  }

  touchHot = (item) => { //热门搜索
    const searchHistory = JSON.parse(localStorage.getItem('m:searchHis') || '[]')
    searchHistory.unshift(item)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem('m:searchHis', JSON.stringify(F.ArrayDelRepetition(newHis)))
    const state = this.props.location.state || {}
    if(state.hasOwnProperty('form') && state.form === 'tab:job') { // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/tabs/job/`, {keyword:item})
    } else {
      this.props.history.push(`/search/${item}`, {keyword:item})
    }
  }

  search = (val) => { //搜索
    const searchHistory = JSON.parse(localStorage.getItem('m:searchHis') || '[]')
    searchHistory.unshift(val)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem('m:searchHis', JSON.stringify(F.ArrayDelRepetition(newHis)))
    const state = this.props.location.state || {}
    if(state.hasOwnProperty('form') && state.form === 'tab:job') { // 页面是从tab：job页面进入的
     // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/tabs/job/`, {keyword:val})
    } else {
      this.props.history.push(`/search/${val}`, {keyword:val})
    }
  }

  touchSearchItem = (val) => { // 点击筛选结果
    const searchHistory = JSON.parse(localStorage.getItem('m:searchHis') || '[]')
    searchHistory.unshift(val.keyword)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem('m:searchHis', JSON.stringify(F.ArrayDelRepetition(newHis)))
    const state = this.props.location.state || {}
    if(state.hasOwnProperty('form') && state.form === 'tab:job') { // 页面是从tab：job页面进入的
     // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/tabs/job/`, {...val})
    } else {
      this.props.history.push(`/search/${val.keyword}`, {...val})
    }
  }

  searcHis = (keyWord) => { // 点击历史记录
    const searchHistory = JSON.parse(localStorage.getItem('m:searchHis') || '[]')
    searchHistory.unshift(keyWord)
    const newHis = searchHistory.slice(0, 5)
    localStorage.setItem('m:searchHis', JSON.stringify(F.ArrayDelRepetition(newHis)))
    const state = this.props.location.state || {}
    if(state.hasOwnProperty('form') && state.form === 'tab:job') { // 页面是从tab：job页面进入的
      // console.log('从tab_job进入的'+state.form)
      this.props.history.push(`/tabs/job/`, {keyword: keyWord})
    } else {
      this.props.history.push(`/search/${keyWord}`, {keyword: keyWord})
    }
  }

  ShowPost = (job = []) => {
    if(job.length > 0) {
      return <SearchClassify
        title="职位"
        scope="2"
        keyWord={this.state.keyWord}
        src={resume}
        data={job}
        callback={this.touchSearchItem}
      />
    }
  }
  ShowCompany = (company = []) => {
    if(company.length > 0) {
      return <SearchClassify
        title="企业"
        scope="3"
        keyWord={this.state.keyWord}
        src={qiye}
        data={company}
        callback={this.touchSearchItem}
      />
    }
  }
  ShowWelfare = (welfare = []) => {
    if(welfare.length > 0) {
      return <SearchClassify
        title="福利"
        scope="4"
        keyWord={this.state.keyWord}
        src={welfares}
        data={welfare}
        callback={this.touchSearchItem}
      />
    }
  }
  ShowSearchEnd = () => {
    // console.log(this.props.tips)
    if(this.state.stareSearch) {
      return <div>
        {this.ShowPost(this.props.tips.job)}
        {this.ShowCompany(this.props.tips.company)}
        {this.ShowWelfare(this.props.tips.welfare)}
      </div>
    } else {
      return <div>
        <SearchHot data={this.props.hot} callbackParent={this.touchHot} />
        <SearchHistory callback={this.searcHis} {...this.props}/>
      </div>
    }
  }
  componentDidMount() {
    this.props.dispatch(getSearchHot())
  }
  render() {
    // console.log(this.props)
    return (
      <div className={style.SearchPageWrap}>
        <MySearchBar
          callback={this.search}
          touchCancel={this.Cancel}
          onChange={this.change}
          autoFocus
          showCity="true"
          defaultValue="" // 输入框的默认值
          placeholder="请输入职位或者公司"
        />
        {this.ShowSearchEnd()}
      </div>
    )
  }
}

export default SearchPage
