/**
 * Created by huangchao on 2017/10/25.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import { Link } from 'react-router-dom'
import SearchEndBar from '../../components/SearchEndBar'
import JobCard from '../../components/JobCard'
import FilterSearch from '../../components/FilterSearch'
import {getSearchListInit, getSearchListadd} from '../../actions/search'
import F from '../../helper/tool'
import { ListView } from 'antd-mobile'
// import PropTypes from 'prop-types'

@connect(state => {
  return {
    isLoading: state.search.isLoading,
    searchLIst: state.search.list,
    pager: state.search.pager,
    userStatus: state.userStatus,
  }
})
class SearchEnd extends Component {
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
      searchCondition: {},
    }
  }

  goBack = () => {
    this.props.history.go(-1)
  }

  onEndReached = () => { // 上拉加载
    const page = this.state.page + 1
    // const searchState = this.props.location.state
    const allPage = this.props.pager.allPage
    this.setState({
      page: page,
    })
    if(page <= allPage) {
      this.props.dispatch(getSearchListadd({
        page: page,
        size: this.props.pager.size,
        area: this.props.userStatus.code[0] || '',
        ...this.state.searchCondition,
      }))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }

  showCount = () => {
    const count = this.props.pager.count || 0
    return count > 10000 ? '10000+' : count
  }

  filterSearch = (value = {}) => {
    //position 行业
    //area	地区编码
    //salary 薪酬范围  多个值，则用逗号分隔再上传
    //update_time 发布时间 education 学历 room_board 食宿情况 work_mode 职位性质
    const position =(value.position || []).join(',')
    const area = (value.area || []).join(',')
    const salary = value.salary || 0
    const more = value.more || {}
    // console.log(this.state.keyword, value)
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
      // console.log(this.props, this.props.userStatus.code[0], area)
      this.props.dispatch(getSearchListInit({
        page: 1,
        size: this.props.pager.size,
        area: this.props.userStatus.code[0] || '',
        ...this.state.searchCondition,
      }))
    })
  }

  componentDidMount() {
    const searchState = this.props.location.state
    this.setState({
      searchCondition: {
        ...searchState,
      },
    })
    // console.log(searchState)
    this.props.dispatch(getSearchListInit({
      ...searchState,
      page: 1,
      size: this.props.pager.size,
      area: this.props.userStatus.code[0] || '',
    })).then(json => {
      if(json.data.count <= 15) {
        this.setState({
          Loaded: '没有更多了',
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.searchLIst
    const thisList = this.props.searchLIst
    if (nextList !== thisList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextList),
      })
    }
  }

  render() {
    const Row = (d) => {
      return <div className={style.listItem}>
        <Link to={`/${d.company_id}/${d.job_id}`}>
          <JobCard data={d} />
        </Link>
      </div>
    }
    // console.log(this.props.searchLIst)
    return (
      <div className={style.SearchEndWrap}>
        <div className={style.top}>
          <SearchEndBar
            goBack={this.goBack}
            keyword={this.state.searchCondition.keyword}
            number={this.showCount()}
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
            scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
            scrollEventThrottle={200}
            initialListSize={0}
            pageSize={15}
            useBodyScroll
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

export default SearchEnd
