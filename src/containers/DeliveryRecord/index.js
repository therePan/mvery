/**
 * Created by huangchao on 2017/10/12.
 */
import React, { Component } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import JobCardTwo from '../../components/JobCardTwo'
import JobCardThree from '../../components/JobCardThree'
import JobCardFour from '../../components/JobCardFour'
import Nothing from '../../components/Nothing'
import { Tabs, Badge, NavBar, SwipeAction, Toast } from 'antd-mobile'
import {getDeliveryAll,
  getDeliveryLook,
  getDeliveryInterview,
  getDeliveryInappropriate,
  DeletetDelivery,
  readResume,
  remindHr} from '../../actions/DeliveryRecord'
const TabPane = Tabs.TabPane
// import PropTypes from 'prop-types'


@connect((state) => ({
  list1: state.DeliveryRecord.list1,
  list2: state.DeliveryRecord.list2,
  list3: state.DeliveryRecord.list3,
  list4: state.DeliveryRecord.list4,
}))
class DeliveryRecord extends Component {
  static propTypes = {
  }
  state = {
    type: 1,
  }

  handleTabClick = (type) => {
    this.setState({
      type,
    })
    this.props.dispatch(readResume({
      type,
    })).then(() => {
      if(type === '2') {
        this.props.dispatch(getDeliveryLook({
          type,
        }))
      }
      if(type === '3') {
        this.props.dispatch(getDeliveryInterview({
          type,
        }))
      }
      if(type === '4') {
        this.props.dispatch(getDeliveryInappropriate({
          type,
        }))
      }
    })
  }

  goChat = (e, job_id, company_id) => {
    e.stopPropagation()
    console.log('聊天' + company_id)
    this.props.history.push(`/chat/${company_id}`)
  }

  remind = (e, job_id, company_id) => {
    e.stopPropagation()
    console.log('提醒企业' + company_id)
    this.props.dispatch(remindHr({
      company_id,
    })).then(() => {
      Toast.info('提醒成功', 1)
    })
  }

  goPostionDetailpage = (job_id, company_id) => {
    this.props.history.push(`/${company_id}/${job_id}`)
  }

  goLetter = (message_id) => {
    this.props.history.push(`/person/letter/${message_id}`)
  }

  cancleCollect = (job_id) => {
    // console.log(job_id)
    this.props.dispatch(DeletetDelivery({
      job_id,
    }))
  }

  componentWillMount() {
    this.props.dispatch(getDeliveryAll({
      type: 1,
    })).then(() => {
      this.props.dispatch(readResume({
        type: 1,
      }))
    })
  }

  render() {
   // console.log(this.props.list1)
    const {list1, list2, list3, list4} = this.props
    return (
      <div className={style.DeliveryRecordWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >投递记录</NavBar>
        <Tabs
          className={style.title}
          defaultActiveKey="1"
          onTabClick={this.handleTabClick}
          swipeable={false}
        >
          <TabPane tab={<Badge text={''}>全部</Badge>} key="1">
            <div className={style.item}>
              {
                list1.length > 0 ?
                  list1.map((data, index) => {
                    return (
                      <SwipeAction
                        key={index}
                        autoClose
                        right={[
                          {
                            text: '删除',
                            onPress: () => this.cancleCollect(data.job_id),
                            style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                          },
                        ]}
                      >
                        <div onClick={() => this.goPostionDetailpage(data.job_id, data.company_id)}>
                          <JobCardTwo remindCallback={this.remind} chartCallback={this.goChat} {...data} />
                        </div>
                      </SwipeAction>
                    )
                  })
                  : <Nothing font="快去投递简历吧，获取更多机会～" />
              }
            </div>
          </TabPane>
          <TabPane tab={<Badge text={''}>已查看</Badge>} key="2">
            <div className={style.item}>
              {
                list2.length > 0 ?
                  list2.map((data, index) => {
                    return (
                      <SwipeAction
                        key={index}
                        autoClose
                        right={[
                          {
                            text: '删除',
                            onPress: () => this.cancleCollect(data.job_id),
                            style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                          },
                        ]}
                      >
                        <div onClick={() => this.goPostionDetailpage(data.job_id, data.company_id)}>
                          <JobCardThree {...data}/>
                        </div>
                      </SwipeAction>
                    )
                  })
                  : <Nothing font="快去投递简历吧，获取更多机会～" />
              }
            </div>
          </TabPane>
          <TabPane tab={<Badge>面试邀约</Badge>} key="3">
            <div>
              {
                list3.length > 0 ?
                  list3.map((data, index) => {
                    return (
                      <SwipeAction
                        key={index}
                        autoClose
                        right={[
                          {
                            text: '删除',
                            onPress: () => this.cancleCollect(data.job_id),
                            style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                          },
                        ]}
                      >
                        <div onClick={() => this.goLetter(data.message_id)}>
                          <JobCardFour {...data} />
                        </div>
                      </SwipeAction>
                    )
                  })
                  : <Nothing font="快去投递简历吧，获取更多机会～" />
              }
            </div>
          </TabPane>
          <TabPane tab={<Badge>不合适</Badge>} key="4">
            <div>
              { list4.length > 0 ?
                list4.map((data, index) => {
                  return (
                  <SwipeAction
                    key={index}
                    autoClose
                    right={[
                      {
                        text: '删除',
                        onPress: () => this.cancleCollect(data.job_id),
                        style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                      },
                    ]}
                  >
                    <div onClick={() => this.goLetter(data.message_id)}>
                      <JobCardFour {...data} />
                    </div>
                  </SwipeAction>
                  )
                })
                : <Nothing font="快去投递简历吧，获取更多机会～" />
              }
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default DeliveryRecord
