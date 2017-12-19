/**
 * Created by huangchao on 2017/9/29.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import style from './style.less'
import Carousels from '../../components/Carousels'
import MySearchBar from '../../components/SearchBar'
import SquareList from '../../components/SquareList'
import JobCard from '../../components/JobCard'
import {getPostInit, refReshPost, addPost} from '../../actions/home'
import { ListView } from 'antd-mobile'

@connect(state => ({
  homeList: state.home.list,
  homeDate: state.home,
  userStatus: state.userStatus,
}))
class HomePage extends Component {
  static propTypes = {
    history: PropTypes.object,
    homeDate: PropTypes.object,
    homeList: PropTypes.array,
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = []
    this.state = {
      dataSource,
      page: 1,
      Loaded: 'Loading',
    }
  }

  searchFocus = () => {
    this.props.history.push('/search')
  }

  onTouchList = data => {
    this.props.history.push('/tabs/job', {...data})
  }

  onChangeCity = () => {
    console.log('1')
  }

  onRefresh = () => { // 下拉刷新
    if(!this.props.homeDate.refreshing) {
      // console.log(!this.props.homeDate.refreshing)
      this.setState({
        page: 1,
      })

      this.props.dispatch(refReshPost({
        location: '',
        page: 1,
      }))
    }
  }

  onEndReached = () => { // 上拉加载
    const page = this.state.page + 1
    const allPage = this.props.homeDate.pager.allPages
    this.setState({
      page: page,
    })
    if(page <= allPage) {
      this.props.dispatch(addPost({
        page: page,
        location: this.props.userStatus.code && (this.props.userStatus.code[0] || ''),
      }))
    } else {
      this.setState({
        Loaded: '没有更多了',
      })
    }
  }
  // onScroll = () => {
  //   let postList = this.refs.postList.getElementsByClassName('am-list-view-scrollview')[0]
  //   let amList = this.refs.postList.getElementsByClassName('am-list')[0]
  //   let offsetTop = Number(postList.offsetTop)
  //   // let ScroolTop = offsetTop + parseInt(amList.style.transform.split(',')[1])
  // }

  componentDidMount() {
    console.log(this.props.homeList)
    // if(this.props.homeList.length > 0) return
    this.props.dispatch(getPostInit({
      location: this.props.userStatus.code && (this.props.userStatus.code[0] || ''),
      page: 1,
    }))
  }

  componentWillReceiveProps(nextProps) {
    const nextList = nextProps.homeList
    const thisList = this.props.homeList
    if (nextList !== thisList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextList),
      })
    }
    if(nextProps.userStatus.code[0] !==(this.props.userStatus.code && this.props.userStatus.code[0]) ){
      this.props.dispatch(getPostInit({
        page: 1,
        location: nextProps.userStatus.code[0],
      }))
    }
  }

  render() {
    // const list = this.props.homeList || {}
    // console.log(this.props.homeList)
    const Row = (d) => {
      return <div className={style.listitem}>
        <Link to={`/${d.c_userid}/${d.job_id}`}>
          <JobCard data={d} />
        </Link>
      </div>
    }
    return (
      <div className={style.HomePageWrap}>
        <div className={style.searchBar}>
          <MySearchBar
            searchFocus={this.searchFocus}
            onChangeCity={this.onChangeCity}
            showCity="true"
            defaultValue="" // 输入框的默认值
            placeholder="请输入职位或者公司"
          />
        </div>
        <Carousels {...this.props}/>
        <SquareList classback={this.onTouchList} />
        <div ref="postList" className={style.postList}>
          <ListView
            className={style.listView}
            dataSource={this.state.dataSource}
            renderRow={Row}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={10}
            scrollEventThrottle={200}
            initialListSize={0}
            pageSize={15}
            useBodyScroll
            onEndReached={this.onEndReached} // 上啦加载
            renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
              {this.props.homeDate.isLoading ? 'Loading...' : this.state.Loaded}
            </div>)}
          />
        </div>
      </div>
    )
  }
}

export default HomePage

// refreshControl={<RefreshControl // 下啦刷新
//   refreshing={this.props.homeDate.refreshing}
//   onRefresh={this.onRefresh}
// />}
// renderHeader={() => <div className={style.header}>
// </div>}
// <Carousels {...this.props}/>
// <SquareList classback={this.onTouchList} />
