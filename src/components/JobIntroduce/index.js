import React from 'react'
import PropTypes from 'prop-types'
import style from './style.less'
import xiala from '../../static/xiala@3x.png'
import shangla from '../../static/shangla@3x.png'

class JobIntroduce extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = {
      open: 1,
      getMore: style.mesCon,
      height: '2.1rem',
    }
  }
  getMore = () => {
    if (this.state.open) {
      this.setState({
        open: 0,
        height: this.innerCon.offsetHeight + 70,
        getMore: style.mesCon + ' ' + style.moreMesCon,
      })
    } else {
      this.setState({
        open: 1,
        height: '2.1rem',
        getMore: style.mesCon,
      })
    }
  }
  render() {
    return (
      <div className={style.introduceContent}>
        <div className={style.title}>{this.props.title}</div>
        <div className={this.state.getMore} style={{ height: this.state.height }}>
          <div ref={(el) => { this.innerCon = el }}>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
            <p>1. 负责酒店前厅部的接待和管理工作，熟知前厅服务</p>
          </div>
          <span className={style.rejectThis}><span>举报该职位</span></span>
        </div>
        <div className={style.gtMore} >
          <img src={this.state.open ? xiala : shangla} onClick={() => this.getMore()} />
        </div>
      </div>
    )
  }
}

export default JobIntroduce
