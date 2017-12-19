/**
 * Created by huangchao on 2017/9/29.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import TabsHome from '../HomePage'
import Tabsjob from '../JobPage'
import TabsMassage from '../MassagePage'
import TabsUser from '../UserPage'
import selHome from '@static/selHome@3x.png'
import unHome from '@static/unHome@3x.png'
import unmassage from '@static/unmassage@3x.png'
import massage from '@static/massage@3x.png'
import mine from '@static/mine@3x.png'
import unmine from '@static/unmine@3x.png'
import job from '@static/job@3x.png'
import unjob from '@static/unjob@3x.png'

class Tabs extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  }
  state = {
    selectedTab: 'redTab',
    dot: true,
  }

  TabBarSelect = name => {
    this.props.history.replace(`/tabs/${name}`)
  }
  render() {
    return (
      <div>
        <TabBar
          unselectedTintColor="#333333"
          tintColor="#FF4F00"
          barTintColor="white"
        >
          <TabBar.Item
            title="主页"
            key="home"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${unHome}) center center /  0.42rem 0.42rem no-repeat` }}
          />}
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${selHome}) center center /  0.42rem 0.42rem no-repeat` }}
          />}
            selected={this.props.match.params.name === 'home'}
            onPress={() => this.TabBarSelect('home')}
            data-seed="logId"
          >
            <TabsHome {...this.props} />
          </TabBar.Item>
          <TabBar.Item
            title="工作"
            key="job"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${unjob}) center center /  0.42rem 0.42rem no-repeat` }}
            />}
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${job}) center center /  0.42rem 0.42rem no-repeat` }}
            />}
            selected={this.props.match.params.name === 'job'}
            onPress={() => this.TabBarSelect('job')}
            data-seed="logId1"
          >
            <Tabsjob {...this.props} />
          </TabBar.Item>
          <TabBar.Item
            title="消息"
            key="massage"
            icon={
              <div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: `url(${unmassage}) center center /  0.42rem 0.42rem no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '0.44rem',
                height: '0.44rem',
                background: `url(${massage}) center center /  0.42rem 0.42rem no-repeat` }}
              />
            }
            selected={this.props.match.params.name === 'massage'}
            onPress={() => this.TabBarSelect('massage')}
          >
            <TabsMassage {...this.props} />
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="user"
            icon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${unmine}) center center /  0.42rem 0.42rem no-repeat` }}
            />}
            selectedIcon={<div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: `url(${mine}) center center /  0.42rem 0.42rem no-repeat` }}
            />}
            selected={this.props.match.params.name === 'user'}
            onPress={() => this.TabBarSelect('user')}
          >
            <TabsUser {...this.props} />
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}

export default Tabs
