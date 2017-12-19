import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'antd-mobile'
import VisityCard from '../../components/VisityCard'
import { ListView } from 'antd-mobile';
import PropTypes from 'prop-types'
import { getVisityList, VisityRefreshing } from '../../actions/visity'
import style from './style.less'
import { Link } from 'react-router-dom'

@connect(state => ({
  history: state.history,
  visityList:state.visity.list,
  refreshing: state.visity.refreshing,
}))
class Visity extends React.Component {
  static propTypes = {
    visityList:PropTypes.array,
  }

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    }
  }
  refreshData = () => {
    this.props.dispatch(VisityRefreshing({
      page:1,
    }))
  } 
  componentWillMount() {
    this.props.dispatch(getVisityList({
      page:1,
    })).then(json => {
      if (json.errCode === 2002) {
        Modal.alert('', '请先登录', [
          { text: '稍后', style: 'default' },
          { text: '登录', onPress: () => this.props.push('/user/login', {rediact: this.props.location.pathname}) },
        ])
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visityList && this.props.visityList !== nextProps.visityList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.visityList),
      })
    }
  }
  render() {
    const Row = (data) => {
      return (
        <Link to={`/${data.c_userid}`}>
          <VisityCard data={data}/>
        </Link>
      )
    }
    return (
      <div className={style.content}>
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
        />
      </div>
    )
  }
}

export default Visity
