/**
 * Created by huangchao on 2017/9/29.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import JobCard from '../../components/JobCard'
import MySearchBar from '../../components/SearchBar'
import style from './style.less'
import FilterSearch from '../../components/FilterSearch'
import F from '../../helper/tool'
import {getSearchInit, getSearchListadd} from '../../actions/jobPage' // getSearchListref
import { ListView } from 'antd-mobile' // RefreshControl
// import PropTypes from 'prop-types'

@connect((state) => ({
  refreshing: state.jobpage.refreshing,
  isLoading: state.jobpage.isLoading,
  searchLIst: state.jobpage.list,
  pager: state.jobpage.pager,
  userStatus: state.userStatus,
}))
class JobPage extends Component {
  static propTypes = {
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = []
    this.state = {
      stareSearch: false,
      dataSource,
      page: 1,
      Loaded: 'Loading',
      defaultValue: '请输入职位或者公司',
      searchCondition: {},
    }
  }

  filterSearch = (value = {}) => {
    //position 行业
    //area	地区编码
    //salary 薪酬范围  多个值，则用逗号分隔再上传
    //update_time 发布时间 education 学历 room_board 食宿情况 work_mode 职位性质
    const position =(value.company_industry || []).join(',')
    const area = (value.area || []).join(',')
    const salary = value.salary || 0
    const more = value.more || {}
    const queryArray = {
      ...this.state.searchCondition,
      ...more,
      position,
      area,
      salary,
    }
    this.setState({
      searchCondition: F.filterUndefind(queryArray),
      page: 1,
    }, () => {
      this.props.dispatch(getSearchInit({
        page: 1,
        size: this.props.pager.size,
        ...this.state.searchCondition,
      }))
    })
  }

  searchFocus = () => {
    this.props.history.push('/search', {form: 'tab:job'})
  }

  // onRefresh = () => { // 下拉刷新
  //   const data = this.props.location.state || {}
  //   if (!this.props.refreshing) {
  //     this.setState({
  //       page: 1,
  //     })
  //     this.props.dispatch(getSearchListref({
  //       ...data,
  //       ...this.state.searchCondition,
  //       page: 1,
  //       size: this.props.pager.size,
  //       area: this.state.searchCondition.area || this.props.userStatus.code[0] || '',
  //     }))
  //   }
  // }

  onEndReached = () => { // 上拉加载
    const page = this.state.page + 1
    const searchState = this.props.location.state || {}
    const allPage = this.props.pager.allPage
    this.setState({
      page: page,
    })
    // console.log(page, allPage)
    if(page <= allPage) {
      this.props.dispatch(getSearchListadd({
        ...searchState,
        ...this.state.searchCondition,
        page: page,
        size: this.props.pager.size,
        area: this.state.searchCondition.area || this.props.userStatus.code[0] || '',
      }))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }

  componentWillMount() {
    const data = this.props.location.state || {}
    // console.log(data)
    if(data.keyword) {
      this.setState({
        defaultValue: data.keyword,
      })
    }
    this.props.dispatch(getSearchInit({
      ...data,
      page: 1,
      size: this.props.pager.size,
      area: this.props.userStatus.code && (this.props.userStatus.code[0] || ''), // 地区编码 用户选择的时候给上
    }))
  }

  componentWillReceiveProps(nextProps) {
    const thisList = this.props.searchLIst
    const nextList = nextProps.searchLIst
    if (thisList !== nextList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextList),
      })
    }

    if(this.props.location.state !== nextProps.location.state){
      // console.log(this.props.userStatus.code[0])
      const data = nextProps.location.state || {}
      if(data !== {}){
        this.props.dispatch(getSearchInit({
          ...data,
          ...this.state.searchCondition,
          page: 1,
          size: this.props.pager.size,
          area: this.state.searchCondition.area || this.props.userStatus.code[0] || '',
        }))
      }
    }
  }

  // shouldComponentUpdate(props, nextprops) {
  //   // console.log(props, nextprops)
  //   if(props.searchLIst === nextprops) {
  //     return false
  //   }
  //   return true
  // }

  render() {
    // console.log(this.props.searchLIst)
    // console.log(this.props)
    const Row = (d) => {
      return <div className={style.listItem}>
        <Link to={`/${d.company_id}/${d.job_id}`}>
          <JobCard data={d} />
        </Link>
      </div>
    }
    return (
      <div className={style.JobPageWrap}>
        <div className={style.top}>
          <MySearchBar
            callback={this.search}
            searchFocus={this.searchFocus}
            cityName="北京"
            showCity="false"
            defaultValue="" // 输入框的默认值
            placeholder={this.state.defaultValue}
          />
          <div className={style.searchCondition}>
            <FilterSearch onChange={this.filterSearch} />
          </div>
        </div>
        <div className={style.listBox}>
          <ListView
            className={style.listView}
            dataSource={this.state.dataSource}
            renderRow={Row}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={200}
            initialListSize={0}
            pageSize={20}
            style={{
              height: 'calc(100vh - 3rem)',
            }}
            onEndReached={this.onEndReached} // 上啦加载
            renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
              {this.props.isLoading ? 'Loading...' : this.state.Loaded}
            </div>)}
          />
        </div>
      </div>
    )
  }
}

export default JobPage

//  {/* useBodyScroll */}
// style={{
//   height: 'calc(100vh - 3rem)',
// }}
// refreshControl={<RefreshControl // 下啦刷新
//   refreshing={this.props.refreshing}
//   onRefresh={this.onRefresh}
// />}
