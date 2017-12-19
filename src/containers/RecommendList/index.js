import React from 'react';
import {connect} from 'react-redux'
import JobCard from '../../components/JobCard'
import { pipeline } from '../../helper/fetching'
import { getSearchListInit, getSearchListadd } from '../../actions/search'
import { ListView } from 'antd-mobile'
import style from './style.less'
import { Link } from 'react-router-dom'

@connect(state => ({
  list: state.search.list,
  refreshing: state.search.refreshing,
  pager: state.search.pager,
}))
class RecommendList extends React.Component {
    constructor(props) {
      super(props)
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state = {
        dataSource,
        page: 1,
        Loaded: 'Loading',
      }
    }
    
    componentDidMount() {
      pipeline(':ve.my/user/subscribe/index').then(data => {
        const id = data.data.data[0].id
        return pipeline(`:ve.my/user/api/getSubscribeData?id=${id}`)
      }).then(json => {
        this.props.dispatch(getSearchListInit({
          ...json.data,
          page: 1,
        }))
      }).catch(() => {
        this.props.dispatch(getSearchListInit({
          page: 1,
        }))
      })
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.list && this.props.list !== nextProps.list) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.list),
        })
      }
    }

    onEndReached = () => { // 上拉加载
      const page = this.state.page + 1
      const allPage = this.props.pager.allPage
      this.setState({
        page: page,
      })
      if(page <= allPage) {
        this.props.dispatch(getSearchListadd({
          page: page,
          size: this.props.pager.size,
        }))
      } else {
        this.setState({
          Loaded: '没有更多了',
        })
      }
    }

    render() {
      const Row = (props) => (
        <div className={style.listItem}>
        <Link to={`/positiondetail/${props.job_id}`}>
          <JobCard data={props} />
        </Link>
      </div>
      )
      return (
        <div>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={Row}
            scrollEventThrottle={200}
            initialListSize={15}
            pageSize={15}
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 1.87rem)',
            }}
            scrollRenderAheadDistance={200}
            onEndReached={this.onEndReached} // 上啦加载
            renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
              {this.props.isLoading ? 'Loading...' : this.state.Loaded}
            </div>)}
          />
        </div>
      )
    }
}

export default RecommendList;
