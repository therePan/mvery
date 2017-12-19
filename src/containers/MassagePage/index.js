

import React, { Component } from 'react'
import style from './style.less'
import ConnectList from '../ConnectList'
import Visity from '../Visity'
import RecommendList from '../RecommendList'
import { Tabs, Badge } from 'antd-mobile';
import PropTypes from 'prop-types'

// import PropTypes from 'prop-types'
const TabPane = Tabs.TabPane
class MassagePage extends Component {
  static propTypes = {
    history: PropTypes.object,
  }
  callback = key => {
  }
  handleTabClick = key => {
    this.props.history.replace(this.props.match.url, { key })
  }
  render() {
    const { state } = this.props.location
    const num = state && state.key ? state.key : 1
    return (
      <div className={style.MassagePageWrap}>
        <Tabs 
          defaultActiveKey={`${num}`}
          onChange={this.callback}
          onTabClick={this.handleTabClick}
          swipeable={false}
          className={style.tabsCon}>
          <TabPane tab={<Badge>沟通</Badge>} key="1" >
            <ConnectList {...this.props} {...this.props.history} />
          </TabPane>
          <TabPane tab={<Badge>谁看过我</Badge>} key="2">
            <Visity {...this.props} {...this.props.history} />
          </TabPane>
          <TabPane tab={<Badge>推荐职位</Badge>} key="3">
            <RecommendList />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default MassagePage
